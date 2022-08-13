export const apply = (text, content={
    id : 0,
    html : "",
    type : ""
}) => {
    return new Promise((resolve, reject) => {
        const $apply = document.createElement("div");
        $apply.classList.add("modal", "visible", "center-items", "flex-column");
        $apply.tabIndex = 0
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

        $apply.onkeydown = e => {
            e.preventDefault()
            console.log(e.key);
            if (e.key === 'escape') {
                resolve(false);
                document.body.removeChild($apply);
            }
        }

        $apply.addEventListener("click", (e) => {
            const action = e.target.dataset.action;
            if (action) {
                console.log(`clicked on btn ${action}`);
                if (action === "ok") {
                    if (content.type==='input') {
                        const value =
                            document.getElementById(content.id).value;
                        if (value) {
                            resolve(value);
                        }
                    } else {
                        resolve(true);
                    }
                }
                resolve(false);
                document.body.removeChild($apply);
            }
        });
    });
};