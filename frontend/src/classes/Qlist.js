import { QueueBlock } from "./queue";
import { serverRequest } from "./serverReq";
import { $Qmaker } from "./Qmaker";
import { $notice } from "../classes/notice"
import { createQueueText } from "../util/util"
import { getId } from "../util/util"

export class QList {
    #list = [];
    constructor(canAddQueue = false) {
        this.selected = null;
        this.min = true;
        this.canAddQueue = canAddQueue;

        this.setup();
    }

    async parseListOfQueues() {
        const values = await serverRequest.getQueuesById(getId());
        this.#list = [];
        if (values != -1) {
            await Promise.all(
                values.map(async (item) => {
                    const name = (
                        await serverRequest.getQueuePropertyById(item.idQueue)
                    ).subjectName;
                    const { idQueue, positionStudent } = item;

                    this.#list.push(
                        new QueueBlock({ idQueue, name, positionStudent }),
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

    setup() {

    }

    async toHtml() {
        var html = this.min
            ? this.#list.map((item) => item.toHtml()).join("")
            : this.selected.toListHtml(
                  await serverRequest.getListOfStudentInQueueById(
                      this.selected.ID,
                  ),
              );
        if (this.min && this.canAddQueue) {
            html += `
                <div class="QmakerContainer border-2px center-items">
                <div class="Qmaker" id="Qmaker" data-action="create">
                    <div class="btn about" id="QmakerAdd">Создать очередь</div>
                </div>
                </div>
            `;
        }
        return html;
    }

    async render() {
        document.getElementById("content-main").innerHTML = await this.toHtml();
        this.addEventListeners();
    }

    addEventListeners() {
        if (this.#list.length > 0) {
            document.getElementById('content-main').addEventListener('click', e => {
                const action = e.target.dataset.action

                if (action) {
                    switch (action) {
                        case "open" : {
                            this.selected = this.#list.find((item) => item.ID === +e.target.dataset.id);
                            this.selected.min = false;
                            this.min = false;
                            this.render();
                            break;
                        }
                        case "back" : {
                            this.allMin();
                            this.selected = null;
                            this.render();
                            break;
                        }
                        case "copy" : {
                            serverRequest.getListOfStudentInQueueById(
                                +e.target.dataset.id
                            ).then(item => {
                                navigator.clipboard.writeText(createQueueText(item))
                                .then(() => {
                                    $notice('Очередь скопирована в буфер обмена')
                                })
                                .catch(() => {
                                    $notice('Произошла ошибка при копировании в буфер обмена')
                                })
                            })
                            break;
                        }
                        case "create" : {
                            $Qmaker(async (options) => {
                                //! await serverRequest.addQueue(options)
                                await this.render()
                            })
                            break;
                        }
                    }
                }
            })
        }
    }

    deleteEventListeners() {
        
    }

    backButtonClick() {
        console.log("click back button");
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
