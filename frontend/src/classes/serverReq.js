import { $LoadBar } from "./loadBar";

const ip = "25.84.228.15";
const port = "8080";

export class serverRequest {
  static async addStudent(idS, name, domen) {
    return await sendRequestAsync(`student/add?id=${idS}&NameOfStudent=${name.replace(" ", "_")}&domain=${domen}`);
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
  static async appendQ(idS) {
    return await sendRequestAsync(`listOfQueues/add/{idQueue}/{idStudent}/{numberOfAppStudent}`);
  }
  static async request(url) {
    return await sendRequestAsyncURL(url)
  }
}

async function sendRequestAsync(url_to) {
  const url = `http://${ip}:${port}/${url_to}`;
  const loadbar = new $LoadBar
  loadbar.load(url_to)
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    loadbar.destroy(url_to)
    return response.json();
  } catch (err) {
    loadbar.destroy(url_to)
    return -1;
  }
}

async function sendRequestAsyncURL(url_to) {
  $LoadBar.load()
  try {
    const response = await fetch(url_to, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    $LoadBar.destroy()
    return response.json();
  } catch (err) {
    $LoadBar.destroy()
    return -1;
  }
}
