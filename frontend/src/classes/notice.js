import { getListNotice } from "./serverReq";
import { getId } from "../util/util";

export class Notice {
    constructor(id) {
        this.id = id;
        this.setup();
    }
    setup() {
        //this.noticeList = await getListNotice(this.id);
        this.noticeList = [
            {
                type: "invite",
                id: 0,
                Qname: "История",
                Qhash: "hAY90La",
            },
            {
                type: "swap",
                id: 1,
                Q: {
                    hash: "lAWDuo31",
                    name: "Английский",
                },
                sender: {
                    id: 25,
                    name: "Андрей Новиков",
                    position: 5,
                },
                recipient: {
                    id: 89,
                    position: 9,
                },
            },
            {
                type: "update",
                update: {
                    version: "0.4.13",
                    codeName: "Круто все",
                    vkLink: "vk.com",
                },
            },
        ];
    }
    renderNotice() {
        document.getElementById("modal-notice").innerHTML = `
		<div class="notice Ntitle padding-content center-items border-2px">Ваши уведомления<div class="btn back" data-action="close"></div></div>
			${this.listToHtml()}
		`;
    }
    open() {
        this.$notice = document.createElement("div");
        this.$notice.classList.add(
            "modal",
            "visible",
            "center-items",
            "flex-column",
        );
        this.$notice.id = "modal-notice";
        this.$notice.dataset.action = "close";
        document.body.appendChild(this.$notice);
        this.renderNotice();
        this.$notice.addEventListener("click", this.clickHandler.bind(this));
    }
    close() {
        this.$notice.removeEventListener("click", this.clickHandler);
        document.body.removeChild(this.$notice);
    }
    clickHandler(e) {
        const action = e.target.dataset.action;
        const content = e.target.dataset.content;
        if (action) {
            console.log(
                `Clicked on notice {id:${e.target.id}, action:${action}, content:${content}}`,
            );
            switch (action) {
                case "close": {
                    this.close();
                    break;
                }
                case "apply": {
                    apply("Введите номер задания", input()).then((data) => {
                        if (data) {
                            this.noticeList = this.noticeList.filter(
                                (item) => item.id !== +content,
                            );
                            // !serverReq
                            this.renderNotice();
                        }
                    });
                    break;
                }
                case "swap": {
                    this.noticeList = this.noticeList.filter(
                        (item) => item.id !== +content,
                    );
                    this.renderNotice();
                    console.log(content);
                    break;
                }
                case "delete": {
                    apply("Вы точно хотите удалить это уведомление?").then(
                        (data) => {
                            if (data) {
                                this.noticeList = this.noticeList.filter(
                                    (item) => item.id !== +content,
                                );
                                // !serverReq
                                this.renderNotice();
                            }
                        },
                    );
                    console.log(`notice ${content} is deleted.`);
                    // !serverReq
                    break;
                }
                case "readMore": {
                    console.log(content);
                    break;
                }
            }
        }
    }
    listToHtml() {
        return this.noticeList.length > 0
            ? this.noticeList
                  .map((item) => {
                      switch (item.type) {
                          case "invite": {
                              return `
							<div class="notice invite padding-content center-items border-2px flex-column" id=${item.id}>
								Приглашение в очередь ${item.Qname}
								<div class="btn-container flex-row">
										<div class="btn apply" data-action="apply" data-content=${item.id} data-src=${item.Qhash}>Принять</div>
										<div class="btn close" data-action="delete" data-content=${item.id}>Удалить</div>
								</div>
							</div>
						`;
                          }
                          case "swap": {
                              return `
							<div class="notice swap padding-content center-items border-2px flex-column" id=${
                                item.id
                            }>
								Студент ${item.sender.name} предлагает вам поменяться с ним местами
								<div class="swap-state">
										${item.Q.name} :
										<span class=${
                                            item.sender.position >
                                            item.recipient.position
                                                ? "red"
                                                : "green"
                                        }>${item.recipient.position}</span> 
										-> 
										<span class=${
                                            item.sender.position >
                                            item.recipient.position
                                                ? "green"
                                                : "red"
                                        }>${item.sender.position}</span>
								</div>
								<div class="btn-container flex-row">
										<div class="btn apply" data-action="swap" data-content=${item.id} data-src="${
                                  item.sender.id
                              }|${item.recipient.id}|${
                                  item.Q.hash
                              }">Принять</div>
										<div class="btn close" data-action="delete" data-content=${
                                            item.id
                                        }>Удалить</div>
								</div>
							</div>
						`;
                          }
                          case "update": {
                              return `
							<div class="notice update padding-content center-items border-2px flex-row">
								Обновление ${item.update.version} ${item.update.codeName}
								<div class="btn readMore" data-action="readMore" data-content=${item.update.vkLink}>
									<a href=${item.update.vkLink}>Узнать об изменениях</a>
								</div>
							</div>
						`;
                          }
                      }
                  })
                  .join("")
            : `<div class="notice padding-content center-items border-2px">Тут пусто :)</div>`;
    }
}

export const InviteApply = (hash) => {
    apply("Введите номер задания", input()).then((data) => {
        if (data) {
            // ! serverReq
            const id = getId();
            window.location.hash = "";
            window.location.reload();
            console.log(
                `student ${id} with app ${data} added to Q hash:${hash}`,
            );
        }
    });
};

const input = () =>
    '<input type="number" id="appNumber" class="padding-content border-2px" required>';

const apply = (text, content) => {
    return new Promise((resolve, reject) => {
        const $apply = document.createElement("div");
        $apply.classList.add("modal", "visible", "center-items", "flex-column");
        $apply.id = "modal-apply";
        $apply.dataset.action = "close";
        $apply.innerHTML = `
			<div class="notice apply padding-content center-items border-2px flex-column">
			${text}
			${content || ""}
			<div class="btn-container flex-row">
					<div class="btn apply" data-action="ok">Подтвердить</div>
					<div class="btn close" data-action="cancel">Отмена</div>
			</div>
			</div>
		`;
        document.body.appendChild($apply);

        $apply.addEventListener("click", (e) => {
            const action = e.target.dataset.action;
            if (action) {
                console.log(`clicked on btn ${action}`);
                if (action === "ok") {
                    if (content) {
                        const value =
                            document.getElementById("appNumber").value;
                        if (value) {
                            resolve(value);
                        }
                    } else {
                        resolve(true);
                    }
                }
                resolve(false);
                document.body.removeChild($apply);
            }
        });
    });
};

export const $notice = (text) => {
    const cooldown = 5000;
    const $nt = document.createElement("div");
    $nt.classList.add("notification", "center-items");
    $nt.innerHTML = `
        <div class="notification-content padding-content">
            ${text}
            <div class="countdown"></div>
        </div>
    `;
    document.body.appendChild($nt);
    new Promise((resolve, reject) => {
        setTimeout(resolve, cooldown);
    }).then(() => {
        document.body.removeChild($nt);
    });
};
