package com.webserver.webserver.Timer;

import java.util.Timer;

public class CustomTimer {
    public Long idQueue;
    public Timer timer;

    public CustomTimer(Long idQueue, Timer timer){
        this.idQueue = idQueue;
        this.timer = timer;
    }
}
