import "./styles/main.scss";
import {serverRequest} from "./classes/serverReq"
import { App } from "./classes/App";
import {closeModal, openModal} from './util/util'
//import { $LoadBar } from "./classes/loadBar";

window.onload = () => {
  VK.init({ apiId: 8229660 });
  //document.getElementById('logout').onclick = VK.Auth.logout();
  // if (localstorage.getItem('vk_auth')) {
  //   closeModal()
  //   main()
  // }
  VK.Widgets.Auth("vk_auth", {onAuth: (data) => {
    localStorage.setItem("vk_auth", JSON.stringify(data))
    closeModal()
    const $name = document.getElementById('name_holder')
    $name.innerHTML = `${data['first_name']} ${data['last_name']}`
    $name.dataset.uid = data['uid']
    main()
  }})
};

const main = async () => {
  if (document.location.hash) {
    console.log('')
  }
  else {
    new App()
  }
}