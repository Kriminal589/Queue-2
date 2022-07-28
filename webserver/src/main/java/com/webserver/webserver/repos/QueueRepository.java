package com.webserver.webserver.repos;

import com.webserver.webserver.models.Queue;
import org.springframework.data.repository.CrudRepository;


public interface QueueRepository extends CrudRepository<Queue, Long> {
}
