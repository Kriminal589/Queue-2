package com.webserver.webserver.controllers;

import com.webserver.webserver.jsonResponse.JsonUtil;
import com.webserver.webserver.models.ListOfQueues;
import com.webserver.webserver.models.Queue;
import com.webserver.webserver.models.Student;
import com.webserver.webserver.repos.ListOfQueueRepository;
import com.webserver.webserver.repos.QueueRepository;
import com.webserver.webserver.repos.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@CrossOrigin
@RequestMapping(path = "/listOfQueues")
public class ListOfQueuesController {

    @Autowired
    private ListOfQueueRepository listOfQueueRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private QueueRepository queueRepository;


    @GetMapping("/add/{idQueue}/{idStudent}/{numberOfAppStudent}")
    public @ResponseBody String add(@PathVariable Long idQueue, @PathVariable Long idStudent,
                                    @PathVariable int numberOfAppStudent){

        JsonUtil util = new JsonUtil();

        Optional<Queue> tryQueue = queueRepository.findById(idQueue);
        Optional<Student> tryStudent = studentRepository.findById(idStudent);
        ListOfQueues listOfQueues = new ListOfQueues();

        listOfQueues.setIdQueue(idQueue);
        listOfQueues.setIdStudent(idStudent);
        listOfQueues.setNumberOfAppStudent(numberOfAppStudent);

        if (tryQueue.isPresent() && tryStudent.isPresent()){
            Queue queue = tryQueue.get();
            listOfQueues.setCurrentApp(queue.getCurrentApp());

            int position = listOfQueueRepository.findAllByIdQueue(idQueue).size() + 1;
            listOfQueues.setPositionStudent(position);
            listOfQueueRepository.save(listOfQueues);

            //Наработка для сортировки при отправлении списка группы в очереди
//            if (Objects.equals(queue.getType(), "simple")){
//                int position = listOfQueueRepository.findAllByIdQueue(idQueue).size() + 1;
//                listOfQueues.setPositionStudent(position);
//                listOfQueueRepository.save(listOfQueues);
//            }else if (Objects.equals(queue.getDependOnApps(), 1)){
//                List<ListOfQueues> queueOfStudentOnOneGroup = listOfQueueRepository.findAllByIdQueue(idQueue);
//                queueOfStudentOnOneGroup = listOfQueues.sortByNumberOfApp(queueOfStudentOnOneGroup);
//            }
        }else{
            return util.response("Not found", 404);
        }
        return util.response("Add new student to queue", 200);
    }

    @GetMapping("/all")
    public @ResponseBody
    Iterable<ListOfQueues> getAllListOfQueues(){
        return listOfQueueRepository.findAll();
    }

    @GetMapping("/get/{idStudent}")
    public @ResponseBody
    Iterable<ListOfQueues> getAllListOfQueuesByIdStudent(@PathVariable Long idStudent){
        return listOfQueueRepository.findAllByIdStudent(idStudent);
    }

}
