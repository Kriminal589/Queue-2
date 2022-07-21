package com.webserver.webserver.repos;

import com.webserver.webserver.models.Student;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface StudentRepository extends CrudRepository<Student, Long> {
    Optional<Student> findByNameOfStudent(String NameOfStudent);
}
