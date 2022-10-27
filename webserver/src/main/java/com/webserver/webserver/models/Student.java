package com.webserver.webserver.models;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Setter
@Getter
public class Student {
    @Id
    private Long id;
    @Column
    private String nameOfStudent;
    @Column
    private Long idHeadman;
    
    public Student() {}
}
