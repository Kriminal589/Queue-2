package com.webserver.jsonResponse;

import java.util.ArrayList;
import java.util.List;

public class ListResponseStudent {
    private final List<ResponseAboutStudent> responseAboutStudentList;

    public void add(ResponseAboutStudent responseAboutStudent){
        responseAboutStudentList.add(responseAboutStudent);
    }

    public ListResponseStudent() {
        responseAboutStudentList = new ArrayList<>();
    }
}
