package com.webserver.jsonResponse;

public class JsonResponse {
    private int code;
    private StringBuilder response;

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public StringBuilder getResponse() {
        return response;
    }

    public void setResponse(StringBuilder response) {
        this.response = response;
    }

    public JsonResponse() {
    }

    public void response(String response, int code){
        setResponse(new StringBuilder(response));
        setCode(code);
    }

}
