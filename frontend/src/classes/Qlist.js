import { QueueBlock } from "./queue";

export class QList {
    #list = []
    constructor() {
        this.selected = null
        this.min = true

        this.setup()
    }
    addRenderHandler(renderHandler) {
        if (typeof(renderHandler) === "function")
            this.renderHandler = renderHandler
    }
    setup() {
        this.#list.push(new QueueBlock(require('../test/queue.json'), '#39126936'))
        this.#list.push(new QueueBlock(require('../test/queue2.json'), '#39126936'))
        this.ClickHandler = this.ClickHandler.bind(this)
        this.backButtonClick = this.backButtonClick.bind(this)
    }
    toHtml() {
        return this.min ? this.#list.map(item => item.toHtml()).join('') : this.selected.toHtml()
    }
    addEventListeners() {
        if (this.min) {
            this.#list.map(item => {
                document.getElementById(item.values.data.id).addEventListener('click', this.ClickHandler)
            })
        }
        else {
            document.getElementById('btn__').addEventListener('click', this.backButtonClick)
        }
    }

    deleteEventListeners() {
        if (!this.min) {
            this.#list.map(item => {
                document.getElementById(item.values.data.id).removeEventListener('click', this.ClickHandler)
            })
        }
        else {
            document.getElementById('btn__').removeEventListener('click', this.backButtonClick)
        }
    }

    ClickHandler(event) {
        console.log('click on q')
        this.selected = this.#list.find(item => item.ID === event.target.id)
        this.selected.min = false
        this.min = false
        this.deleteEventListeners()
        this.renderHandler()
    }

    backButtonClick() {
        console.log('click back button')
        this.allMin()
        this.min = true
        this.selected = null
        this.deleteEventListeners()
        this.renderHandler()
    }

    allMin() {
        this.#list.forEach(item => item.min = true)
    }
}