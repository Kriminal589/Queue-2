package com.webserver.controllers;

import com.webserver.jsonResponse.JsonUtil;
import com.webserver.hash.CRC32Hash;
import com.webserver.models.DisposableLink;
import com.webserver.repos.DisposableLinkRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.Instant;
import java.util.Timer;
import java.util.TimerTask;

@Controller
public class DisposableLinkController {
    private final DisposableLinkRepository disposableLinkRepository;

    public DisposableLinkController(DisposableLinkRepository disposableLinkRepository) {
        this.disposableLinkRepository = disposableLinkRepository;
    }

    @GetMapping("/createLink")
    public @ResponseBody String createLink(@RequestParam Long id){
        DisposableLink disposableLink = new DisposableLink();
        Long time = Instant.now().getEpochSecond();
        disposableLink.setExtension(CRC32Hash.getHash(String.valueOf(id + time)));
        disposableLinkRepository.save(disposableLink);

        new Timer().schedule(new TimerTask() {
            @Override
            public void run() {
                disposableLinkRepository.delete(disposableLink);
            }
        }, 24 * 60 * 60 * 1000);

        return new JsonUtil().responseOfFindAndAddAndCreate(disposableLink.getExtension(), 200);
    }
}
