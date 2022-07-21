package com.webserver.webserver.controllers;

import com.webserver.webserver.jsonResponse.JsonUtil;
import com.webserver.webserver.models.Student;
import com.webserver.webserver.repos.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@CrossOrigin
@RequestMapping(path = "/student")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @GetMapping("/add/{id}/{NameOfStudent}/{domain}")
    public @ResponseBody String addNewStudent(@PathVariable String NameOfStudent, @PathVariable Long id,
                                              @PathVariable String domain){
        Student student = new Student();
        student.setNameOfStudent(NameOfStudent);
        student.setDomain(domain);
        student.setId(id);
        studentRepository.save(student);
        JsonUtil util = new JsonUtil();
        return util.response("Saved", 200);
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
}
