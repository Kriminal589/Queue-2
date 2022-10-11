package com.webserver.webserver.controllers;

import com.webserver.webserver.jsonResponse.JsonUtil;
import com.webserver.webserver.jsonResponse.ListResponseStudent;
import com.webserver.webserver.jsonResponse.ResponseAboutStudent;
import com.webserver.webserver.models.ListOfQueues;
import com.webserver.webserver.models.Queue;
import com.webserver.webserver.models.Student;
import com.webserver.webserver.repos.ListOfQueueRepository;
import com.webserver.webserver.repos.QueueRepository;
import com.webserver.webserver.repos.StudentRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping(path = "/listOfQueues")
public class ListOfQueuesController {

    private final ListOfQueueRepository listOfQueueRepository;

    private final StudentRepository studentRepository;

    private final QueueRepository queueRepository;

    public ListOfQueuesController(ListOfQueueRepository listOfQueueRepository, StudentRepository studentRepository, QueueRepository queueRepository) {
        this.listOfQueueRepository = listOfQueueRepository;
        this.studentRepository = studentRepository;
        this.queueRepository = queueRepository;
    }


    @GetMapping("/add/{hexCode}/{idStudent}/{numberOfAppStudent}")
    public @ResponseBody String add(@PathVariable String hexCode, @PathVariable Long idStudent,
                                    @PathVariable int numberOfAppStudent){

        JsonUtil util = new JsonUtil();

        Optional<Queue> tryQueue = queueRepository.findByHexCode(hexCode);
        Optional<Student> tryStudent = studentRepository.findById(idStudent);
        ListOfQueues listOfQueues = new ListOfQueues();

        listOfQueues.setIdStudent(idStudent);
        listOfQueues.setNumberOfAppStudent(numberOfAppStudent);
        if (tryQueue.isPresent() && tryStudent.isPresent()){

            Queue queue = tryQueue.get();

            Optional<ListOfQueues> list = listOfQueueRepository.findByIdStudentAndIdQueue(idStudent, queue.getId());

            if (!list.isPresent()) {

                Optional<ListOfQueues> pastConnection = listOfQueueRepository.findByIdStudentAndIdQueue(idStudent, queue.getId());
                pastConnection.ifPresent(listOfQueueRepository::delete);

                listOfQueues.setIdQueue(queue.getId());

                int position = listOfQueueRepository.findAllByIdQueue(queue.getId()).size() + 1;
                listOfQueues.setPositionStudent(position);
                listOfQueues.setQueueEntryDate(Instant.now().getEpochSecond());
                listOfQueueRepository.save(listOfQueues);
            }
        }else{
            return util.responseOfFindAndAdd("Not found", 404);
        }
        return util.responseOfFindAndAdd("Add new student to queue", 200);
    }


    @GetMapping("/all")
    public @ResponseBody
    List<ListOfQueues> getAllListOfQueues(){
        Iterable<ListOfQueues> l = listOfQueueRepository.findAll();
        return (List<ListOfQueues>) l;
    }

    @GetMapping("/getByIdStudent/{idStudent}")
    public @ResponseBody
    Iterable<ListOfQueues> getAllListOfQueuesByIdStudent(@PathVariable Long idStudent){
        return listOfQueueRepository.findAllByIdStudent(idStudent);
    }

    @GetMapping("/getByIdQueue/{idQueue}")
    public @ResponseBody
    String getAllListOfQueuesByIdQueue(@PathVariable Long idQueue){

        JsonUtil util = new JsonUtil();

        List<ListOfQueues> listOfQueues = listOfQueueRepository.findAllByIdQueue(idQueue);
        if (!listOfQueues.isEmpty()){
            ListResponseStudent listResponseStudent = new ListResponseStudent();
            for (ListOfQueues queue:listOfQueues){
                ResponseAboutStudent responseAboutStudent = new ResponseAboutStudent();
                responseAboutStudent.setIdStudent(queue.getIdStudent());

                Optional<Student> s = studentRepository.findById(queue.getIdStudent());
                if (s.isPresent()) {
                    Student student = s.get();
                    responseAboutStudent.setNameOfStudent(student.getNameOfStudent());
                }

                listResponseStudent.add(responseAboutStudent);
            }
            return util.responseStudent(listResponseStudent);
        }
        else{
            return util.responseOfFindAndAdd("Not found", 404);
        }
    }

    @DeleteMapping("/delete/ByIdStudentAndQueue/{idStudent}/{idQueue}")
    public @ResponseBody String deleteByIdStudent(@PathVariable Long idStudent, @PathVariable Long idQueue){

        JsonUtil util = new JsonUtil();

        Optional<ListOfQueues> queues = listOfQueueRepository.findByIdStudentAndIdQueue(idStudent, idQueue);
        if (queues.isPresent()){
            ListOfQueues q = queues.get();
            listOfQueueRepository.delete(q);

            return util.responseOfFindAndAdd("Deleted", 200);
        }else{
            return util.responseOfFindAndAdd("Not found", 404);
        }
    }

}
