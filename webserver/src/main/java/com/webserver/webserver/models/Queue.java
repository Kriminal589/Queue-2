package com.webserver.webserver.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Queue {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    private String type, SubjectName, dateToPass;
    private int countApps;
    private int currentApp = 1;
    private short dependOnApps, dependOnDate;

    public Long getId() {
        return id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getSubjectName() {
        return SubjectName;
    }

    public void setSubjectName(String subjectName) {
        SubjectName = subjectName;
    }

    public int getCountApps() {
        return countApps;
    }

    public void setCountApps(int countApps) {
        this.countApps = countApps;
    }

    public short getDependOnApps() {
        return dependOnApps;
    }

    public void setDependOnApps(short dependOnApps) {
        this.dependOnApps = dependOnApps;
    }

    public short getDependOnDate() {
        return dependOnDate;
    }

    public void setDependOnDate(short dependOnDate) {
        this.dependOnDate = dependOnDate;
    }

    public String getDateToPass() {
        return dateToPass;
    }

    public void setDateToPass(String dateToPass) {
        this.dateToPass = dateToPass;
    }

    public int getCurrentApp() {
        return currentApp;
    }

    public void setCurrentApp(int currentApp) {
        this.currentApp = currentApp;
    }

    public Queue() {
    }

}
