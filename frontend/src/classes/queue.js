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
      JSON.parse(localStorage.getItem("auth-data")).user.id
    );
  }
}

const template = (content) => {
  return `
    <div class="queue-item">
    <div class="btn_mask" id="${content.idQueue}"></div>
    <div class="mask"></div>
    <div class="info" id="${content.idQueue}">
        <span class="name_subject">${content.name}</span>
        <span class="position">Ваша позиция: ${content.positionStudent}</span>
    </div>
    </div>
    `;
};

function div(content, class_ = "", id = "") {
  return `<div class="${class_}" id="${id}">${content}</div>`;
}

const templateList = (content, list, idStudent) => {
  let HTML = div(
    `<div class="back-btn" id="btn__"><div class="btn" id="btn__"></div></div><span class="name">${content.name}</span><div class="export_pdf_button" id="export"><span>Экспорт в pdf</span></div>`,
    "name_of_subject"
  );
  HTML += div(
    list.responseAboutStudentList
      .map((item, index) =>
        `${item.idStudent}` === idStudent
          ? template_u(index)
          : template_list(
              item.nameOfStudent.replace("_", " "),
              index,
              `vk.com/${item.domain}`
            )
      )
      .join(""),
    "queue-container"
  );
  return div(HTML, "queue-list", "");
};

const template_list = (content, index, vk_link) => {
  return div(
    `<div class="position">${
      index + 1
    }</div><div class="fullname_container"><span class="fullname">${content}</span></div><div class="vk-link"><span>${vk_link}</span></div><div class="swap-button"><span>Поменяться</span></div>`,
    "user",
    ""
  );
};

const template_u = (index) => {
  return div(
    `<div class="position">${
      index + 1
    }</div><div class="fullname"><span class="fullname-span">Вы</span></div>`,
    "u"
  );
};
