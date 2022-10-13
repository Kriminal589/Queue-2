package com.webserver.webserver.customTimer;

import java.util.Timer;

public class CustomTimer {
    private final Timer timer;
    private final Long id;

    public CustomTimer(Timer timer, Long id) {
        this.timer = timer;
        this.id = id;
    }
}
