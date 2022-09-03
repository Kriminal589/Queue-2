export class $LoadBar {
    load(id) {
        const $load = document.createElement('div')
        $load.classList.add('load')
        $load.id = id.hashCode()
        $load.classList.add('center-items')
        $load.innerHTML = '<div class="square border-2px"></div>'
        document.body.appendChild($load)
        this.id = id
    }
    destroy() {
        const $load = document.getElementById(this.id.hashCode())
        if ($load) {
            document.body.removeChild($load)
        }
    }
}