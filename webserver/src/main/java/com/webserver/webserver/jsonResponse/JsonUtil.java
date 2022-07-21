package com.webserver.webserver.jsonResponse;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class JsonUtil {
    public String response(String response, int code){
        JsonResponse jsonResponse = new JsonResponse();
        jsonResponse.response(response, code);
        Gson gson = new GsonBuilder()
                .setPrettyPrinting().create();
        return gson.toJson(jsonResponse);
    }
}