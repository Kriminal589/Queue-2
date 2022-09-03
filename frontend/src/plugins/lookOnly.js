import { serverRequest } from "../classes/serverReq"

const ul = (content, class_, id) =>
  `<ul class="${class_}" id="${id}">${content}</ul>`;
const li = (content, class_, id) =>
  `<li class="${class_}" id="${id}">${content}</li>`;


export const $lookOnly = async hex => {
	const property = await serverRequest.getQueuePropertyByHex(hex);
	const list = await serverRequest.getListOfStudentInQueueById(property.id)

	const open = () => {
		const $html = document.createElement('div');
		$html.classList.add('openLook');
		$html.innerHTML = `<div class="qTitle">${property.subjectName}</div>`;
		$html.innerHTML += ul(list.responseAboutStudentList.map(item => li(`${item.nameOfStudent.replace('_', '')}`, 'item')).join(''), '', '');
		document.body.appendChild($html);
	}

	const __html__ = open();
}