package com.webserver.webserver.models;


import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Student {
    @Id
    private Long id;

    private String nameOfStudent;
    private Long idHeadman;

    public Student() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNameOfStudent() {
        return nameOfStudent;
    }

    public void setNameOfStudent(String nameOfStudent) {
        this.nameOfStudent = nameOfStudent;
    }


    public Long getIdHeadman() {
        return idHeadman;
    }

    public void setIdHeadman(Long idHeadman) {
        this.idHeadman = idHeadman;
    }


}
