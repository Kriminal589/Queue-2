package com.webserver.repos;

import com.webserver.models.ListOfQueues;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface ListOfQueueRepository extends CrudRepository<ListOfQueues, Long> {
    List<ListOfQueues> findAllByIdQueue(Long idQueue);
    List<ListOfQueues> findAllByIdStudent(Long idStudent);
    Optional<ListOfQueues> findByIdStudentAndIdQueue(Long idStudent, Long idQueue);
}
