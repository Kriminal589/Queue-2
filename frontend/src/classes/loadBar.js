export class $LoadBar {
    static load() {
        const $load = document.createElement('div')
        $load.classList.add('load')
        $load.classList.add('center-items')
        $load.innerHTML = '<div class="square border-2px"></div>'
        document.body.appendChild($load)
        this.$Bar = $load
    }
    static destroy() {
        document.body.removeChild(this.$Bar)
    }
}