import { QueueBlock } from "./queue";
import { serverRequest } from "./serverReq";
import { $Qmaker } from "./Qmaker";
import { $notice, AcceptDelete } from "../classes/notice";
import { createQinvite, createQueueText, createTeacherInvite, getTimeUnix, InviteLink } from "../util/util";
import { copyToClipboard } from "../util/util";
import { getId } from "../util/util";
import { apply } from "../plugins/ApplyNotice";

export class QList {
  #list = [];
  constructor() {
    this.selected = null;
    this.min = true;
    this.canAddQueue = false;
    this.eventListeners = false;
    this.previewSelected = -1;
    this.setup();
  }

  async parseListOfQueues() {
    const values = await serverRequest.getQueuesById(getId());
    this.#list = [];
    if (values != -1) {
      await Promise.all(
        values.map(async (item) => {
          const options = (await serverRequest.getQueuePropertyById(item.idQueue));
          const { idQueue, positionStudent } = item;
					const { subjectName, type, hexCode, idCreator } = options

          this.#list.push(
            new QueueBlock(
              { idQueue, subjectName, positionStudent, hexCode, type },
              idCreator === +getId()
            ),
          );
        }),
      );
    }
  }

  clear() {
    this.#list = [];
    this.selected = null;
    this.min = true;
    this.allMin();
  }

  setup() {}

  async toHtml() {
    var html = this.min
      ? this.#list.map((item) => item.toHtml()).join("")
      : this.selected.toListHtml(
          await serverRequest.getListOfStudentInQueueById(this.selected.ID),
        );
    if (this.min && this.canAddQueue) {
      html += `
                <div class="QmakerContainer center-items" data-action="create">
                    <div class="Qmaker center-items" id="Qmaker" data-action="create">
                        Создать очередь
                    </div>
                </div>
            `;
    }
		if (this.#list.length === 0 && this.min && !this.canAddQueue) {
			html += `<span>Ваш аккаунт не привязан ни к одной очереди.</span>`;
		}
    return html;
  }

  async render() {
    document.getElementById("content-main").innerHTML = await this.toHtml();
    if (this.min)
      if (!this.eventListeners)
        //this.addQuicklook();
        this.addEventListeners();
  }
  /**
   *
   * @param {MouseEvent} e
   */
  quicklook(e) {
    e.preventDefault();
    if (
      e.target.dataset.action === "open" &&
      (e.ctrlKey || e.metaKey) &&
      this.previewSelected === -1
    ) {
      serverRequest.getListOfStudentInQueueById(e.target.id).then((data) => {
        this.previewSelected = e.target.id;
        this.$__preview__ = document.createElement("div");
        this.$__preview__.classList.add(
          "quicklook",
          "center-items",
          "flex-column",
        );
        this.$__preview__.innerHTML = `<div class="quicklook__title">QuickLook</div><span>${e.target.dataset.name}:</span>`;
        this.$__preview__.innerHTML += data.responseAboutStudentList
          .map(
            (item, index) =>
              `<div class="quicklook__item ${
                item.idStudent === getId() ? "u" : ""
              }">${index + 1} ${item.nameOfStudent}</div>`,
          )
          .join("");
        e.target.appendChild(this.$__preview__);
      });
    }
  }
  /**
   *
   * @param {MouseEvent} e
   */
  closeQuicklook(e) {
    e.preventDefault();
    if (this.previewSelected === e.target.id) {
      e.currentTarget.removeChild(this.$__preview__);
      this.previewSelected = -1;
    }
  }

  addQuicklook() {
    document.querySelectorAll(".qItem").forEach((elem) => {
      elem.addEventListener("mouseover", this.quicklook.bind(this));
      elem.addEventListener("mouseleave", this.closeQuicklook.bind(this));
    });
  }

  addEventListeners() {
    if (this.#list.length > 0 || this.canAddQueue) {
      this.eventListeners = true;
      document.getElementById("content-main").addEventListener(
        "click",
        (e) => {
          e.preventDefault();
          const action = e.target.dataset.action;
          if (action) {
            switch (action) {
              case "open": {
                console.log("open");
                this.selected = this.#list.find(
                  (item) => item.ID === +e.target.dataset.id,
                );
                this.selected.min = false;
                this.min = false;
                this.render();
                break;
              }
              case "back": {
                this.allMin();
                this.selected = null;
                this.render();
                break;
              }
              case "copy": {
                serverRequest
                  .getListOfStudentInQueueById(+e.target.dataset.target)
                  .then((item) => {
                    copyToClipboard(
                      createQueueText(item.responseAboutStudentList),
                    );
                    $notice("Очередь скопирована в буфер обмена");
                  });
                break;
              }
              case "create": {
                $Qmaker(async (options) => {
                  const {
                    name,
                    type,
                    dependOnApps,
                    CountApps,
                    DependOnDate,
                    DateToPass,
                  } = options;

                  const hash = (
                    await serverRequest.createQ(
                      name,
                      type,
                      dependOnApps,
                      CountApps,
                      DependOnDate,
                      DateToPass,
                      getId(),
                    )
                  ).response;

                  copyToClipboard(createQinvite(hash));
                  await this.parseListOfQueues()
									this.render()
                });
                break;
              }
              case "delete": {
                AcceptDelete(e.target.dataset.name).then((data) => {
                  console.log("delete");
                  if (data)
                    serverRequest
                      .deleteQueueById(e.target.dataset.target)
                      .then((data) => {
												this.deleteQueueBlock(e.target.dataset.target)
												$notice(
													+data.code === 200
														? "Очередь успешно удалена"
														: "Произошла ошибка при удалении очереди",
												);
                      })
                      .finally(() => {
												console.log('success delete Queue');
                        this.allMin();
                        this.render();
                      });
                });
                break;
              }
              case "exit": {
								apply('Вы точно хотите выйти из очереди?').then(data => {
									if (data) {
										serverRequest
										.leaveFromQueue(e.target.dataset.target, getId())
										.then(() => {
											this.deleteQueueBlock(e.target.dataset.target);
											window.location.reload();
										})
									}
								})
								break;
              }
							case "copyLink": {
								InviteLink(e.target.dataset.target)
								break;
							}
							case 'teacher': {
								copyToClipboard(createTeacherInvite(e.target.dataset.target));
								$notice('Ссылка для просмотра скопирована')
								break;
							}
							case 'passed' : {
								apply('Перезаписать вас в очередь?', {
									type : 'text',
									id : 0,
									html : "<span>Вы всегда сможете присоедениться к очереди через ссылку.<span>"
								}).then(data => {
									if (data) {
										serverRequest
										.leaveFromQueue(e.target.dataset.target, getId())
										.then(() => {
											serverRequest.appendQ(getId(), e.target.dataset.hash, e.target.dataset.app++)
											.then(() => {
												window.location.reload();
											})
										})
									}
									else {
										serverRequest
										.leaveFromQueue(e.target.dataset.target, getId())
										.then(() => {
											this.deleteQueueBlock(e.target.dataset.target);
											window.location.reload();
										})
									}
								})
								break;
							}
            }
          }
        },
        true,
      );
    }
  }

  deleteEventListeners() {}

	deleteQueueBlock(id) {
		this.#list = this.#list.filter(item => item.ID !== +id)
	}

  backButtonClick() {
    this.allMin();
    this.min = true;
    this.selected = null;
    this.deleteEventListeners();
    this.render();
  }

  allMin() {
    this.min = true;
    this.#list.forEach((item) => (item.min = true));
  }
}
