import { $LoadBar } from "./loadBar";

const ip = process.env.IP_ADDRESS;
const port = process.env.PORT;
const protocol = document.location.protocol

export class serverRequest {
    static async addStudent(idS, name) {
        return await sendRequestAsync(
            `student/add?id=${idS}&NameOfStudent=${name.replace(" ", "_")}`,
        );
    }
    static async getQueuesById(idS) {
        return await sendRequestAsync(`listOfQueues/getByIdStudent/${idS}`);
    }
    static async getQueuePropertyById(idQueue) {
        return await sendRequestAsync(`queue/getById/${idQueue}`);
    }
	static async getQueuePropertyByHex(hexQueue) {
		return await sendRequestAsync(`queue/getByHEX/${hexQueue}`);
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
        return await sendRequestAsyncDelete(
            `listOfQueues/delete/ByIdStudentAndQueue/${idStudent}/${idQueue}`,
        );
    }
    static async deleteQueueById(idQueue) {
        return await sendRequestAsyncDelete(`queue/delete/${idQueue}`);
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
    const url = `${protocol}//${ip}:${port}/${url_to}`;
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

async function sendRequestAsyncDelete(url_to) {
    const url = `http://${ip}:${port}/${url_to}`;
    const loadbar = new $LoadBar();
    loadbar.load(url_to);
    try {
        const response = await fetch(url, {
            method: "DELETE",
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
