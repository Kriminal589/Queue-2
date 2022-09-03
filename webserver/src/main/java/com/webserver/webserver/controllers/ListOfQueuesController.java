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
import java.util.ArrayList;
import java.util.Collections;
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

        Optional<Queue> tryQueue = queueRepository.findByHEXCode(hexCode);
        Optional<Student> tryStudent = studentRepository.findById(idStudent);
        ListOfQueues listOfQueues = new ListOfQueues();

        listOfQueues.setIdStudent(idStudent);
        listOfQueues.setNumberOfAppStudent(numberOfAppStudent);
        listOfQueues.setHexCode(hexCode);
        if (tryQueue.isPresent() && tryStudent.isPresent()){

            Queue queue = tryQueue.get();

            Optional<ListOfQueues> list = listOfQueueRepository.findByHexCodeAndIdStudent(hexCode, idStudent);

            if (!list.isPresent()) {

                Optional<ListOfQueues> pastConnection = listOfQueueRepository.findByHexCodeAndIdStudent(queue.getHEXCode(), idStudent);
                pastConnection.ifPresent(listOfQueueRepository::delete);

                listOfQueues.setIdQueue(queue.getId());
                listOfQueues.setCurrentApp(queue.getCurrentApp());
                listOfQueues.setNameOfSubject(queue.getSubjectName());
                listOfQueues.setIdCreator(queue.getIdCreator());

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
        List<ListOfQueues> list = (List<ListOfQueues>) l;
        list = sort(list);
        return list;
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

        List<ListOfQueues> queues = listOfQueueRepository.findByIdStudentAndIdQueue(idStudent, idQueue);
        if (!queues.isEmpty()){
            listOfQueueRepository.deleteAll(queues);

            return util.responseOfFindAndAdd("Deleted", 200);
        }else{
            return util.responseOfFindAndAdd("Not found", 404);
        }
    }

    public List<ListOfQueues> sort(List<ListOfQueues> list){
        List<ListOfQueues> current = new ArrayList<>();
        List<ListOfQueues> late = new ArrayList<>();
        List<ListOfQueues> hurrying = new ArrayList<>();

        for (ListOfQueues item:list){
            if (item.getQueueEntryDate() == 3)
                current.add(0,item);
            else if (item.getNumberOfAppStudent() == item.getCurrentApp())
                current.add(item);
            else if (item.getNumberOfAppStudent() < item.getCurrentApp())
                late.add(item);
            else if (item.getNumberOfAppStudent() > item.getCurrentApp())
                hurrying.add(item);
        }

        sortByEntryDate(current);
        sortByEntryDate(late);
        sortByEntryDate(hurrying);

        current.addAll(late);
        current.addAll(hurrying);

        return current;
    }

    public void sortByEntryDate(List<ListOfQueues> list){
        for (int i = 0; i < list.size()-1; i++){
            for (int j = 0; j < list.size(); j++){
                if (list.get(i).getQueueEntryDate() > list.get(j).getQueueEntryDate()){
                    Collections.swap(list, i, j);
                }
            }
        }
    }

}
