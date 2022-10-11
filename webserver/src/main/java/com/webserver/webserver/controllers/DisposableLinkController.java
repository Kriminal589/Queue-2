package com.webserver.webserver.controllers;

import com.webserver.webserver.hash.CRC32Hash;
import com.webserver.webserver.jsonResponse.JsonUtil;
import com.webserver.webserver.models.DisposableLink;
import com.webserver.webserver.models.Headman;
import com.webserver.webserver.models.Student;
import com.webserver.webserver.repos.DisposableLinkRepository;
import com.webserver.webserver.repos.HeadmanRepository;
import com.webserver.webserver.repos.StudentRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.Instant;
import java.util.Optional;
import java.util.Timer;
import java.util.TimerTask;

@Controller
public class DisposableLinkController{
    private final DisposableLinkRepository disposableLinkRepository;
    private final HeadmanRepository headmanRepository;
    private final StudentRepository studentRepository;

    public DisposableLinkController(DisposableLinkRepository disposableLinkRepository, HeadmanRepository headmanRepository, StudentRepository studentRepository) {
        this.disposableLinkRepository = disposableLinkRepository;
        this.headmanRepository = headmanRepository;
        this.studentRepository = studentRepository;
    }

    @GetMapping("/link/getNew")
    public @ResponseBody String getNewLink(@RequestParam Long idStudent){
        DisposableLink disposableLink = new DisposableLink();
        disposableLink.setExtension(new CRC32Hash().getHash(String.valueOf(idStudent+ Instant.now().getEpochSecond())));
        disposableLinkRepository.save(disposableLink);

        TimerTask timerTask = new TimerTask() {
            @Override
            public void run() {
                disposableLinkRepository.delete(disposableLink);
                System.out.println("Delete link from table");
            }
        };

        new Timer().schedule(timerTask, 3600000);
        return new JsonUtil().responseOfFindAndAdd(new CRC32Hash().getHash(String.valueOf(idStudent+ Instant.now().getEpochSecond())), 200);
    }

    @GetMapping("/link/addToHeadman")
    public @ResponseBody String addToHeadman(@RequestParam String extension, @RequestParam Long idStudent){
        Optional<DisposableLink> optionalDisposableLink = disposableLinkRepository.findByExtension(extension);
        Optional<Student> optionalStudent = studentRepository.findById(idStudent);
        if (optionalDisposableLink.isPresent() && optionalStudent.isPresent()){
            Headman headman = new Headman();
            headman.setId(idStudent);
            headmanRepository.save(headman);
        }else{
            return new JsonUtil().responseOfFindAndAdd("Not found", 404);
        }
        return new JsonUtil().responseOfFindAndAdd("Add new headman", 200);
    }

    public @ResponseBody Iterable<DisposableLink> getAllLink(){
        return disposableLinkRepository.findAll();
    }
}
