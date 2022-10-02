package com.webserver.repos;

import com.webserver.models.Queue;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;


public interface QueueRepository extends CrudRepository<Queue, Long> {
    Optional<Queue> findByHexCode(String hex);
}
