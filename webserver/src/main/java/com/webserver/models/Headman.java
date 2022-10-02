package com.webserver.models;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Headman {
    @Id
    private Long id;


    public Headman() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
