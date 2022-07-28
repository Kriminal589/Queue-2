package com.webserver.webserver.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Arrays;
import java.util.List;

@Entity
public class ListOfQueues {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String nameOfSubject;

    private Long idStudent, idQueue;
    private int positionStudent = 0;
    private int numberOfAppStudent;
    private int currentApp;

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

    public List<ListOfQueues> sortByNumberOfApp(List<ListOfQueues> list){
        try {
            ListOfQueues[] listForSort = (ListOfQueues[]) list.toArray();
            for (int i = 0; i < listForSort.length - 1; i++) {
                for (int j = 0; j < listForSort.length; j++) {
                    if (listForSort[j].numberOfAppStudent > currentApp && listForSort[j].numberOfAppStudent > listForSort[j+1].numberOfAppStudent){
                        ListOfQueues listOfQueues = listForSort[j+1];
                        listForSort[j+1] = listForSort[j];
                        listForSort[j] = listOfQueues;
                    }
                    else if (listForSort[j].numberOfAppStudent < currentApp && listForSort[j+1].numberOfAppStudent == currentApp){
                        ListOfQueues listOfQueues = listForSort[j+1];
                        listForSort[j+1] = listForSort[j];
                        listForSort[j] = listOfQueues;
                    }
                }
            }
            list = Arrays.stream(listForSort).toList();
            return list;
        }catch (Exception e){
            e.printStackTrace();
            throw new NullPointerException();
        }
    }
}
