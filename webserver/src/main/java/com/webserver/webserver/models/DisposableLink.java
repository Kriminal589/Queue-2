package com.webserver.webserver.models;

import javax.persistence.*;

@Entity
public class DisposableLink {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    @Column
    private String extension;

    public Long getId() {
        return id;
    }

    public String getExtension() {
        return extension;
    }

    public void setExtension(String extension) {
        this.extension = extension;
    }
}
