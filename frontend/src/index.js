import "./styles/main.scss";
import { App } from "./classes/App";
import { Auth } from "./util/util";
import {$Qmaker} from "./classes/Qmaker"
import { InviteApply } from "./classes/notice";

window.onload = async () => {
	//$Qmaker()
    VK.init({ apiId: 8229660 });
    Auth(main);
};

const main = async (error) => {
    console.log(error);
    const hash = document.location.hash.replace('#', '')
    if (hash) {
        InviteApply(hash);
    } else {
        const app = new App();
        if (error) {
            app.error = true;
            app.render();
        }
    }
};

async function send() {
	try {
		let request = new Request('http://25.84.228.15:8080/queue/test', {})
		const res = await fetch(request, {
		method: 'GET',
		headers: {
			"Content-Type" : "application/json",
			"Authorization" : JSON.stringify("BEER_MONSTER_ENTERS_TO_SERVER!")
		}
		})
		return res.json()
	}
	catch (error) {
		console.error(error);
		return error;
	}
}
