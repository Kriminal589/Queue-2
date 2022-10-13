package com.webserver.webserver.repos;

import com.webserver.webserver.models.Notification;
import org.springframework.data.repository.CrudRepository;

public interface NotificationRepository extends CrudRepository<Notification, Long> {
    Iterable<Notification> findAllByIdRecipient(Long idStudent);

    Iterable<Notification> findAllByIdRecipientAndIdSenderAndIdQueue(Long idSender, Long idRecipient, Long idQueue);
}
