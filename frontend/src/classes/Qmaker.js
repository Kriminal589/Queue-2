import { $notice } from "./notice";

const capitalize = s => (s && s[0].toUpperCase() + s.slice(1)) || ""

export const $Qmaker = function (callback) {

    function open() {
        const $f = document.createElement("div");
        $f.classList.add("modal", "visible", "center-items");
        $f.dataset.action = "close";
        $f.innerHTML = pattern();
        return $f;
    }

    function close() {
        document.body.removeChild(__popup__);
    }

	var options = {
		smart : false
	}

	function toggleState() {
		document.getElementById('C_btn').classList.toggle('active')
		const $smart_btn = document.getElementById('S_btn')
		$smart_btn.classList.toggle('active')
		options.smart = $smart_btn.classList.contains('active')
	}

	function checkInputs() {
		return document.getElementById('input_name').value &&
			   (options.smart ? 
			   document.getElementById('input_apps').value || document.getElementById('input_date').value :
			   true)
	}

	const actions = {
		common : (id) => {
			const $btn = document.getElementById(id)
			if (!$btn.classList.contains('active')) {
				toggleState()
				document.getElementById('smart_options').classList.remove('active')
			}
		},
		smart : (id) => {
			const $btn = document.getElementById(id)
			if (!$btn.classList.contains('active')) {
				toggleState()
				document.getElementById('smart_options').classList.toggle('active')
			}
		},
		close : () => {
			apply('Вы точно хотите отменить создание очереди?').then(e => {
				if (e) close()
			})
		},
		create : () => {
			if (checkInputs()) {
				apply('Подтвердите создание очереди с параметрами', `
					<div class="info">
						${JSON.stringify(parseValues())}
					</div>
				`).then(e => {
					if (e) {
						//callback(parseValues())
						close()
						$notice("Очередь успешно создана")
					}
				}
				)
			}
			else {
				//! Добавить подсказки
			}
		}
	}

	const parseValues = () => {
		const name = document.getElementById('input_name').value
		if (options.smart) {
			const apps = document.getElementById('input_apps').value
			const date = document.getElementById('input_date').value

			return {
				name,
				type : 'smart',
				dependOnApps : apps ? true : false,
				CountApps : apps || 0,
				dependOnDate : date ? true : false,
				DateToPass: date || 0
			}
		}
		return {
			name,
			type : 'common'
		}
	}

	const controlInput = e => {
		const number = e.target.valueAsNumber
		if (number > 100 || number <= 0) {
			e.target.value = 1
			options[e.target.dataset.to] = 1
		}
	}

    const __popup__ = open();
    
	__popup__.addEventListener("click", e => {
		const action = e.target.dataset.action
		if (action) {
			actions[action](e.target.id);
		}
	})

    document.body.appendChild(__popup__);
	document.getElementById('input_apps').oninput = controlInput
	document.getElementById('input_date').oninput = controlInput
};

const pattern = () => `
<div class="form padding-content center-items-inline shadow">
	<span class="Qtitle">Конструктор очередей</span>

	<div class="input_group">
		<input id="input_name" type="text" maxlength="32" data-to="name" required/>
		<label class="field_name">Название очереди</label>
	</div>

	<div class="type_selector flex-row">
		<div class="common padding-content center-items active" data-action="common" id="C_btn">Обычная</div>
		<div class="smart padding-content center-items" data-action="smart" id="S_btn">Умная</div>
	</div>

	<div class="smart_options flex-column" id="smart_options">
		<div class="qm_title flex-row center-items">
			<span>Настройки умной очереди</span>
			<div class="info center-items">i</div>
		</div>
		<div class="input_group">
			<input id="input_apps" type="number" min="1" max="99" maxlength="2" data-to="CountApps" required/>
			<label class="field_name">Количество задач</label>
		</div>
		<div class="input_group">
			<input id="input_date" type="number" min="1" max="99" maxlength="2" data-to="DateToPass" required/>
			<label class="field_name">Количество занятий для сдачи</label>
		</div>
	</div>

	<div class="btn_container flex-row">
		<div class="btn" data-action="create" id="create">Создать очередь</div>
		<div class="btn" data-action="close" id="close">Отмена</div>
	</div>
</div>
`;
/**
 * Создает окно с запросом
 * @param {string} text 
 * @param {string} content 
 * @returns null
 */
const apply = (text, content) => {
    return new Promise((resolve, reject) => {
        const $apply = document.createElement("div");
        $apply.classList.add("modal", "visible", "center-items", "flex-column");
        $apply.id = "modal-apply";
        $apply.dataset.action = "close";
        $apply.innerHTML = `
			<div class="notice apply padding-content center-items flex-column shadow">
			${text}
			${content || ""}
			<div class="btn-container flex-row">
					<div class="btn apply" data-action="ok">Подтвердить</div>
					<div class="btn close" data-action="cancel">Отмена</div>
			</div>
			</div>
		`;
        document.body.appendChild($apply);

        $apply.addEventListener("click", (e) => {
            const action = e.target.dataset.action;
            if (action) {
                console.log(`clicked on btn ${action}`);
                if (action === "ok") {
                    resolve(true);
                }
                resolve(false);
                document.body.removeChild($apply);
            }
        });
    });
};