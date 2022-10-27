package com.webserver.webserver.models;

import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Entity
@Getter
public class ListOfQueues {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column
    private Long idStudent, idQueue;
    @Column
    private int positionStudent = 0;
    @Column
    private int numberOfAppStudent;
    @Column
    private Long queueEntryDate;

    public ListOfQueues() {
    }

    public static Builder newBuilder() {
        return new ListOfQueues().new Builder();
    }

    public void setPositionStudent(int i) {
        positionStudent = i;
    }

    public class Builder{
        private Builder(){}

        public Builder setQueueEntryDate(Long queueEntryDate) {
            ListOfQueues.this.queueEntryDate = queueEntryDate;
            return this;
        }

        public Builder setNumberOfAppStudent(int numberOfAppStudent) {
            ListOfQueues.this.numberOfAppStudent = numberOfAppStudent;
            return this;
        }

        public Builder setIdStudent(Long idStudent) {
            ListOfQueues.this.idStudent = idStudent;
            return this;
        }

        public Builder setIdQueue(Long idQueue) {
            ListOfQueues.this.idQueue = idQueue;
            return this;
        }

        public Builder setPositionStudent(int positionStudent) {
            ListOfQueues.this.positionStudent = positionStudent;
            return this;
        }

        public ListOfQueues build() {
            return ListOfQueues.this;
        }
    }
}
