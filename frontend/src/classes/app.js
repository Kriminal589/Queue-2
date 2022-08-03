import { QList } from "./Qlist";
import { serverRequest } from "./serverReq";
import { ReloadName } from "../util/util";
import { Notice } from "./notice";

export class App {
  #qList = new QList();
  #notice = new Notice(45);
  constructor() {
    this.error = false;
    this.#setup();
  }

  show_error() {
    document.getElementById("content-main").innerHTML =
      '<div class="error">Сайт не работает. Звоните фиксикам или попробуйте обновить страницу :)</div>';
  }

  async #setup() {
    document.getElementById("logout").onclick = function () {
      console.log('logout init');
      VK.Auth.getLoginStatus(function(response){
        if (response) {
          VK.Auth.logout(function(data) {
            console.log(data);
            localStorage.removeItem('vk_auth')
            window.location.reload();
          });
        }
      })
    }
    document.getElementById('noticeList').addEventListener('click', this.openNotice.bind(this));
    
    const { id, name } = JSON.parse(localStorage.getItem("vk_auth"));
    // const response = await serverRequest.addStudent(id, name);
    const response = true
    if (response === -1) {
      this.error = true;
    } else {
      //await this.#qList.parseListOfQueues(id);
    }
    this.render();
  }

  openNotice() {
    this.#notice.open()
    console.log('notifications list open.')
  }

  render() {
    ReloadName();
    if (this.error) {
      this.show_error();
    } else {
      //const data = JSON.parse(localStorage.getItem("vk_auth")).name
      //this.#qList.render();
      console.log("render...");
    }
  }
}
