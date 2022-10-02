package com.webserver.Timer;

import com.webserver.models.ListOfQueues;
import com.webserver.models.Queue;
import com.webserver.repos.ListOfQueueRepository;
import com.webserver.repos.QueueRepository;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/*
TODO
n - кол-во недель на сдачу

1. Если время ожидания студента равно n+1, то стдуент ставится первый в очередь
2. Если номер сдачи задания больше, чем номер актуальной задачи, то студент отправляется в конец очереди
3. У актуальной задачи больше приоритета, чем у любых других, но у отстающих больше приоритет, чем у идущих (спешащих) студентов
4. Если все входные данные одинаковые, то используется время входа в очередь.
 */

public class Sort {
    private final ListOfQueueRepository listOfQueueRepository;
    private final QueueRepository queueRepository;

    public Sort(ListOfQueueRepository listOfQueueRepository, QueueRepository queueRepository) {
        this.listOfQueueRepository = listOfQueueRepository;
        this.queueRepository = queueRepository;
    }

    public void sort(Long idQueue){
        List<ListOfQueues> listOfQueues = listOfQueueRepository.findAllByIdQueue(idQueue);
        Optional<Queue> queueOptional = queueRepository.findById(idQueue);
        if (queueOptional.isPresent() && !listOfQueues.isEmpty()){
            Queue queue = queueOptional.get();
            queue.setCurrentApp(queue.getCurrentApp() + 1);
            List<ListOfQueues> listForWeek = new ArrayList<>(); //Список для тех, кто уже долго ждет
            List<ListOfQueues> listOfCurrentApp = new ArrayList<>(); //Список со студентами, у которых актуальная задача
            List<ListOfQueues> listOfLast = new ArrayList<>(); //Список студентов, у которые отстают
            List<ListOfQueues> listOfFast = new ArrayList<>(); //Список студентов, которые спешат
            for (ListOfQueues student: listOfQueues){
                if ((student.getQueueEntryDate() - Instant.now().getEpochSecond()) > 10000) //(student.getQueueEntryDate() - Instant.now().getEpochSecond()) / 604800000 > queue.getDateToPass()
                    listForWeek.add(student);
                else {
                    if (student.getNumberOfAppStudent() == queue.getCurrentApp())
                        listOfCurrentApp.add(student);
                    else if (student.getNumberOfAppStudent() > queue.getCurrentApp())
                        listOfFast.add(student);
                    else
                        listOfLast.add(student);
                }
            }

            changePosition(0, listForWeek);
            changePosition(listForWeek.size(), listOfCurrentApp);
            changePosition(listOfCurrentApp.size(), listOfLast);
            changePosition(listOfLast.size(), listOfFast);

            listOfQueues = listForWeek;
            listOfQueues.addAll(listOfCurrentApp);
            listOfQueues.addAll(listOfLast);
            listOfQueues.addAll(listOfFast);
            listOfQueueRepository.saveAll(listOfQueues);
        }
    }

    public void changePosition(int size, List<ListOfQueues> list){
        for (ListOfQueues student: list){
            student.setPositionStudent(++size);
        }
    }
}
