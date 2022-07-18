package com.webserver.webserver.repos;

import com.webserver.webserver.models.Student;
import org.springframework.data.repository.CrudRepository;

public interface StudentRepository extends CrudRepository<Student, Long> {
}
