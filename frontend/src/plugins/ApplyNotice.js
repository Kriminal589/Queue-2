export const apply = (
  text,
  content = {
    id: 0,
    html: "",
    type: "",
  },
) => {
  return new Promise((resolve, reject) => {
    const $apply = document.createElement("div");
    $apply.classList.add("modal", "visible", "center-items", "flex-column");
    $apply.tabIndex = 0;
    $apply.id = "modal-apply";
    $apply.dataset.action = "close";
    $apply.innerHTML = `
			<div class="notice apply padding-content center-items shadow flex-column">
			${text}
			${content.html || ""}
			<div class="btn-container flex-row">
					<div class="btn apply" data-action="ok">Подтвердить</div>
					<div class="btn close" data-action="cancel">Отмена</div>
			</div>
			</div>
		`;
    document.body.appendChild($apply);

    const toggleStateById = (id, flag, message) => {
      const $elem = document.getElementById(id);
      if (flag) {
        $elem.classList.remove(
          "error",
          message === 1 ? "message" : message === 2 ? "type_err" : null,
        );
        $elem.classList.add("success");
      } else {
        $elem.classList.add(
          "error",
          message === 1 ? "message" : message === 2 ? "type_err" : null,
        );
        $elem.classList.remove("success");
      }
    };

    if (content.type === "input") {
      const $input = document.getElementById(content.id);
      $input.oninput = (e) => {
        e.preventDefault();
        const number = e.target.valueAsNumber;

        if (
          number > 100 ||
          number <= 0 ||
          (isNaN(parseInt(e.data)) && e.data)
        ) {
          e.target.value = "";
          toggleStateById(e.target.parentNode.id, 0, 2);
        } else {
          toggleStateById(e.target.parentNode.id, 1);
        }
      };
    }
    if (content.type === "nameInput") {
      const $input = document.getElementById(content.id);
      $input.oninput = (e) => {
        e.preventDefault();
        toggleStateById("name_input", e.target.value);
        if (e.data === " ") {
          e.target.value = e.target.value.replace(" ", "");
        }
      };
    }

    // $apply.onkeydown = e => {
    //     e.preventDefault()
    //     console.log(e.key);
    //     if (e.key === 'escape') {
    //         resolve(false);
    //         document.body.removeChild($apply);
    //     }
    // }

    $apply.addEventListener("click", (e) => {
      const action = e.target.dataset.action;
      if (action) {
				if (action === 'ok') {
					if (content.type === 'input') {
						const value = document.getElementById(content.id)
						if (value) {
							document.body.removeChild($apply);
							resolve(value);
						}
						else {
							toggleStateById('input_a', 0, 1)
						}
					}
					else if (content.type === 'nameInput') {
						const value = document.getElementById(content.id).value
						if (value === content.queueName) {
							document.body.removeChild($apply);
							resolve(1)
						}
						else {
							toggleStateById('input_a', 0, 1)
						}
					}
					else {
						document.body.removeChild($apply);
						resolve(1);
					}
				}
				else {
					document.body.removeChild($apply);
					resolve(false);
				}
      }
    });
  });
};
