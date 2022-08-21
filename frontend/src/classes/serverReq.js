import { $LoadBar } from "./loadBar";
("use strict");
require("fs");

const ip = "25.84.228.15";
const port = "8080";

export class serverRequest {
    static async addStudent(idS, name) {
        return await sendRequestAsync(
            `student/add?id=${idS}&NameOfStudent=${name.replace(" ", "_")}`,
        );
    }
    static async getQueuesById(idS) {
        return await sendRequestAsync(`listOfQueues/getByIdStudent/${idS}`);
    }
    static async getQueuePropertyById(idQ) {
        return await sendRequestAsync(`queue/get/${idQ}`);
    }
    static async getListOfStudentInQueueById(idQ) {
        return await sendRequestAsync(`listOfQueues/getByIdQueue/${idQ}`);
    }
    static async getAllStudent() {
        return await sendRequestAsync(`student/all`);
    }
    static async appendQ(idS, hash, app) {
        return await sendRequestAsync(`listOfQueues/add/${hash}/${idS}/${app}`);
    }
    static async getListNotice(id) {
        return [];
    }
    static async leaveFromQueue(idQueue, idStudent) {
        return await sendRequestAsync(`listOfQueues/ByIdStudentAndQueue/${idStudent}/${idQueue}`);
    }
    static async createQ(
        name,
        type,
        dependOnApps,
        CountApps,
        DependOnDate,
        DateToPass,
        idS,
    ) {
        return await sendRequestAsync(
            `queue/add?subjectName=${name}&type=${boolToInt(
                type,
            )}&dependOnApps=${boolToInt(
                dependOnApps,
            )}&countApps=${CountApps}&dependOnDate=${boolToInt(
                DependOnDate,
            )}&dateToPass=${DateToPass}&idStudent=${idS}`,
        );
    }
}

const boolToInt = (int) => (int ? 1 : 0);

async function sendRequestAsync(url_to) {
    const url = `https://${ip}:${port}/${url_to}`;
    const loadbar = new $LoadBar();
    loadbar.load(url_to);
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: JSON.stringify("12345"),
            },
        });
        loadbar.destroy(url_to);
        return response.json();
    } catch (err) {
        loadbar.destroy(url_to);
        return -1;
    }
}
