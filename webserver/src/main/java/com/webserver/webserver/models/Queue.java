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

    private String subjectName, hexCode;
    private Long idCreator;
    private int countApps, dateToPass;
    private int currentApp = 1;
    private short dependOnApps, dependOnDate, type;

    public Long getIdCreator() {
        return idCreator;
    }

    public void setIdCreator(Long idCreator) {
        this.idCreator = idCreator;
    }

    public String getHEXCode() {
        return hexCode;
    }

    public void setHexCode(String HEXCode) {
        this.hexCode = HEXCode;
    }

    public Long getId() {
        return id;
    }

    public short getType() {
        return type;
    }

    public void setType(short type) {
        this.type = type;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
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

    public int getDateToPass() {
        return dateToPass;
    }

    public void setDateToPass(int dateToPass) {
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
