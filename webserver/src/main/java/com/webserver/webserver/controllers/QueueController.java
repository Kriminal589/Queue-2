package com.webserver.webserver.controllers;

import com.webserver.webserver.customTimer.CustomTimer;
import com.webserver.webserver.hash.CRC32Hash;
import com.webserver.webserver.jsonResponse.JsonUtil;
import com.webserver.webserver.models.ListOfQueues;
import com.webserver.webserver.models.Queue;
import com.webserver.webserver.repos.ListOfQueueRepository;
import com.webserver.webserver.repos.QueueRepository;
import org.springframework.boot.actuate.endpoint.annotation.WriteOperation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.*;


@Controller
@CrossOrigin
@RequestMapping(path = "/queue")
public class QueueController {

    private final ArrayList<CustomTimer> customTimers = new ArrayList<>();
    private final QueueRepository queueRepository;
    private final ListOfQueueRepository listOfQueueRepository;
    private final HeadmanRepository headmanRepository;

    public QueueController(QueueRepository queueRepository, ListOfQueueRepository listOfQueueRepository, HeadmanRepository headmanRepository) {
        this.queueRepository = queueRepository;
        this.listOfQueueRepository = listOfQueueRepository;
        this.headmanRepository = headmanRepository;
    }

    @GetMapping("/add")
    @WriteOperation
    public @ResponseBody String add(@RequestParam String subjectName, @RequestParam short type,
                                    @RequestParam short dependOnApps, @RequestParam int countApps,
                                    @RequestParam short dependOnDate, @RequestParam int dateToPass,
                                    @RequestParam Long idStudent){

        JsonUtil util = new JsonUtil();
        Optional<Headman> isStudentHeadman = headmanRepository.findById(idStudent);

        if (isStudentHeadman.isPresent()) {
            Queue queue = new Queue();
            queue.setCountApps(countApps);
            queue.setDateToPass(dateToPass);
            queue.setDependOnApps(dependOnApps);
            queue.setDependOnDate(dependOnDate);
            queue.setType(type);
            queue.setIdCreator(idStudent);
            queue.setSubjectName(subjectName);
            queue.setHexCode(new CRC32Hash().getHash(subjectName+idStudent+Instant.now().getEpochSecond()));

            queueRepository.save(queue);

            listOfQueueRepository.save(ListOfQueues.newBuilder()
            .setIdQueue(queue.getId())
            .setIdStudent(idStudent)
            .setNumberOfAppStudent(1)
            .setPositionStudent(1)
            .setQueueEntryDate(Instant.now().getEpochSecond())
            .build());

            TimerTask timerTask = new TimerTask() {
                @Override
                public void run() {
                    List<ListOfQueues> listOfQueuesList = listOfQueueRepository.findAllByIdQueue(queue.getId());
                    int currentApp = queue.getCurrentApp() + 1;

                    queue.setCurrentApp(currentApp);
                    queueRepository.save(queue);
                    listOfQueueRepository.saveAll(sort(listOfQueuesList));

                    System.out.println("Sorted");
                }
            };

            if (type == 1) {
                Timer timer = new Timer();

                customTimers.add(new CustomTimer(timer, queue.getId()));
                timer.schedule(timerTask, dateToPass * 604800000L, dateToPass * 604800000L);
            }

            return util.responseOfFindAndAdd(queue.getHexCode(), 200);
        }

        return util.responseOfFindAndAdd("Student isn't headman", 404);
    }

    @GetMapping("/test")
    public ResponseEntity<String> test (@RequestHeader(value = "Authorization") String key) {
        return ResponseEntity.status(HttpStatus.OK).body(key);
    }

    @GetMapping("/all")
    public @ResponseBody
    Iterable<Queue> getAllQueue() {
        return queueRepository.findAll();
    }

    @GetMapping("/getById/{idQueue}")
    public @ResponseBody
    Optional<Queue> getQueueById(@PathVariable Long idQueue) {
        return queueRepository.findById(idQueue);
    }

    @GetMapping("/getByHEX/{hexCode}")
    public @ResponseBody
    Optional<Queue> getQueueById(@PathVariable String hexCode) {
        return queueRepository.findByHexCode(hexCode);
    }

    @DeleteMapping("/delete/{idQueue}")
    public @ResponseBody String deleteById(@PathVariable Long idQueue) {

        JsonUtil util = new JsonUtil();
        Optional<Queue> queue = queueRepository.findById(idQueue);

        if (queue.isPresent()) {
            Queue q = queue.get();
            List<ListOfQueues> listOfQueues = listOfQueueRepository.findAllByIdQueue(idQueue);

            if (!listOfQueues.isEmpty()) {
                listOfQueueRepository.deleteAll(listOfQueues);
            }

            queueRepository.delete(q);
            for (CustomTimer timer : customTimers) {
                if (Objects.equals(timer.getId(), idQueue)) {
                    timer.getTimer().cancel();
                    customTimers.remove(timer);
                }
            }

            return util.responseOfFindAndAdd("Deleted", 200);
        }else{
            return util.responseOfFindAndAdd("Not found", 404);
        }
    }

    @DeleteMapping("/delete/all")
    public @ResponseBody String deleteAll() {

        JsonUtil util = new JsonUtil();
        queueRepository.deleteAll();
        listOfQueueRepository.deleteAll();

        for (CustomTimer timer:customTimers) {
            timer.getTimer().cancel();
            customTimers.remove(timer);
        }

        return util.responseOfFindAndAdd("Deleted all queues", 200);
    }

    public List<ListOfQueues> sort(List<ListOfQueues> list) {
        List<ListOfQueues> current = new ArrayList<>();
        List<ListOfQueues> late = new ArrayList<>();
        List<ListOfQueues> hurrying = new ArrayList<>();
        Optional<Queue> optionalQueue = queueRepository.findById(list.get(0).getIdQueue());

        if (optionalQueue.isPresent()) {
            Queue queue = optionalQueue.get();
            for (ListOfQueues item : list) {
                if (Instant.now().getEpochSecond() / item.getQueueEntryDate() > queue.getDateToPass()) {
                    current.add(0, item);
                } else if (item.getNumberOfAppStudent() == queue.getCurrentApp()) {
                    current.add(item);
                } else if (item.getNumberOfAppStudent() < queue.getCurrentApp()) {
                    late.add(item);
                } else if (item.getNumberOfAppStudent() > queue.getCurrentApp()) {
                    hurrying.add(item);
                }
            }
        }

        sortByEntryDate(current);
        sortByEntryDate(late);
        sortByEntryDate(hurrying);

        current.addAll(late);
        current.addAll(hurrying);

        return current;
    }
    public void sortByEntryDate(List<ListOfQueues> list) {
        for (int i = 0; i < list.size()-1; i++) {
            for (int j = i; j < list.size(); j++) {
                if (list.get(i).getQueueEntryDate() > list.get(j).getQueueEntryDate()) {
                    Collections.swap(list, i, j);
                }
            }
        }
    }
}
