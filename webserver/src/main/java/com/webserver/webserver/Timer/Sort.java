package com.webserver.webserver.Timer;

import com.webserver.webserver.repos.ListOfQueueRepository;
import com.webserver.webserver.repos.QueueRepository;

public class Sort {

    private final ListOfQueueRepository listOfQueueRepository;
    private final QueueRepository queueRepository;

    public Sort(ListOfQueueRepository listOfQueueRepository, QueueRepository queueRepository) {
        this.listOfQueueRepository = listOfQueueRepository;
        this.queueRepository = queueRepository;
    }

    public static void sort(Long id){

    }
}
