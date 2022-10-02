package com.webserver.controllers;

import com.webserver.Timer.CustomTimer;
import com.webserver.Timer.SortTimer;
import com.webserver.hash.CRC32Hash;
import com.webserver.jsonResponse.JsonUtil;
import com.webserver.models.ListOfQueues;
import com.webserver.models.Queue;
import com.webserver.repos.ListOfQueueRepository;
import com.webserver.repos.QueueRepository;
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

        Queue queue = Queue.newBuilder()
                .setCountApps(countApps)
                .setDateToPass(dateToPass)
                .setDependOnApps(dependOnApps)
                .setDependOnDate(dependOnDate)
                .setType(type)
                .setCurrentApp(1)
                .setIdCreator(idStudent)
                .setSubjectName(subjectName)
                .setHexCode(CRC32Hash.getHash(subjectName+idStudent+Instant.now().getEpochSecond()))
                .build();

        queueRepository.save(queue);

        listOfQueueRepository.save(ListOfQueues.newBuilder()
                .setIdQueue(queue.getId())
                .setIdStudent(idStudent)
                .setNumberOfAppStudent(1)
                .setPositionStudent(1)
                .setQueueEntryDate(Instant.now().getEpochSecond())
                .build());

        if (type == 1) {
            Timer t = new Timer();
            t.schedule(
                    SortTimer
                            .newBuilder()
                            .setId(queue.getId())
                            .setListOfQueueRepository(listOfQueueRepository)
                            .setQueueRepository(queueRepository)
                            .build(), dateToPass * 604800000L, dateToPass * 604800000L);
            timers.add(new CustomTimer(queue.getId(), t));
        }

        return util.responseOfFindAndAddAndCreate(queue.getHEXCode(), 200);
    }

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
