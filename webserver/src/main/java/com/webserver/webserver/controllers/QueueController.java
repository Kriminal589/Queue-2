package com.webserver.webserver.controllers;

import com.webserver.webserver.hash.CRC32Hash;
import com.webserver.webserver.jsonResponse.JsonUtil;
import com.webserver.webserver.models.ListOfQueues;
import com.webserver.webserver.models.Queue;
import com.webserver.webserver.repos.ListOfQueueRepository;
import com.webserver.webserver.repos.QueueRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.Optional;


@Controller
@CrossOrigin
@RequestMapping(path = "/queue")
public class QueueController {

    private final QueueRepository queueRepository;

    private final ListOfQueueRepository listOfQueueRepository;

    public QueueController(QueueRepository queueRepository, ListOfQueueRepository listOfQueueRepository) {
        this.queueRepository = queueRepository;
        this.listOfQueueRepository = listOfQueueRepository;
    }


//    @GetMapping("/add/{SubjectName}/{type}/{dependOnApps}/{countApps}/{dependOnDate}/{dateToPass}")
//    public @ResponseBody
//    String addSmartQueue(@PathVariable String SubjectName, @PathVariable short type, @PathVariable short dependOnApps,
//                         @PathVariable int countApps, @PathVariable short dependOnDate, @PathVariable String dateToPass){
//
//        JsonUtil util = new JsonUtil();
//
//        Queue queue = new Queue();
//        queue.setCountApps(countApps);
//        queue.setDateToPass(dateToPass);
//        queue.setDependOnApps(dependOnApps);
//        queue.setDependOnDate(dependOnDate);
//        queue.setType(type);
//        queue.setSubjectName(SubjectName);
//
//        queueRepository.save(queue);
//        return util.responseOfFindAndAdd("Saved smart queue", 200);
    //http://localhost:8080/queue/add?subjectName=OOP&type=0&dependOnApps=0&countApps=0&dependOnDate=0&dateToPass=0
//    }

    @GetMapping("/add")
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
        queue.setSubjectName(subjectName);
        queue.setHEXCode(new CRC32Hash().getHash(subjectName+idStudent+Instant.now().getEpochSecond()));

        queueRepository.save(queue);

        return util.responseOfFindAndAdd("Saved queue", 200);
    }

//    @GetMapping("/add/{SubjectName}/{type}")
//    public @ResponseBody String addSimpleQueue(@PathVariable String SubjectName, @PathVariable String type){
//
//        JsonUtil util = new JsonUtil();
//
//        Queue queue = new Queue();
//        queue.setType(type);
//        queue.setSubjectName(SubjectName);
//
//        queueRepository.save(queue);
//        return util.responseOfFindAndAdd("Saved simple queue", 200);
//    }
//
//    @GetMapping("/add/{SubjectName}/{type}/{dependOnApps}/{countApps}/{dependOnDate}")
//    public @ResponseBody String addQueueWithCountApps(@PathVariable String SubjectName, @PathVariable String type, @PathVariable short dependOnApps,
//                         @PathVariable int countApps, @PathVariable short dependOnDate){
//
//        JsonUtil util = new JsonUtil();
//
//        Queue queue = new Queue();
//        queue.setCountApps(countApps);
//        queue.setDependOnApps(dependOnApps);
//        queue.setDependOnDate(dependOnDate);
//        queue.setType(type);
//        queue.setSubjectName(SubjectName);
//
//        queueRepository.save(queue);
//        return util.responseOfFindAndAdd("Saved smart queue with count of apps", 200);
//    }
//
//    @GetMapping("/add/{SubjectName}/{type}/{dependOnApps}/{dependOnDate}/{dateToPass}")
//    public @ResponseBody
//    String addSmartQueueWithDateToPass(@PathVariable String SubjectName, @PathVariable String type, @PathVariable short dependOnApps,
//                         @PathVariable short dependOnDate, @PathVariable String dateToPass){
//
//        JsonUtil util = new JsonUtil();
//
//        Queue queue = new Queue();
//        queue.setDateToPass(dateToPass);
//        queue.setDependOnApps(dependOnApps);
//        queue.setDependOnDate(dependOnDate);
//        queue.setType(type);
//        queue.setSubjectName(SubjectName);
//
//        queueRepository.save(queue);
//        return util.responseOfFindAndAdd("Saved smart queue with date to pass", 200);
//    }

    @GetMapping("/all")
    public @ResponseBody
    Iterable<Queue> getAllQueue(){
        return queueRepository.findAll();
    }

    @GetMapping("/get/{idQueue}")
    public @ResponseBody
    Optional<Queue> getQueueById(@PathVariable Long idQueue){
        return queueRepository.findById(idQueue);
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
            return util.responseOfFindAndAdd("Deleted", 200);
        }else{
            return util.responseOfFindAndAdd("Not found", 404);
        }
    }

    @DeleteMapping("/delete/all")
    public @ResponseBody String deleteAll(){

        JsonUtil util = new JsonUtil();

        queueRepository.deleteAll();
        listOfQueueRepository.deleteAll();

        return util.responseOfFindAndAdd("Deleted all queues", 200);
    }
}
