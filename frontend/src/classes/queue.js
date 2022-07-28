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
    <div class="qItem border-2px" id="${content.idQueue}">
      <div class="qName">${content.name}</div>
      <div class="qPos">Ваша позиция: ${content.positionStudent}</div>
      <div class="btn apply" data-action="passed">
          <span class="btn-text" data-app="0">Сдал задание</span>
      </div>
    </div>
    `;
};

function div(content, class_ = "", id = "") {
  return `<div class="${class_}" id="${id}">${content}</div>`;
}

const templateList = (content, list, idStudent) => {
  let HTML = div(
    `<span>${content.name}</span><div class="btn back" id="btn__back"></div>`,
    "subject-name border-2px center-items"
  );
  HTML += div(
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
    "contanier custom-scrollbar"
  );
  return div(HTML, "qList", "");
};

const template_list = (content, index, vk_link) => {
  return div(
    `<div class="position border-2px center-items">${
      index + 1
    }</div>
    <div class="nameStudent border-2px center-items">${content}</div>
    <a class="vklink border-2px center-items" href="${vk_link}">vk</a>
    <div class="swap border-2px center-items" data-action="swap" data-target="id">Поменяться местами</div>`,
    "qList-item flex-row"
  );
};

const template_u = (index) => {
  return div(
    `<div class="position border-2px center-items">${
      index + 1
    }</div><div class="u border-2px center-items">Вы</div>`,
    "qList-item uitem flex-row"
  );
};
