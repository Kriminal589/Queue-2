export class QueueBlock {
  constructor(values, canAddQueue) {
    this.values = values;
    this.min = true;
    this.canAddQueue = canAddQueue;
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
      JSON.parse(localStorage.getItem("vk_auth")).id,
      this.canAddQueue,
    );
  }
}

const template = (content) => {
  return `
    <div class="qItem" id="${content.idQueue}" data-action="open" data-id="${content.idQueue}" data-name="${content.subjectName}">
      <div class="qName">${content.subjectName}</div>
      <div class="qPos">Ваша позиция: ${content.positionStudent}</div>
      <div class="btn apply" data-action="passed" data-app="0" data-target=${content.idQueue} data-hash=${content.hexCode}  data-type=${content.type}>
        Сдал задание
      </div>
    </div>
    `;
};

function div(content, class_ = "", id = "") {
  return `<div class="${class_}" id="${id}">${content}</div>`;
}

// <div class="p_btn teacher" data-action="teacher" data-target=${content.hexCode}></div>

const templateList = (content, list, idStudent, canAddQueue) => {
  let HTML = div(
    `<span>${content.subjectName}</span>
    <div class="dropdown-menu center-items" onclick="this.classList.toggle('active')">
				<span class="flex-row">
					<div class="dot"></div>
					<div class="dot"></div>
					<div class="dot"></div>
				</span>
				<ul class="btn_list">
					${
						canAddQueue
							? `<li class="disabled" data-action="options" data-target=${content.idQueue}>
							<div class="icon settings"></div>
							Настройки очереди
							</li>`
							: ""
					}
					<li data-action="copy" data-target=${content.idQueue}>
						<div class="icon copy"></div>
						Скопировать список очереди
					</li>
					${
            canAddQueue
              ? `<li data-action="copyLink" data-target=${content.hexCode}>
						<div class="icon link"></div>
						Ссылка приглашение
						</li>`
              : ""
          }
					<li data-action="exit" data-target=${content.idQueue}>
						<div class="icon exit"></div>
						Выход
					</li>
					${
            canAddQueue
              ? `<li data-action="delete" data-target=${content.idQueue} data-name=${content.subjectName}>
						<div class="icon delete"></div>
						Удалить очередь
						</li>`
              : ""
          }
				</ul>
			</div>
    <div class="p_btn back" data-action="back"></div>`,
    "subject-name center-items",
  );
  HTML += ul(
    list.responseAboutStudentList
      .map((item, index) =>
        `${item.idStudent}` === idStudent
          ? template_u(index)
          : template_list(
              item.nameOfStudent.replace("_", " "),
              index,
              `http://vk.com/id${item.idStudent}`,
            ),
      )
      .join(""),
    "custom-scrollbar",
  );
  return div(HTML, "qList", "queueBody");
};

const template_list = (content, index, vk_link) => {
  return li(
    `
      <div class="position center-items">${index + 1}</div>
      <span class="item-name center-items">${content}</span>
    `,
    "item center-items",
  );
};

const ul = (content, class_, id) =>
  `<ul class="${class_}" id="${id}">${content}</ul>`;
const li = (content, class_, id) =>
  `<li class="${class_}" id="${id}">${content}</li>`;

const template_u = (index) => {
  return li(
    `<div class="position center-items">${
      index + 1
    }</div><span class="center-items">Вы</span>`,
    "item u center-items",
  );
};
