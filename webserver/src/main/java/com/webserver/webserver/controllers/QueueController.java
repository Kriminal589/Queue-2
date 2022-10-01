package com.webserver.webserver.controllers;

import com.webserver.webserver.Timer.CustomTimer;
import com.webserver.webserver.Timer.SortTimer;
import com.webserver.webserver.hash.CRC32Hash;
import com.webserver.webserver.jsonResponse.JsonUtil;
import com.webserver.webserver.models.ListOfQueues;
import com.webserver.webserver.models.Queue;
import com.webserver.webserver.repos.ListOfQueueRepository;
import com.webserver.webserver.repos.QueueRepository;
import org.springframework.boot.actuate.endpoint.annotation.WriteOperation;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.*;


@Controller
@RequestMapping(path = "/queue")
public class QueueController {

    private final QueueRepository queueRepository;

    private final ArrayList<CustomTimer> timers = new ArrayList<>();

    private final ListOfQueueRepository listOfQueueRepository;

    public QueueController(QueueRepository queueRepository, ListOfQueueRepository listOfQueueRepository) {
        this.queueRepository = queueRepository;
        this.listOfQueueRepository = listOfQueueRepository;
    }

    @GetMapping("/add")
    @WriteOperation
    public @ResponseBody String add(@RequestParam String subjectName, @RequestParam short type,
                                    @RequestParam short dependOnApps, @RequestParam int countApps,
                                    @RequestParam short dependOnDate, @RequestParam int dateToPass,
                                    @RequestParam Long idStudent){

        JsonUtil util = new JsonUtil();

        Queue queue = new Queue();
        queue.setCountApps(countApps);
        queue.setDateToPass(dateToPass);
        queue.setDependOnApps(dependOnApps);
        queue.setDependOnDate(dependOnDate);
        queue.setType(type);
//        queue.setCurrentApp(1);
        queue.setIdCreator(idStudent);
        queue.setSubjectName(subjectName);
        queue.setHexCode(new CRC32Hash().getHash(subjectName+idStudent+Instant.now().getEpochSecond()));

        queueRepository.save(queue);

        listOfQueueRepository.save(ListOfQueues.newBuilder()
                .setIdQueue(queue.getId())
                .setIdStudent(idStudent)
                .setNumberOfAppStudent(1)
                .setPositionStudent(1)
                .setQueueEntryDate(Instant.now().getEpochSecond())
                .build());

        Timer t = new Timer();
        t.schedule(
                SortTimer
                        .newBuilder()
                        .setId(queue.getId())
                        .build(), 0, dateToPass * 604800000L);
        timers.add(new CustomTimer(queue.getId(), t));

        return util.responseOfFindAndAddAndCreate(queue.getHEXCode(), 200);
    }

//    @GetMapping("/test")
//    public String test (@RequestParam Long value){
//
//        Timer t = new Timer();
//        t.schedule(
//                SortTimer
//                        .newBuilder()
//                        .setId(value)
//                        .build(), 0, 1000);
//        timers.add(new CustomTimer(value, t));
//        return "Hello, world!";
//    }
//
//    @GetMapping("/test/delete")
//    public String testDelete (@RequestParam Long value){
//        int k = -1;
//        for (int i = 0; i < timers.size(); i++){
//            if (Objects.equals(timers.get(i).idQueue, value)){
//                timers.get(i).timer.cancel();
//                k = i;
//            }
//        }
//        timers.remove(k);
//        return "Hello, world!";
//    }

    @GetMapping("/all")
    public @ResponseBody
    Iterable<Queue> getAllQueue(){
        return queueRepository.findAll();
    }

    @GetMapping("/getById/{idQueue}")
    public @ResponseBody
    Optional<Queue> getQueueById(@PathVariable Long idQueue){
        return queueRepository.findById(idQueue);
    }

    @GetMapping("/getByHEX/{hexCode}")
    public @ResponseBody
    Optional<Queue> getQueueByHEXCode(@PathVariable String hexCode){
        return queueRepository.findByHexCode(hexCode);
    }

    @DeleteMapping("/delete/{idQueue}")
    public @ResponseBody String deleteById(@PathVariable Long idQueue){

        JsonUtil util = new JsonUtil();

        Optional<Queue> queue = queueRepository.findById(idQueue);
        if (queue.isPresent()){
            Queue q = queue.get();
            List<ListOfQueues> listOfQueues = listOfQueueRepository.findAllByIdQueue(idQueue);
            if (!listOfQueues.isEmpty())
                listOfQueueRepository.deleteAll(listOfQueues);
            queueRepository.delete(q);

            int k = -1;
            for (int i = 0; i < timers.size(); i++){
                if (Objects.equals(timers.get(i).idQueue, idQueue)){
                    timers.get(i).timer.cancel();
                    k = i;
                }
            }
            timers.remove(k);

            return util.responseOfFindAndAddAndCreate("Deleted", 200);
        }else{
            return util.responseOfFindAndAddAndCreate("Not found", 404);
        }
    }

    @DeleteMapping("/delete/all")
    public @ResponseBody String deleteAll(){

        JsonUtil util = new JsonUtil();

        queueRepository.deleteAll();
        listOfQueueRepository.deleteAll();

        return util.responseOfFindAndAddAndCreate("Deleted all queues", 200);
    }
}
