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
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

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


    @GetMapping("/add/{hexCode}/{idStudent}/{numberOfAppStudent}")
    public @ResponseBody String add(@PathVariable String hexCode, @PathVariable Long idStudent,
                                    @PathVariable int numberOfAppStudent){

        JsonUtil util = new JsonUtil();

        Optional<Queue> tryQueue = queueRepository.findByHexCode(hexCode);
        Optional<Student> tryStudent = studentRepository.findById(idStudent);

        if (tryQueue.isPresent() && tryStudent.isPresent()){

            Queue queue = tryQueue.get();

            Optional<ListOfQueues> list = listOfQueueRepository.findByIdStudentAndIdQueue(idStudent, queue.getId());

            if (!list.isPresent()) {

                Optional<ListOfQueues> pastConnection = listOfQueueRepository.findByIdStudentAndIdQueue(idStudent, queue.getId());
                pastConnection.ifPresent(listOfQueueRepository::delete);

                int position = listOfQueueRepository.findAllByIdQueue(queue.getId()).size() + 1;

                listOfQueueRepository.save(ListOfQueues.newBuilder()
                        .setIdStudent(idStudent)
                        .setNumberOfAppStudent(numberOfAppStudent)
                        .setIdQueue(queue.getId())
                        .setPositionStudent(position)
                        .setQueueEntryDate(Instant.now().getEpochSecond())
                        .build());
            }
        }else{
            return util.responseOfFindAndAddAndCreate("Not found", 404);
        }
        return util.responseOfFindAndAddAndCreate("Add new student to queue", 200);
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
            return util.responseOfFindAndAddAndCreate("Not found", 404);
        }
    }

    @DeleteMapping("/delete/ByIdStudentAndQueue/{idStudent}/{idQueue}")
    public @ResponseBody String deleteByIdStudent(@PathVariable Long idStudent, @PathVariable Long idQueue){

        JsonUtil util = new JsonUtil();

        Optional<ListOfQueues> q = listOfQueueRepository.findByIdStudentAndIdQueue(idStudent, idQueue);
        if (q.isPresent()){
            ListOfQueues queue = q.get();
            int position = queue.getPositionStudent();
            listOfQueueRepository.delete(queue);

            List<ListOfQueues> listOfQueuesIterable = listOfQueueRepository.findAllByIdQueue(idQueue);
            if (!listOfQueuesIterable.isEmpty()){
                for (ListOfQueues student:listOfQueuesIterable){
                    if (student.getIdStudent() > position)
                        student.setPositionStudent(student.getPositionStudent() - 1);
                }
            }

            return util.responseOfFindAndAddAndCreate("Deleted", 200);
        }else{
            return util.responseOfFindAndAddAndCreate("Not found", 404);
        }
    }
}
