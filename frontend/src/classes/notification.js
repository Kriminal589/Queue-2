const $noticeModal = (listParam) => {
  const list = listParam
  function open() {
    const $f = document.createElement("div");
    $f.classList.add("modal-notice");
    $f.innerHTML = pattern(list);
    $f.dataset.action = "close"
    document.body.appendChild($f);
    return $f;
  }

  function deleteFromList(id) {
    const itemToDelete = list.findIndex(item => item.IdNotice === id);
    list.splice(itemToDelete, 1)
  }

  function close() {
    document.body.removeChild(__modal__);
  }

  function request(link, id) {
    console.log(link);
    deleteNotice(id)
  }

  function deleteNotice(id) {
    deleteFromList(id)
    const $not = document.getElementById(id)
    document.getElementById('container_notice').removeChild($not)
  }

  function reload(link, id) {
    console.log(link);
    deleteNotice(id)
  }

  const option = { close, request, reload };

  const __modal__ = open();
  __modal__.addEventListener("click", function (e) {
    let action = e.target.dataset;
    if (action.action) {
      option[action.action](action.link || null, action.id || null);
    }
  });
};

export const $notice = (list) => {
    function create() {
        const $f = document.createElement("div");
        $f.classList.add("notice-btn");
        $f.innerHTML = '<span>Уведомления</span>'
        document.body.appendChild($f);
        return $f;
    }

    const __btn__ = create();
    __btn__.addEventListener("click", function(e) {
        $noticeModal(list)
    })
}

const pattern = (list) => `
<div class="notice-container">
    <div class="text center-items">
        Ваши уведомления:
        <span class="icon-bar"><i class="fi fi-rs-caret-left" data-action="close"></i></span>
    </div>
    <div class="container" id="container_notice">
        ${
          list.length > 0
            ? list.map((item) => {
                if (item.type === "swap")
                  return `
                <div class="notice swap center-items" id=${item.IdNotice}>
                    <span>${item.sender.name} предлагает вам поменяться с ним местами в очереди ${item.Qname}. Его место : ${item.sender.position}, ваше место : ${item.recipient.position}</span>
                    <div class="buttons">
                        <div class="btn ok" id="ok_swap" data-link="swap/${item.QId}/${item.sender.id}/${item.recipient.id}" data-action="request" data-id=${item.IdNotice}>Принять</div>
                        <div class="btn no" id="no_swap" data-link="deleteNotice/${item.IdNotice}" data-action="reload" data-id=${item.IdNotice}>Отклонить</div>
                    </div>
                </div>
            `;
                else
                  return `
                <div class="notice queue" id=${item.IdNotice}>
                    <span>Присоединиться к очереди ${item.Qname}</span>
                    <div class="notice-buttons">
                        <div class="add center-items" id="add_to_q" data-link="queue/add/${item.QId}/${item.recipient.id}" data-action="request" data-id=${item.IdNotice}></div>
                        <div class="close center-items" id="close_q_invite" data-link="deleteNotice/${item.IdNotice}" data-action="reload" data-id=${item.IdNotice}></div>
                    </div>
                </div>
            `;
              }).join('')
            : `
            <div class="notice none">Тут пусто.</div>
        `
        }
    </div>
</div>
`;