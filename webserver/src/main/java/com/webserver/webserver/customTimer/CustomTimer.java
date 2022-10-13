package com.webserver.webserver.customTimer;

import lombok.Getter;

import java.util.Timer;

@Getter
public class CustomTimer {
    private final Timer timer;
    private final Long id;

    public CustomTimer(Timer timer, Long id) {
        this.timer = timer;
        this.id = id;
    }
}
