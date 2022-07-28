import { LoadBarToHtml } from "./loadBar";

const ip = "25.84.228.15";
const port = "8080";

export class serverRequest {
  static async addStudent(idS, name, domen) {
    return await sendRequestAsync(`student/add?id=${idS}&NameOfStudent=${name.replace(" ", "_")}&domain=${domen}`);
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
  static async getCRC32hash(idQ, expire) {
    return await sendRequestAsync(`hash/${idQ}^${expire}`);
  }
  static async decrytptHash(hash) {
    return await sendRequestAsync(`dehash/${hash}`)
  }
}

async function sendRequestAsync(url_to) {
  const url = `http://${ip}:${port}/${url_to}`;
  var $modal = document.createElement('div')
  $modal.classList.add('modal')
  $modal.innerHTML = LoadBarToHtml()
  document.body.appendChild($modal)
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    document.body.removeChild($modal)
    return response.json();
  } catch (err) {
    document.body.removeChild($modal)
    return -1;
  }
}
