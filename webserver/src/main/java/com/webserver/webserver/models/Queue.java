package com.webserver.webserver.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Setter
@Getter
public class Queue {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    private String SubjectName, hexCode;
    private Long idCreator;
    private int countApps, dateToPass;
    private int currentApp = 1;
    private short dependOnApps, dependOnDate, type;
    public Queue() {}
}
