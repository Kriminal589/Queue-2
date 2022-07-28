import { QueueBlock } from "./queue";
import { serverRequest } from "./serverReq";

export class QList {
  #list = [];
  constructor() {
    this.selected = null;
    this.min = true;

    this.setup();
  }
  async parseListOfQueues(id) {
    const values = await serverRequest.getQueuesById(id);
    this.#list = [];
    if (values != -1) {
      await Promise.all(
        values.map(async (item) => {
          const name = (await serverRequest.getQueuePropertyById(item.idQueue))
            .subjectName;
          const { idQueue, positionStudent } = item;

          this.#list.push(new QueueBlock({ idQueue, name, positionStudent }));
        })
      );
    }
  }
  clear() {
    this.#list = [];
    this.selected = null;
    this.min = true;
    this.allMin();
  }
  setup() {
    this.ClickHandler = this.ClickHandler.bind(this);
    this.backButtonClick = this.backButtonClick.bind(this);
  }
  async toHtml() {
    var html = this.min
    ? this.#list.map((item) => item.toHtml()).join("")
    : this.selected.toListHtml(
        await serverRequest.getListOfStudentInQueueById(this.selected.ID)
    );
    html += `
    <div class="QmakerContainer border-2px center-items">
      <div class="Qmaker" id="Qmaker">
          <div class="btn about">Создать очередь</div>
      </div>
    </div>
    `
    return html
  }
  async render() {
    document.getElementById('content-main').insertAdjacentHTML('beforeend', await this.toHtml())
  }
  addEventListeners() {
    if (this.#list.length > 0) {
      if (this.min) {
        this.#list.map((item) => {
          document
            .getElementById(item.values.idQueue)
            .addEventListener("click", this.ClickHandler);
        });
      } else {
        document
          .getElementById("btn__")
          .addEventListener("click", this.backButtonClick);
      }
    }
  }

  deleteEventListeners() {
    if (!this.min) {
      this.#list.map((item) => {
        document
          .getElementById(item.values.idQueue)
          .removeEventListener("click", this.ClickHandler);
      });
      document.getElementById('Qmaker').addEventListener("click", this.ClickHandler);
    } else {
      document
        .getElementById("btn__")
        .removeEventListener("click", this.backButtonClick);
    }
  }

  ClickHandler(event) {
    console.log("click on q with id >>>", event.target.id);
    this.selected = this.#list.find((item) => `${item.ID}` === event.target.id);
    if (this.selected) {
      this.selected.min = false;
      this.min = false;
      this.deleteEventListeners();
      this.render()
    }
  }

  backButtonClick() {
    console.log("click back button");
    this.allMin();
    this.min = true;
    this.selected = null;
    this.deleteEventListeners();
    this.render()
  }

  allMin() {
    this.#list.forEach((item) => (item.min = true));
  }
}
