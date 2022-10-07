package com.webserver.webserver.controllers;

import com.webserver.webserver.hash.CRC32Hash;
import com.webserver.webserver.jsonResponse.JsonUtil;
import com.webserver.webserver.models.ListOfQueues;
import com.webserver.webserver.models.Queue;
import com.webserver.webserver.repos.ListOfQueueRepository;
import com.webserver.webserver.repos.QueueRepository;
import com.webserver.webserver.repos.StudentRepository;
import org.springframework.boot.actuate.endpoint.annotation.WriteOperation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.Optional;


@Controller
@RequestMapping(path = "/queue")
public class QueueController {

    private final QueueRepository queueRepository;

    private final ListOfQueueRepository listOfQueueRepository;
    //private final StudentRepository studentRepository;

    public QueueController(QueueRepository queueRepository, ListOfQueueRepository listOfQueueRepository, StudentRepository studentRepository) {
        this.queueRepository = queueRepository;
        this.listOfQueueRepository = listOfQueueRepository;
        //this.studentRepository = studentRepository;
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
        queue.setIdCreator(idStudent);
        queue.setSubjectName(subjectName);
        queue.setHexCode(new CRC32Hash().getHash(subjectName+idStudent+Instant.now().getEpochSecond()));

        queueRepository.save(queue);

        ListOfQueues listOfQueues = new ListOfQueues();
        listOfQueues.setIdQueue(queue.getId());
        listOfQueues.setIdStudent(idStudent);
        listOfQueues.setNumberOfAppStudent(1);
        listOfQueues.setPositionStudent(1);
        listOfQueues.setQueueEntryDate(Instant.now().getEpochSecond());

        listOfQueueRepository.save(listOfQueues);

        return util.responseOfFindAndAdd(queue.getHexCode(), 200);
    }

    @GetMapping("/test")
    public ResponseEntity<String> test (@RequestHeader(value = "Authorization") String key){
        return ResponseEntity.status(HttpStatus.OK).body(key);
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
    Optional<Queue> getQueueById(@PathVariable String hexCode){
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
