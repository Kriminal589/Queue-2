package com.webserver.models;

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

    public int getCurrentApp() {
        return currentApp;
    }

    public int getDateToPass() {
        return dateToPass;
    }

    public void setCurrentApp(int currentApp) {
        this.currentApp = currentApp;
    }

    public String getHEXCode() {
        return hexCode;
    }

    public Long getId() {
        return id;
    }
    public Queue() {
    }

    public static Builder newBuilder(){return new Queue().new Builder();}

    public class Builder{
        private Builder(){};
        public Builder setIdCreator(Long idCreator) {
            Queue.this.idCreator = idCreator;
            return this;
        }
        public Builder setHexCode(String HEXCode) {
            Queue.this.hexCode = HEXCode;
            return this;
        }
        public Builder setType(short type) {
            Queue.this.type = type;
            return this;
        }
        public Builder setSubjectName(String subjectName) {
            Queue.this.subjectName = subjectName;
            return this;
        }
        public Builder setCountApps(int countApps) {
            Queue.this.countApps = countApps;
            return this;
        }
        public Builder setDependOnApps(short dependOnApps) {
            Queue.this.dependOnApps = dependOnApps;
            return this;
        }
        public Builder setDependOnDate(short dependOnDate) {
            Queue.this.dependOnDate = dependOnDate;
            return this;
        }
        public Builder setDateToPass(int dateToPass) {
            Queue.this.dateToPass = dateToPass;
            return this;
        }
        public Builder setCurrentApp(int currentApp) {
            Queue.this.currentApp = currentApp;
            return this;
        }
        public Queue build(){return Queue.this;}
    }
}
