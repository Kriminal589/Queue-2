package com.webserver.repos;

import com.webserver.models.Student;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface StudentRepository extends CrudRepository<Student, Long> {
    Optional<Student> findByNameOfStudent(String NameOfStudent);
}
