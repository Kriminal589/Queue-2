import { $notice } from "./notice";
import { apply } from './ApplyNotice'

const capitalize = s => (s && s[0].toUpperCase() + s.slice(1)) || ""

export const $Qmaker = function (callback) {

    function open() {
        const $f = document.createElement("div");
        $f.classList.add("modal", "visible", "center-items");
        $f.dataset.action = "close";
        $f.innerHTML = pattern();
		document.body.appendChild($f);
        return $f;
    }

	var options = false

	const controlInput = e => {
		e.preventDefault();
		const number = e.target.valueAsNumber
		if (number > 100 || number <= 0 || !parseInt(e.data)) {
			e.target.value = ''
			options[e.target.dataset.to] = 1
			toggleStateById(e.target.parentNode.id, 0, 2)
		}
		else {
			toggleStateById(e.target.parentNode.id, 1)
		}
	}

    const __popup__ = open();

	function close() {
        document.body.removeChild(__popup__);
    }

	//? inputs
	const $name = document.getElementById('input_name')
	const $apps = document.getElementById('input_apps')
	const $date = document.getElementById('input_date')
	//? buttons
	const $cmnB = document.getElementById('C_btn')
	const $smrB = document.getElementById('S_btn')

	const toggleStateById = (id, flag, message) => {
		const $elem = document.getElementById(id)
		if (flag) {
			$elem.classList.remove('error', message === 1 ? 'message' : message === 2 ? 'type_err' : null);
			$elem.classList.add('success');
		}
		else {
			$elem.classList.add('error', message === 1 ? 'message' : message === 2 ? 'type_err' : null);
			$elem.classList.remove('success');
		}
	}

	const parseValues = () => {
		return {
			name : $name.value.trim(),
			type : options,
			dependOnApps : options ? $apps.value ? 1 : 0 : 0,
			CountApps : options ? $apps.value || 0 : 0,
			dependOnDate : options ? $date.value ? 1 : 0 : 0,
			DateToPass: options ? $date.value || 0 : 0
		}
	}

	const checkInputs = () => {
		if ($name.value) {
			toggleStateById('name_input', 1)
		}
		else {
			toggleStateById('name_input', 0, 1)
		}
		if (options) {
			if (!$apps.value && !$date.value) {
				toggleStateById('apps_input', 0, 1)
				toggleStateById('date_input', 0, 1)
			}
			else {
				if ($apps.value)
					toggleStateById('apps_input', 1)
				if ($date.value)
					toggleStateById('date_input', 1)
			}
		}
		return $name.value &&
			   (options ? 
			   $apps.value || $date.value :
			   true)
	}

	function toggleState() {
		$cmnB.classList.toggle('active')
		$smrB.classList.toggle('active')
		options = $smrB.classList.contains('active')
	}

	const actions = {
		switch : id => {
			const $btn = document.getElementById(id)
			if (!$btn.classList.contains('active')) {
				toggleState()
				if (id === 'C_btn') document.getElementById('smart_options').classList.remove('active')
				else document.getElementById('smart_options').classList.add('active')
			}
		},
		close : () => {
			apply('Вы точно хотите отменить создание очереди?').then(e => {
				if (e) close()
			})
		},
		create : () => {
			if (checkInputs()) {
				const options = parseValues()
				apply('Подтвердите создание очереди с параметрами', {
					type : 'div',
					html : `
						<div class="options center-items flex-column w100">
							<div class="sp_btw"><span>Название очереди</span> <i>${options.name}</i></div>
							<div class="sp_btw"><span>Тип очереди</span> <i>${!options.type ? 'обычная' : 'умная'}</i></div>
							${options.dependOnApps ? 
								`
								<div class="sp_btw"><span>Зависимость от кол-ва задач</span> <i>${options.dependOnApps ? '+' : '-'}</i></div>
								<div class="sp_btw"><span>Кол-во задач</span> <i>${options.CountApps}</i></div>
								` : ''
							}
							${options.dependOnDate ? 
								`
								<div class="sp_btw"><span>Зависимость от даты</span> <i>${options.dependOnDate ? '+' : '-'}</i></div>
								<div class="sp_btw"><span>Кол-во занятий на сдачу</span> <i>${options.DateToPass}</i></div>
								` : ''
							}
						</div>
					`,
					id : null
				}).then(e => {
					if (e) {
						//callback(parseValues())
						$notice(`Очередь ${$name.value} успешно создана`)
						close()
					}
				}
				)
			}
			else {
				//! Добавить подсказки
			}
		}
	}
    
	__popup__.addEventListener("click", e => {
		e.preventDefault()
		const action = e.target.dataset.action
		if (action) {
			actions[action](e.target.id);
		}
	})

	$name.oninput = e => toggleStateById('name_input', e.target.value)
	$apps.oninput = controlInput
	$date.oninput = controlInput
};

const pattern = () => `
<div class="form padding-content center-items-inline shadow">
	<span class="Qtitle">Конструктор очередей</span>

	<div class="input_group" id="name_input">
		<input id="input_name" type="text" maxlength="32" data-to="name" required/>
		<label class="field_name">Название очереди</label>
		<i class="fi fi-rs-check"></i>
		<i class="fi fi-rs-exclamation"></i>
		<div class="error_message center-items">
			Поле должно быть заполнено!
		</div>
	</div>

	<div class="type_selector flex-row">
		<div class="common padding-content center-items active" data-action="switch" id="C_btn">Обычная</div>
		<div class="smart padding-content center-items" data-action="switch" id="S_btn">Умная</div>
	</div>

	<div class="smart_options flex-column" id="smart_options">
		<div class="qm_title flex-row center-items">
			<span>Настройки умной очереди</span>
			<div class="info center-items">i</div>
		</div>
		<div class="input_group" id="apps_input">
			<input id="input_apps" type="number" min="1" max="99" maxlength="2" data-to="CountApps" required/>
			<label class="field_name">Количество задач</label>
			<i class="fi fi-rs-check"></i>
			<i class="fi fi-rs-exclamation"></i>
			<div class="error_message center-items">
				Хотя бы одно поле должно быть заполнено!
			</div>
			<div class="error_type center-items">
				Недопустимый символ или значение!
			</div>
		</div>
		<div class="input_group" id="date_input">
			<input id="input_date" type="number" min="1" max="99" maxlength="2" data-to="DateToPass" required/>
			<label class="field_name">Количество занятий для сдачи</label>
			<i class="fi fi-rs-check"></i>
			<i class="fi fi-rs-exclamation"></i>
			<div class="error_message center-items">
				Хотя бы одно поле должно быть заполнено!
			</div>
			<div class="error_type center-items">
				Недопустимый символ или значение!
			</div>
		</div>
	</div>

	<div class="btn_container flex-row">
		<div class="btn" data-action="create" id="create">Создать очередь</div>
		<div class="btn" data-action="close" id="close">Отмена</div>
	</div>
</div>
`;