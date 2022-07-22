$modal = function(name, content, load){
    function __create() {
        var elemModal = document.createElement('div')
        elemModal.className.add('popup')
        elemModal.id = `popup__${name}`
        elemModal.innerHTML = patternPopup(name, content, load)
        document.body.appendChild(elemModal);
        return elemModal;
    }

    function show() {
        _elemModal.classList.add('modal__show');
    }

    _elemModal = __create();
}

const patternPopup = (name, content, load) => `
    <div class="popup__body">
        ${load ? '' : `<div class="popup__content">
            <div class="popup__title">${name}</div>
            <div class="popup__contanier">${content || ''}</div>
            <div class="popup__close">X</div>
        </div>`}
    </div>
`