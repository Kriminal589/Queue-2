package com.webserver.webserver.models;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@Setter
public class Headman {
    @Id
    private Long id;
    public Headman() {
    }
}
