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

  #setup() {
    //this.#qList.parseListOfQueues()
    this.render()
  }

  render() {
    const data = JSON.parse(localStorage.getItem("auth-data"));
    this.#qList.render()
    console.log("render...");
  }
}

