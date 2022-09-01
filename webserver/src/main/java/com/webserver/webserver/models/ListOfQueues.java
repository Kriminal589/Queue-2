package com.webserver.webserver.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Entity
public class ListOfQueues {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String nameOfSubject, hexCode;

    private Long idStudent, idQueue, idCreater;
    private int positionStudent = 0;
    private int numberOfAppStudent;
    private int currentApp;
    private Long queueEntryDate;

    public java.lang.Long getIdCreater() {
        return idCreater;
    }

    public void setIdCreater(java.lang.Long idCreater) {
        this.idCreater = idCreater;
    }

    public Long getQueueEntryDate() {
        return queueEntryDate;
    }

    public void setQueueEntryDate(Long queueEntryDate) {
        this.queueEntryDate = queueEntryDate;
    }

    public String getHexCode() {
        return hexCode;
    }

    public void setHexCode(String hexCode) {
        this.hexCode = hexCode;
    }

    public int getNumberOfAppStudent() {
        return numberOfAppStudent;
    }

    public void setNumberOfAppStudent(int numberOfAppStudent) {
        this.numberOfAppStudent = numberOfAppStudent;
    }

    public Long getIdStudent() {
        return idStudent;
    }

    public String getNameOfSubject() {
        return nameOfSubject;
    }

    public void setNameOfSubject(String nameOfSubject) {
        this.nameOfSubject = nameOfSubject;
    }

    public void setIdStudent(Long idStudent) {
        this.idStudent = idStudent;
    }

    public Long getIdQueue() {
        return idQueue;
    }

    public void setIdQueue(Long idQueue) {
        this.idQueue = idQueue;
    }

    public int getPositionStudent() {
        return positionStudent;
    }

    public void setPositionStudent(int positionStudent) {
        this.positionStudent = positionStudent;
    }

    public Long getId() {
        return id;
    }

    public int getCurrentApp() {
        return currentApp;
    }

    public void setCurrentApp(int currentApp) {
        this.currentApp = currentApp;
    }

    public ListOfQueues() {
    }


//    {"id":4,"nameOfSubject":"History","hexCode":null,"idStudent":236673313,"idQueue":1,"positionStudent":1,"numberOfAppStudent":0,"currentApp":1},
//    {"id":5,"nameOfSubject":"OAIP","hexCode":null,"idStudent":236673313,"idQueue":2,"positionStudent":1,"numberOfAppStudent":0,"currentApp":1},
//    {"id":6,"nameOfSubject":"СИАОД","hexCode":null,"idStudent":236673313,"idQueue":3,"positionStudent":1,"numberOfAppStudent":0,"currentApp":1}

}
