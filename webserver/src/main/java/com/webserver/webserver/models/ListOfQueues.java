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
    private Long idStudent, idQueue;
    private int positionStudent = 0;
    private int numberOfAppStudent;
    private Long queueEntryDate;

    public Long getQueueEntryDate() {
        return queueEntryDate;
    }

    public void setQueueEntryDate(Long queueEntryDate) {
        this.queueEntryDate = queueEntryDate;
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

    public ListOfQueues() {
    }
}
