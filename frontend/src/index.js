import "./styles/main.scss";
import { App } from "./classes/App";
import { Auth } from "./util/util";
import { InviteApply } from "./classes/notice";
import { homepage } from "./plugins/homepage"

window.onload = async () => {
    VK.init({ apiId: 8229660 });
	const hash = document.location.hash.replace('#', '')
	if (hash.length > 0) {
		Auth(() => {
			InviteApply(hash);
		})
	}
	else {
		homepage(main)
	}
};

const main = error => {
	const app = new App();
	if (error) {
		app.error = true;
		app.render();
	}
};
