import { getListNotice, serverRequest } from "./serverReq";
import { apply } from "../plugins/ApplyNotice"
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
		<div class="notice Ntitle padding-content center-items">Ваши уведомления<div class="btn back" data-action="close"></div></div>
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
                    apply("Введите номер задания", {
                        id : 'apps_input',
                        type : 'input',
                        html : input()
                    }).then((data) => {
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
							<div class="notice invite padding-content center-items flex-column" id=${item.id}>
								Приглашение в очередь ${item.Qname}
								<div class="btn-container flex-row">
										<div class="btn apply" data-action="apply" data-content=${item.id} data-src=${item.Qhash}>Принять</div>
										<div class="btn close" data-action="delete" data-content=${item.id}>Отказаться</div>
								</div>
							</div>
						`;
                          }
                          case "swap": {
                              return `
							<div class="notice swap padding-content center-items flex-column" id=${
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
                                        }>Отказаться</div>
								</div>
							</div>
						`;
                          }
                          case "update": {
                              return `
							<div class="notice update padding-content center-items flex-row">
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
    apply("Введите номер задания", {
        id : 'apps_input',
        type : 'input',
        html : input()
    }).then((data) => {
        if (data) {
            const id = getId();
            serverRequest.appendQ(id, hash, data).then((response) => {
                history.pushState('', document.title, window.location.pathname)
                window.location.reload();
                if (response !== -1) {
                    console.log(
                        `student ${id} with app ${data} added to Q hash:${hash}`,
                    );
                }
                else {
                    $notice('Данная ссылка не работает!')
                }
            })
        }
    });
};

const input = () => `
    <div class="input_group" id="input_a">
        <input id="apps_input" type="number" min="1" max="99" maxlength="2" data-to="CountApps" autocomplete="off" required="">
        <label class="field_name">Ваша задача</label>
        <i class="fi fi-rs-check"></i>
        <i class="fi fi-rs-exclamation"></i>
        <div class="error_message center-items">
            Поле должно быть заполнено!
        </div>
        <div class="error_type center-items">
            Недопустимый символ или значение!
        </div>
    </div>
`

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
