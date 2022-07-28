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

import java.util.List;
import java.util.Optional;

@Controller
@CrossOrigin
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
            listOfQueues.setNameOfSubject(queue.getSubjectName());

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
            return util.responseOfFindAndAdd("Not found", 404);
        }
        return util.responseOfFindAndAdd("Add new student to queue", 200);
    }

    @GetMapping("/all")
    public @ResponseBody
    Iterable<ListOfQueues> getAllListOfQueues(){
        return listOfQueueRepository.findAll();
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
                    responseAboutStudent.setDomain(student.getDomain());
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

        List<ListOfQueues> queues = listOfQueueRepository.findByIdStudentAndIdQueue(idStudent, idQueue);
        if (!queues.isEmpty()){
            listOfQueueRepository.deleteAll(queues);

            return util.responseOfFindAndAdd("Deleted", 200);
        }else{
            return util.responseOfFindAndAdd("Not found", 404);
        }
    }



}
