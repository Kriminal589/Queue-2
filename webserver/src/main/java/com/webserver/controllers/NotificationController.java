package com.webserver.controllers;

import com.webserver.models.Notification;
import com.webserver.repos.NotificationRepository;
import com.webserver.jsonResponse.JsonUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(path = "/notification")
public class NotificationController {

    private final NotificationRepository notificationRepository;

    public NotificationController(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @GetMapping("/create/{idCreator}/{idRecipient}/{message}")
    public String create(@PathVariable Long idCreator, @PathVariable Long idRecipient, @PathVariable String message){
        JsonUtil jsonUtil = new JsonUtil();

        Notification notification = new Notification();
        notification.setIdRecipient(idRecipient);
        notification.setIdSender(idCreator);
        notification.setMessage(message);
        notificationRepository.save(notification);

        return jsonUtil.responseOfFindAndAddAndCreate("notification is created", 200);
    }
}
