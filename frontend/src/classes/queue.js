export class QueueBlock {
  constructor(values) {
    this.values = values;
    this.min = true;
  }

  get ID() {
    return this.values.idQueue;
  }

  toHtml() {
    return template(this.values);
  }
  toListHtml(list) {
    return templateList(
      this.values,
      list,
      JSON.parse(localStorage.getItem("vk_auth")).uid
    );
  }
}

const template = (content) => {
  return `
    <div class="qItem border-2px" id="${content.idQueue}" data-action="open" data-id="${content.idQueue}" data-name="${content.name}">
      <div class="qName">${content.name}</div>
      <div class="qPos">Ваша позиция: ${content.positionStudent}</div>
      <div class="btn apply" data-action="passed" data-app="0">
        <span class="btn-text">Сдал задание</span>
      </div>
    </div>
    `;
};

function div(content, class_ = "", id = "") {
  return `<div class="${class_}" id="${id}">${content}</div>`;
}

const templateList = (content, olist, idStudent) => {
  let HTML = div(
    `<span>${content.name}</span>
    <div class="btn_container flex-row">
        <div class="p_btn copy" data-action="copy" data-target="${content.idQueue}"></div>
        <div class="p_btn exit" data-action="exit"></div>
    </div>
    <div class="p_btn back" data-action="back"></div>`,
    "subject-name center-items"
  );
  const list = require('../test/queueList.json');
  HTML += ul(
    list.responseAboutStudentList
      .map((item, index) =>
        `${item.idStudent}` === idStudent
          ? template_u(index)
          : template_list(
              item.nameOfStudent.replace("_", " "),
              index,
              `vk.com/id${item.id}`
            )
      )
      .join(""),
    "custom-scrollbar"
  );
  return div(HTML, "qList", "queueBody");
};

const template_list = (content, index, vk_link) => {
  return li(
    `
      <div class="position center-items">${index+1}</div>
      <span class="name center-items">${content}</span>
      <div class="btn_container flex-row">
          <a class="btn vk" href=${vk_link}>VK</a>
          <div class="btn swap" data-action="swap" data-target="id">SWAP</div>
      </div>
    `,
    'item center-items'
  )
};

const ul = (content, class_, id) => `<ul class=${class_} id="${id}">${content}</ul>`
const li = (content, class_, id) => `<li class=${class_} id="${id}">${content}</li>`

const template_u = (index) => {
  return li(
    `<div class="position center-items">${index+1}</div><span class="center-items">Вы</span>`,
    'item u center-items'
  )
};
