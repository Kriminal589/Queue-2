package com.webserver.Timer;

import com.webserver.repos.ListOfQueueRepository;
import com.webserver.repos.QueueRepository;

import java.util.TimerTask;

public class SortTimer extends TimerTask {

    private Long id;
    private ListOfQueueRepository listOfQueueRepository;
    private QueueRepository queueRepository;

    private SortTimer(){}
    public ListOfQueueRepository getListOfQueueRepository() {
        return listOfQueueRepository;
    }
    public QueueRepository getQueueRepository() {
        return queueRepository;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    @Override
    public void run() {
        new Sort(listOfQueueRepository, queueRepository).sort(id);
    }

    public static Builder newBuilder(){
        return new SortTimer().new Builder();
    }

    public class Builder{
        private Builder(){}
        public Builder setListOfQueueRepository(ListOfQueueRepository listOfQueueRepository) {
            SortTimer.this.listOfQueueRepository = listOfQueueRepository;
            return this;
        }
        public Builder setQueueRepository(QueueRepository queueRepository) {
            SortTimer.this.queueRepository = queueRepository;
            return this;
        }
        public Builder setId(Long id){
            SortTimer.this.id = id;
            return this;
        }
        public SortTimer build(){
            return SortTimer.this;
        }
    }
}
