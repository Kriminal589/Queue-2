package com.webserver.webserver.repos;

import com.webserver.webserver.models.Queue;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;


public interface QueueRepository extends CrudRepository<Queue, Long> {
    Optional<Queue> findByHEXCode(String hex);
}
