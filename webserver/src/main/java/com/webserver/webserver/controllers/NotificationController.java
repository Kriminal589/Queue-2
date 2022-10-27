package com.webserver.webserver.controllers;

import com.webserver.webserver.jsonResponse.JsonUtil;
import com.webserver.webserver.models.ListOfQueues;
import com.webserver.webserver.models.Notification;
import com.webserver.webserver.repos.ListOfQueueRepository;
import com.webserver.webserver.repos.NotificationRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@CrossOrigin
@RequestMapping(path = "/notification")
public class NotificationController {
    private final NotificationRepository notificationRepository;
    private final ListOfQueueRepository listOfQueueRepository;

    public NotificationController(NotificationRepository notificationRepository, ListOfQueueRepository listOfQueueRepository) {
        this.notificationRepository = notificationRepository;
        this.listOfQueueRepository = listOfQueueRepository;
    }

    @GetMapping("/swap")
    public @ResponseBody String requestToSwap(@RequestParam Long idSender, @RequestParam Long idRecipient,
                                              @RequestParam Long idQueue) {
        Notification notification = Notification.newBuilder()
                .setIdQueue(idQueue)
                .setIdRecipient(idRecipient)
                .setIdSender(idSender)
                .build();

        notificationRepository.save(notification);

        return new JsonUtil().responseOfFindAndAdd("Add notification", 200);
    }

    @GetMapping("/check")
    public @ResponseBody Iterable<Notification> checkNotification(@RequestParam Long idStudent) {
        return notificationRepository.findAllByIdRecipient(idStudent);
    }

    @GetMapping("/answer")
    public @ResponseBody String answer(@RequestParam short answer, @RequestParam Long idSender, @RequestParam Long idRecipient, @RequestParam Long idQueue) {
        if (answer == 1) {
            Optional<ListOfQueues> senderOptional = listOfQueueRepository.findByIdStudentAndIdQueue(idSender, idQueue);
            Optional<ListOfQueues> recipientOptional = listOfQueueRepository.findByIdStudentAndIdQueue(idRecipient, idQueue);

            if (senderOptional.isPresent() && recipientOptional.isPresent()) {
                ListOfQueues sender = senderOptional.get();
                ListOfQueues recipient = recipientOptional.get();
                int position = sender.getPositionStudent();

                sender.setPositionStudent(recipient.getPositionStudent());
                recipient.setPositionStudent(position);
            }
        }

        notificationRepository.deleteAll(notificationRepository.findAllByIdRecipientAndIdSenderAndIdQueue(idSender, idRecipient, idQueue));

        return new JsonUtil().responseOfFindAndAdd("Answered to notification", 200);
    }
}
