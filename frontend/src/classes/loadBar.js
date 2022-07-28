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

String.prototype.hashCode = function() {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
      chr   = this.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
};