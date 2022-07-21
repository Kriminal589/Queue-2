export class QueueBlock {
    constructor(values, id) {
        this.values = values
        this.sessionId = id
        this.min = true
    }

    get ID() { return this.values.data.id }

    toHtml() {
        return this.min ? template(this.values, this.sessionId) : templateList(this.values, this.sessionId)
    }
}

const template = (content, id) => {
    return `
    <div class="queue-item">
    <div class="btn_mask" id="${content.data.id}"></div>
    <div class="mask"></div>
    <div class="info" id="${content.data.id}">
        <span class="name_subject">${content.data.name}</span>
        <span class="position">Ваша позиция: ${content.data.queueList.indexOf(id)+1}</span>
    </div>
    </div>
    `
}

function div(content, class_="", id="") {
    return `<div class="${class_}" id="${id}">${content}</div>`
}

const templateList = (content, id) => {
    let HTML = div(`<div class="back-btn" id="btn__"><div class="btn" id="btn__"></div></div><span class="name">${content['data']['name']}</span><div class="export_pdf_button" id="export"><span>Экспорт в pdf</span></div>`, 'name_of_subject')
    HTML += div(content['data']['queueList'].map((item, index) => item === id ? template_u(index) :template_list(item, index, 'vk')).join(''), "queue-container")
    return div(HTML, "queue-list", "")
}

const template_list = (content, index, vk_link) => {
    return div(`<div class="position">${index+1}</div><div class="fullname_container"><span class="fullname">${content}</span></div><div class="vk-link"><span>${vk_link}</span></div><div class="swap-button"><span>Поменяться</span></div>`, 'user', '')
}

const template_u = (index) => {
    return div(`<div class="position">${index+1}</div><div class="fullname"><span class="fullname-span">Вы</span></div>`, 'u')
}