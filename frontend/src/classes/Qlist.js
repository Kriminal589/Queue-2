import { QueueBlock } from "./queue";
import { serverRequest } from "./serverReq";
import { $Qmaker } from "./Qmaker";
import { $notice } from "../classes/notice";
import { createQueueText } from "../util/util";
import { copyToClipboard } from "../util/util";
import { getId } from "../util/util";

export class QList {
    #list = [];
    constructor(canAddQueue = false) {
        this.selected = null;
        this.min = true;
        this.canAddQueue = canAddQueue;
        this.eventListeners = false
        this.previewSelected = -1
        this.setup();
    }

    async parseListOfQueues() {
        const values = await serverRequest.getQueuesById(getId());
        this.#list = [];
        if (values != -1) {
            await Promise.all(
                values.map(async (item) => {
                    // const name = (
                    //     await serverRequest.getQueuePropertyById(item.idQueue)
                    // ).subjectName;
                    const name = 'test'
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

    setup() {}

    async toHtml() {
        var html = this.min
            ? this.#list.map((item) => item.toHtml()).join("")
            : this.selected.toListHtml(
                serverRequest.getListOfStudentInQueueById(
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
        this.addQuicklook()
        if (!this.eventListeners) this.addEventListeners();
    }
    /**
     * 
     * @param {MouseEvent} e 
     */
    quicklook(e) {
        e.preventDefault()
        if (e.target.dataset.action === 'open' && (e.ctrlKey || e.metaKey) && this.previewSelected === -1) {
            this.previewSelected = e.target.id
            this.$__preview__ = document.createElement('div')
            this.$__preview__.classList.add('quicklook','center-items', 'flex-column')
            this.$__preview__.innerHTML = `<div class="quicklook__title">QuickLook</div><span>${e.target.dataset.name}:</span>`
            this.$__preview__.innerHTML += [1,2,3,4,5,6,7,8,9,10,11].map((e, index) => `
                <div class="quicklook__item ${index+1===3 ? "u" : ''}">${index+1} Андрей Базунов</div>
            `).join('\n')
            e.currentTarget.appendChild(this.$__preview__)
        }
    }
    /**
     * 
     * @param {MouseEvent} e 
     */
    closeQuicklook(e) {
        e.preventDefault()
        if (this.previewSelected === e.target.id) {
            this.previewSelected = -1
            e.currentTarget.removeChild(this.$__preview__)
        }
    }

    addQuicklook() {
        document.querySelectorAll('.qItem').forEach(elem => {
            elem.addEventListener('mouseover', this.quicklook.bind(this))
            elem.addEventListener('mouseleave', this.closeQuicklook.bind(this))
        })
    }

    addEventListeners() {
        if (this.#list.length > 0) {
            this.eventListeners = true;
            document
                .getElementById("content-main")
                .addEventListener("click", (e) => {
                    e.preventDefault()
                    const action = e.target.dataset.action;

                    if (action) {
                        switch (action) {
                            case "open": {
                                console.log('open');
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
                                    .getListOfStudentInQueueById(
                                        +e.target.dataset.id,
                                    )
                                    .then((item) => {
                                        copyToClipboard(createQueueText(item.responseAboutStudentList))
                                        $notice('Очередь скопирована в буфер обмена')
                                    });
                                break;
                            }
                            case "create": {
                                $Qmaker(async (options) => {
                                    //! await serverRequest.addQueue(options)
                                    await this.render();
                                });
                                break;
                            }
                            case "delete": {
                                break;
                            }
                        }
                    }
                }, true);
            this.addQuicklook()
        }
    }

    deleteEventListeners() {}

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
