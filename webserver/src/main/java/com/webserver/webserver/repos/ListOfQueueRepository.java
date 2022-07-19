package com.webserver.webserver.repos;

import com.webserver.webserver.models.ListOfQueues;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ListOfQueueRepository extends CrudRepository<ListOfQueues, Long> {
    List<ListOfQueues> findAllByIdQueue(Long idQueue);
}
