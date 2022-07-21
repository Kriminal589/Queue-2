package com.webserver.webserver.controllers;

import com.webserver.webserver.jsonResponse.JsonUtil;
import com.webserver.webserver.models.Queue;
import com.webserver.webserver.repos.QueueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
@CrossOrigin
@RequestMapping(path = "/queue")
public class QueueController {

    @Autowired
    private QueueRepository queueRepository;


    @GetMapping("/add/{SubjectName}/{type}/{dependOnApps}/{countApps}/{dependOnDate}/{dateToPass}")
    public @ResponseBody
    String addSmartQueue(@PathVariable String SubjectName, @PathVariable String type, @PathVariable short dependOnApps,
                         @PathVariable int countApps, @PathVariable short dependOnDate, @PathVariable String dateToPass){

        JsonUtil util = new JsonUtil();

        Queue queue = new Queue();
        queue.setCountApps(countApps);
        queue.setDateToPass(dateToPass);
        queue.setDependOnApps(dependOnApps);
        queue.setDependOnDate(dependOnDate);
        queue.setType(type);
        queue.setSubjectName(SubjectName);

        queueRepository.save(queue);
        return util.response("Saved smart queue", 200);
    }

    @GetMapping("/add/{SubjectName}/{type}")
    public @ResponseBody String addSimpleQueue(@PathVariable String SubjectName, @PathVariable String type){

        JsonUtil util = new JsonUtil();

        Queue queue = new Queue();
        queue.setType(type);
        queue.setSubjectName(SubjectName);

        queueRepository.save(queue);
        return util.response("Saved simple queue", 200);
    }

    @GetMapping("/add/{SubjectName}/{type}/{dependOnApps}/{countApps}/{dependOnDate}")
    public @ResponseBody String addQueueWithCountApps(@PathVariable String SubjectName, @PathVariable String type, @PathVariable short dependOnApps,
                         @PathVariable int countApps, @PathVariable short dependOnDate){

        JsonUtil util = new JsonUtil();

        Queue queue = new Queue();
        queue.setCountApps(countApps);
        queue.setDependOnApps(dependOnApps);
        queue.setDependOnDate(dependOnDate);
        queue.setType(type);
        queue.setSubjectName(SubjectName);

        queueRepository.save(queue);
        return util.response("Saved smart queue with count of apps", 200);
    }

    @GetMapping("/add/{SubjectName}/{type}/{dependOnApps}/{dependOnDate}/{dateToPass}")
    public @ResponseBody
    String addSmartQueueWithDateToPass(@PathVariable String SubjectName, @PathVariable String type, @PathVariable short dependOnApps,
                         @PathVariable short dependOnDate, @PathVariable String dateToPass){

        JsonUtil util = new JsonUtil();

        Queue queue = new Queue();
        queue.setDateToPass(dateToPass);
        queue.setDependOnApps(dependOnApps);
        queue.setDependOnDate(dependOnDate);
        queue.setType(type);
        queue.setSubjectName(SubjectName);

        queueRepository.save(queue);
        return util.response("Saved smart queue with date to pass", 200);
    }

    @GetMapping("/all")
    public @ResponseBody
    Iterable<Queue> getAllQueue(){
        return queueRepository.findAll();
    }
}
