const ip = "25.84.228.15";
const port = "8080";

export class serverRequest {
  static async addStudent(idS, name, domen) {
    return await sendRequestAsync(`student/add/${idS}/${name.replace(" ", "_")}/${domen}`);
  }
  static async getQueuesById(idS) {
    return await sendRequestAsync(`listOfQueues/getByIdStudent/${idS}`);
  }
  static async request(url_to, type) {
    return await sendRequestAsync(url_to, type);
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
}

async function sendRequestAsync(url_to) {
  const url = `http://${ip}:${port}/${url_to}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  } catch (err) {
    return -1;
  }
}
