package com.webserver.webserver.Timer;

import java.util.TimerTask;

public class SortTimer extends TimerTask {

    private Long id;

    private SortTimer(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public void run() {
        Sort.sort(id);
    }

    public static Builder newBuilder(){
        return new SortTimer().new Builder();
    }

    public class Builder{
        private Builder(){}

        public Builder setId(Long id){
            SortTimer.this.id = id;

            return this;
        }

        public SortTimer build(){
            return SortTimer.this;
        }
    }
}
