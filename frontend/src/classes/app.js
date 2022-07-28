import { QList } from "./Qlist";
import { serverRequest } from "./serverReq";

export class App {
  #qList = new QList();
  constructor() {
    this.#setup();
  }

  error() {
    document.getElementById("fl_co").innerHTML =
      '<div class="error">Сайт не работает. Звоните фиксикам или попробуйте обновить страницу :)</div>';
  }

  async #setup() {
    const {uid, first_name, last_name, domain} = JSON.parse(localStorage.getItem("vk_auth"))
    const response = await serverRequest.addStudent(uid, `${first_name} ${last_name}`, domain)
    console.log(response)
    await this.#qList.parseListOfQueues(uid)
    this.render()
  }

  render() {
    const data = JSON.parse(localStorage.getItem("auth-data"));
    this.#qList.render()
    console.log("render...");
  }
}

