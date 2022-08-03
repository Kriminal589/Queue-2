import "./styles/main.scss";
import { App } from "./classes/App";
import { Auth } from "./util/util";
import { InviteApply } from "./classes/notice"

window.onload = () => {
  VK.init({ apiId: 8229660 });
  Auth(main);
};

const main = async (error) => {
  console.log(error)
  const hash = document.location.hash
  if (hash) {
    InviteApply(hash.replace('#', ''))
  } else {
    const app = new App();
    if (error) {
      app.error = true;
      app.render();
    }
  }
};
