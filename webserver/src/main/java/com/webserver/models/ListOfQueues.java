package com.webserver.models;


import javax.persistence.*;


@Entity
public class ListOfQueues {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;
    @Column(name = "id_student")
    private Long idStudent;
    @Column(name = "id_queue")
    private Long idQueue;
    private int positionStudent = 0;
    private int numberOfAppStudent;
    private Long queueEntryDate;

    public Long getIdStudent() {
        return idStudent;
    }

    public int getNumberOfAppStudent() {
        return numberOfAppStudent;
    }

    public Long getIdQueue() {
        return idQueue;
    }


    public int getPositionStudent() {
        return positionStudent;
    }

    public Long getQueueEntryDate() {
        return queueEntryDate;
    }

    public void setPositionStudent(int positionStudent) {
        this.positionStudent = positionStudent;
    }

    public ListOfQueues() {
    }

    public static Builder newBuilder(){
        return new ListOfQueues().new Builder();
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
        public ListOfQueues build(){
            return ListOfQueues.this;
        }
    }
}
