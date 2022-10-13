package com.webserver.webserver.models;

import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Getter
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Long idSender;
    private Long idRecipient;
    private Long idQueue;

    public Notification() {}

    public static Builder newBuilder(){
        return new Notification().new Builder();
    }

    public class Builder{
        public Builder setIdQueue(Long idQueue) {
            Notification.this.idQueue = idQueue;
            return this;
        }

        public Builder setIdSender(Long idSender) {
            Notification.this.idSender = idSender;
            return this;
        }

        public Builder setIdRecipient(Long idRecipient) {
            Notification.this.idRecipient = idRecipient;
            return this;
        }

        public Notification build() {
            return Notification.this;
        }

    }
}
