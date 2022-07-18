package com.webserver.webserver.models;


import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Student {
    @Id
    private Long id;

    private String NameOfStudent, domain;
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
        return NameOfStudent;
    }

    public void setNameOfStudent(String nameOfStudent) {
        NameOfStudent = nameOfStudent;
    }

    public String getDomain() {
        return domain;
    }

    public void setDomain(String domain) {
        this.domain = domain;
    }

    public Long getIdHeadman() {
        return idHeadman;
    }

    public void setIdHeadman(Long idHeadman) {
        this.idHeadman = idHeadman;
    }
}
