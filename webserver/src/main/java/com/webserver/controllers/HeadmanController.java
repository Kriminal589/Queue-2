package com.webserver.controllers;

import com.webserver.jsonResponse.JsonUtil;
import com.webserver.models.DisposableLink;
import com.webserver.models.Headman;
import com.webserver.repos.DisposableLinkRepository;
import com.webserver.repos.HeadmanRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Optional;

@Controller
public class HeadmanController {
    private final HeadmanRepository headmanRepository;
    private final DisposableLinkRepository disposableLinkRepository;

    public HeadmanController(HeadmanRepository headmanRepository, DisposableLinkRepository disposableLinkRepository) {
        this.headmanRepository = headmanRepository;
        this.disposableLinkRepository = disposableLinkRepository;
    }

    @GetMapping("/headman/add")
    public @ResponseBody String add(@RequestParam String extension, @RequestParam Long id){
        Optional<DisposableLink> optionalDisposableLink = disposableLinkRepository.findByExtension(extension);
        if (optionalDisposableLink.isPresent()){
            DisposableLink disposableLink = optionalDisposableLink.get();
            Headman headman = new Headman();
            headman.setId(id);
            headmanRepository.save(headman);
            disposableLinkRepository.delete(disposableLink);
            return new JsonUtil().responseOfFindAndAddAndCreate("add new headman", 200);
        }
        return new JsonUtil().responseOfFindAndAddAndCreate("Not found", 404);
    }
}
