String.prototype.trimSlash = function(arg) {
    if(this.slice(-1) === '/') {
        return this.slice(0, this.length - 1)
    }
    return this
}

export const $Qmaker = function() {
    function open() {
        const $f = document.createElement('div')
        $f.classList.add('modal')
        $f.innerHTML = pattern()
        return $f
    }

    function addEventListeners() {
        const $sq = document.getElementById('sq'),
              $ca = document.getElementById('ca'),
              $date = document.getElementById('date'),
              $input = document.getElementById('count_apps'),
              $add = document.getElementById('add'),
              $cancel = document.getElementById('cancel'),
              $dateToPass = document.getElementById('dateToPass'),
              $name = document.getElementById('name_input')
        
        $input.disabled = true
        $dateToPass.disabled = true
        $ca.classList.add('off')
        $date.classList.add('off')
        $add.classList.add('off')

        $name.oninput = function() {
            if ($name.value) $add.classList.remove('off')
            else $add.classList.add('off')
        }

        $input.oninput = function() {
            if (($input.value || $dateToPass.value) && $date.classList.contains('on')) $add.classList.remove('off')
            else $add.classList.add('off')
        }

        $dateToPass.oninput = function() {
            if (($input.value || $dateToPass.value) && $ca.classList.contains('on')) $add.classList.remove('off')
            else $add.classList.add('off')
        }
        
        $sq.onclick = function() {
            $sq.innerHTML = $sq.classList.contains('on') ? 'off' : 'on'
            $sq.classList.toggle('on')
            if ($sq.classList.contains('on')) {
                $input.disabled = !$ca.classList.contains('on')
                $ca.classList.remove('off')
                $date.classList.remove('off')
                $add.classList.add('off')
            }
            else {
                $input.value = ``
                $input.disabled = !($ca.classList.contains('on') && $sq.classList.contains('on'))
                $ca.classList.add('off')
                $date.classList.add('off')
                $add.classList.remove('off')
            }
        }
        $ca.onclick = function() {
            if (!$ca.classList.contains('off')) {
                $ca.innerHTML = $ca.classList.contains('on') ? 'off' : 'on'
                $ca.classList.toggle('on')
                $input.disabled = !$ca.classList.contains('on')
                $input.value = !$ca.classList.contains('on') ? `` : $input.value

                if ($input.value || $dateToPass.value) {
                    $add.classList.remove('off')
                }
                else {
                    $add.classList.add('off')
                }
            }
        }
        $date.onclick = function() {
            if (!$date.classList.contains('off')) {
                $date.innerHTML = $date.classList.contains('on') ? 'off' : 'on'
                $date.classList.toggle('on')
                $dateToPass.disabled = !$date.classList.contains('on')
                $dateToPass.value = !$date.classList.contains('on') ? `` : $dateToPass.value

                if ($input.value || $dateToPass.value) {
                    $add.classList.remove('off')
                }
                else {
                    $add.classList.add('off')
                }
            }
        }
        $add.onclick = function() {
            if (!$add.classList.contains('off')) {
                var request = `queue/add/${$name.value.trim()}/${$sq.classList.contains('on') ? 'smart' : 'simple'}/`
                request += $ca.classList.contains('on') ? `t${$input.value ? `/${$input.value}` : ''}` : ''
                request += $date.classList.contains('on') ? `/t${$dateToPass.value ? `/${$dateToPass.value}` : ''}` : ''
                console.log(request.trimSlash())
                //close()
            }
        }
        $cancel.onclick = function() {
            close()
        }
    }

    function deleteEventListeners() {
        document.getElementById('sq').onclick = ``
        document.getElementById('ca').onclick = ``
        document.getElementById('date').onclick = ``
        document.getElementById('count_apps').onclick = ``
        document.getElementById('add').onclick = ``
        document.getElementById('cancel').onclick = ``
        document.getElementById('dateToPass').onclick = ``
    }

    function close() {
        deleteEventListeners()
        document.body.removeChild(__popup__)
    }

    var __popup__ = open()
    document.body.appendChild(__popup__)
    addEventListeners()
}

const pattern = () => `
<div class="form">
    <span class="title">Конструктор Очередей</span>
    <div class="input__">
        <input type="text" class="input" id="name_input" maxlength="30" required>
        <span class="float">Название очереди</span>
    </div>
    <div class="orange_line"></div>
    <div class="buttons">
        <div class="btn">
            <span class="text">Умная очередь</span>
            <div class="btn__sq" id="sq">off</div>
        </div>
        <div class="orange_line"></div>
        <div class="btn">
            <span class="text">Привязка к количеству задач</span>
            <div class="btn__sq" id="ca">off</div>
        </div>
        <div class="input__">
            <input type="number" class="input" id="count_apps" max="100" min="1" required>
            <span class="float">Количество задач опционально</span>
        </div>
        <div class="orange_line"></div>
        <div class="btn">
            <span class="text">Привязка к дате сдачи работы</span>
            <div class="btn__sq" id="date">off</div>
        </div>
        <div class="input__">
            <input type="number" class="input" id="dateToPass" max="100" min="1" required>
            <span class="float">Кол-во занятий для сдачи опционально</span>
        </div>
        <div class="orange_line"></div>
    </div>
    <div class="btns">
        <div class="add" id="add">Создать очередь</div>
        <div class="cancel" id="cancel">Отменить</div>
    </div>
</div>
`