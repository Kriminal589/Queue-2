import {Auth} from './autorization'
import { QList } from './queuesList'
import { serverRequest } from './serverReq'


export class App {
    #qList = new QList('fl_co')
    constructor(selector) {
        this.$el = document.querySelector(selector)
        this.overlayOn = true
        this.__error__ = false

        VK.init({apiId: 8210632}, function(){}, this.error)
        this.#setup()
    }

    error() {
        document.getElementById('fl_co').innerHTML = '<div class="error">Сайт не работает. Звоните фиксикам</div>'
    }

    async #setup() {
        this.#modalAdd()
        try {
            var data = JSON.parse(localStorage.getItem('auth-data'))
            if (data && getTimeUnix() < data.expire && !data.error) {
                //const st = await serverRequest.request('student/all', 1)
                //data.user.error = st
                this.#modalRemove()
            }
            else {
                Auth.init().then(res => {
                    this.#modalRemove()
                })
            }
            this.#qList.addRenderHandler(this.render.bind(this))
            this.render()
        }
        catch(error) {
            this.error()
        }
    }

    #modalAdd(vk=false) {
        this.overlayOn = true
        this.$el.innerHTML += `<div class="modal ${vk ? 'vk' : ''}" id="modal__"><div class="auth">Авторизация через ВКонтакте</div></div>`
    }

    #modalRemove() {
        this.overlayOn = false
        const h = document.getElementById('modal__')
        h.remove()
    }

    async logoutHandler(event) {
        event.preventDefault()
        this.#modalAdd(true)
        await Auth.logout()
        document.getElementById('name').innerHTML = ``
        this.addLoginHandler()
    }

    addLogoutHandler() {
        console.log('handler logout added')
        document.getElementById('logout_btn').addEventListener('click', this.logoutHandler.bind(this)) 
    }

    addLoginHandler() {
        document.querySelector('.auth').addEventListener('click', this.loginHandler.bind(this))
    }

    deleteLoginHandler() {
        document.querySelector('.auth').removeEventListener('click', this.loginHandler.bind(this))
    }

    deleteLogoutHandler() {
        document.getElementById('logout_btn').removeEventListener('click', this.logoutHandler.bind(this))
    }

    loginHandler() {
        event.preventDefault()
        Auth.init().then(res => {
            this.#modalRemove()
            this.render()
        })
        document.querySelector('.auth').removeEventListener('click', this.loginHandler.bind(this))
    }

    render() {
        const data = JSON.parse(localStorage.getItem('auth-data'))
        console.log('render...')
        
        if (data.error) {
            this.error()
            this.#modalRemove()
        }
        else {
            if (this.overlayOn) {
                // login
                this.addLoginHandler()
                this.deleteLogoutHandler()
            }
            else {
                // logout
                this.addLogoutHandler()
                // qList
                document.getElementById('fl_co').innerHTML = this.#qList.toHtml()
                this.#qList.addEventListeners()
                // profile
                const $name = document.getElementById('name')
                const name = `${data.user['first_name']} ${data.user['last_name']}`
                if ($name.innerHTML !== name)
                    $name.innerHTML = name
            }
        }
    }
}

function getTimeUnix() {
    return Math.floor(Date.now() / 1000)
}