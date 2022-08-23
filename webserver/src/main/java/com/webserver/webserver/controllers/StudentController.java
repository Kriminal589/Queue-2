package com.webserver.webserver.controllers;

import com.webserver.webserver.jsonResponse.JsonUtil;
import com.webserver.webserver.models.Headman;
import com.webserver.webserver.models.ListOfQueues;
import com.webserver.webserver.models.Queue;
import com.webserver.webserver.models.Student;
import com.webserver.webserver.repos.HeadmanRepository;
import com.webserver.webserver.repos.ListOfQueueRepository;
import com.webserver.webserver.repos.QueueRepository;
import com.webserver.webserver.repos.StudentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.actuate.endpoint.annotation.WriteOperation;
import org.springframework.boot.actuate.trace.http.InMemoryHttpTraceRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;
import java.util.Optional;

@Controller
@CrossOrigin
@RequestMapping(path = "/student")
public class StudentController {

    private final StudentRepository studentRepository;

    private final QueueRepository queueRepository;


    private final ListOfQueueRepository listOfQueueRepository;
    private final HeadmanRepository headmanRepository;
    
    public StudentController(StudentRepository studentRepository, QueueRepository queueRepository, ListOfQueueRepository listOfQueueRepository, HeadmanRepository headmanRepository) {
        this.studentRepository = studentRepository;
        this.queueRepository = queueRepository;
        this.listOfQueueRepository = listOfQueueRepository;
        this.headmanRepository = headmanRepository;
    }

    @GetMapping("/add")
    @WriteOperation
    public @ResponseBody String addNewStudent(@RequestParam String NameOfStudent, @RequestParam Long id){
        Student student = new Student();
        student.setNameOfStudent(NameOfStudent);
        student.setId(id);
        studentRepository.save(student);
        JsonUtil util = new JsonUtil();

        Optional<Headman> headman = headmanRepository.findById(id);
        if (headman.isPresent())
            return util.responseOfFindAndAdd("1", 200);
        else
            return util.responseOfFindAndAdd("0", 200);
    }

    @GetMapping("/all")
    public @ResponseBody Iterable<Student> getAllStudent(){
        return studentRepository.findAll();
    }

    @GetMapping("/getById/{idStudent}")
    public @ResponseBody
    Optional<Student> getStudent(@PathVariable Long idStudent){
        return studentRepository.findById(idStudent);
    }

    @GetMapping("/getByName/{NameOfStudent}")
    public @ResponseBody
    Optional<Student> getStudentByName(@PathVariable String NameOfStudent){
        return studentRepository.findByNameOfStudent(NameOfStudent);
    }

    @DeleteMapping("/delete/all")
    public @ResponseBody String deleteAllStudents(){

        JsonUtil util = new JsonUtil();

        studentRepository.deleteAll();
        queueRepository.deleteAll();
        listOfQueueRepository.deleteAll();
        return util.responseOfFindAndAdd("Deleted all students", 200);
    }

    @DeleteMapping("/delete/{idStudent}")
    public @ResponseBody String deleteStudentById(@PathVariable Long idStudent){

        JsonUtil util = new JsonUtil();

        Optional<Student> student = studentRepository.findById(idStudent);
        if (student.isPresent()){
            Student s = student.get();

            List<ListOfQueues> listOfQueues = listOfQueueRepository.findAllByIdStudent(s.getId());
            if (!listOfQueues.isEmpty()){
                for (ListOfQueues queue:listOfQueues){
                    List<ListOfQueues> listOfStudent = listOfQueueRepository.findAllByIdQueue(queue.getIdQueue());
                    if (listOfStudent.size() == 1){
                        Optional<Queue> sub = queueRepository.findById(queue.getIdQueue());
                        if (sub.isPresent()) {
                            Queue subject = sub.get();
                            queueRepository.delete(subject);
                        }
                    }else{
                        //Смещение студентов в списке
                        for (ListOfQueues stud:listOfStudent){
                            if (stud.getPositionStudent() > queue.getPositionStudent())
                                stud.setPositionStudent(stud.getPositionStudent() - 1);
                        }
                    }
                    listOfQueueRepository.delete(queue);
                }
            }
            studentRepository.delete(s);
            return util.responseOfFindAndAdd("Deleted student", 200);
        }else{
            return util.responseOfFindAndAdd("Not found", 404);
        }
    }
}

//"id": 257557389,
//        "nameOfStudent": "Максим_Сыров",
//        "domain": "moximillian",
//        "idHeadman": null
//    },
//    {
//        "id": 296383509,
//        "nameOfStudent": "Леша_Чижиков",
//        "domain": "chizh1k",
//        "idHeadman": null
//    }