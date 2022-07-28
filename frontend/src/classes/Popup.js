export class popup_window {
    constructor(name) {
        console.log(documnet)
        this.body = document.querySelector('body')
        this.unlock = true
        this.name = name

        this.#setup()
    }
    addContent(content, load) {
        this.content = content
        this.#setup(load)
    }
    #setup(load) {
        console.log(this.body)
        this.body.insertAdjacentHTML('beforeend', patternPopup(this.name, this.content, load))
    }
    open(canClose=true) {
        this.unlock = true
        document.getElementById(`popup__${this.name}`).classList.add(`active`)
        if (canClose) document.querySelector('.popup__close').addEventListener('click', this.eventListenerForClose.bind(this))
    }
    close() {
        this.unlock = false
        document.getElementById(`popup__${this.name}`).classList.remove(`active`)
        const $btncls = document.querySelector('.popup__close')
        if ($btncls) $btncls.removeEventListener('click', this.eventListenerForClose.bind(this))
    }
    eventListenerForClose() {
        this.unlock = false
        document.getElementById(`popup__${this.name}`).classList.remove(`active`)
        const $btncls = document.querySelector('.popup__close')
        if ($btncls) $btncls.removeEventListener('click', this.eventListenerForClose.bind(this))
    }
}

const patternPopup = (name, content, load) => `
    <div id="popup__${name}" class="popup">
        <div class="popup__body">
            ${load ? '' : `<div class="popup__content">
                <div class="popup__title">${name}</div>
                <div class="popup__contanier">${content || ''}</div>
                <div class="popup__close">X</div>
            </div>`}
        </div>
    </div>
`

//document.getElementById(`popup__${this.name}`).remove()