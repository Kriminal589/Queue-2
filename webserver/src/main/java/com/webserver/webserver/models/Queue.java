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
    @Column
    private String SubjectName;
    @Column
    private String hexCode;
    @Column
    private Long idCreator;
    @Column
    private int countApps;
    @Column
    private int dateToPass;
    @Column
    private int currentApp = 1;
    @Column
    private short dependOnApps;
    @Column
    private short dependOnDate;
    @Column
    private short type;
    
    public Queue() {}
}
