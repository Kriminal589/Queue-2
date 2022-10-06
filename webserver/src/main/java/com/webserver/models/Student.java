package com.webserver.models;


import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Student {
    @Id
    private Long id;

    private String nameOfStudent;
    private Long idHeadman;

    public Student() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNameOfStudent() {
        return nameOfStudent;
    }

    public void setNameOfStudent(String nameOfStudent) {
        this.nameOfStudent = nameOfStudent;
    }
<<<<<<< HEAD

=======
>>>>>>> ceaf438d479da9e0df02895a70e0b8c85043bb60
}
