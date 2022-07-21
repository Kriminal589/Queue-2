import { Auth } from "./autorization";
import { QList } from "./Qlist";
import { serverRequest } from "./serverReq";
import { LoadBarToHtml } from "./loadBar";

export class App {
  #qList = new QList();
  constructor(selector) {
    this.$el = document.querySelector(selector);
    this.overlayOn = true;

    VK.init({ apiId: 8210632 }, function () {}, this.error);
    this.#setup();
  }

  error() {
    document.getElementById("fl_co").innerHTML =
      '<div class="error">Сайт не работает. Звоните фиксикам или попробуйте обновить страницу :)</div>';
  }

  async #setup() {
    this.#modalAdd();
    try {
      var data = JSON.parse(localStorage.getItem("auth-data"));
      if (data && getTimeUnix() < data.expire && !data.error) {
        await serverRequest.addStudent(
          data.user.id,
          `${data.user.first_name} ${data.user.last_name}`,
          data.user.domain
        );
        this.#modalRemove();
      } else {
        Auth.init().then((res) => {
          this.#modalRemove();
        });
      }
      this.#qList.addRenderHandler(this.render.bind(this));
      await this.render();
      this.addSessionId()
    } catch (error) {
      console.error(error);
      this.error();
    }
  }

  addSessionId() {
    document.getElementById("footer").innerHTML += `<div class="session">id session: ${JSON.parse(localStorage.getItem("auth-data")).user.id}</div>`
  }

  #modalAdd(vk = false) {
    this.overlayOn = true;
    if (vk) {
      this.$el.innerHTML += `<div class="modal vk" id="modal__"><div class="auth">Авторизация через ВКонтакте</div></div>`;
    } else {
      this.$el.innerHTML += `<div class="modal" id="modal__">${LoadBarToHtml()}</div>`;
    }
  }

  #modalRemove() {
    this.overlayOn = false;
    const h = document.getElementById("modal__");
    h.remove();
  }

  async logoutHandler(event) {
    event.preventDefault();
    this.#modalAdd(true);
    await Auth.logout();
    this.#qList.clear();
    document.getElementById("fl_co").innerHTML = ``;
    document.getElementById("name").innerHTML = ``;
    this.addLoginHandler();
  }

  addLogoutHandler() {
    document
      .getElementById("logout_btn")
      .addEventListener("click", this.logoutHandler.bind(this));
  }

  addLoginHandler() {
    document
      .querySelector(".auth")
      .addEventListener("click", this.loginHandler.bind(this));
  }

  deleteLoginHandler() {
    document
      .querySelector(".auth")
      .removeEventListener("click", this.loginHandler.bind(this));
  }

  deleteLogoutHandler() {
    document
      .getElementById("logout_btn")
      .removeEventListener("click", this.logoutHandler.bind(this));
  }

  async loginHandler() {
    Auth.init().then((res) => {
      this.#modalRemove();
      this.render();
    });
    document
      .querySelector(".auth")
      .removeEventListener("click", this.loginHandler.bind(this));
  }

  async render() {
    const data = JSON.parse(localStorage.getItem("auth-data"));
    console.log("render...");

    if (data.error) {
      this.error();
      this.#modalRemove();
    } else {
      if (this.overlayOn) {
        // login
        this.addLoginHandler();
        this.deleteLogoutHandler();
      } else {
        // logout
        this.addLogoutHandler();
        // qList
        await this.#qList.parseListOfQueues(data.user.id);
        document.getElementById("fl_co").innerHTML = await this.#qList.toHtml();
        this.#qList.addEventListeners();
        // profile
        const $name = document.getElementById("name");
        const name = `${data.user["first_name"]} ${data.user["last_name"]}`;
        if ($name.innerHTML !== name) $name.innerHTML = name;
      }
    }
  }
}

function getTimeUnix() {
  return Math.floor(Date.now() / 1000);
}
