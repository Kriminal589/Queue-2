import "./styles/main.scss";
import {serverRequest} from "./classes/serverReq"
import { App } from "./classes/App";
//import { $LoadBar } from "./classes/loadBar";

window.onload = () => {
  VK.Widgets.Auth("vk_auth", {onAuth: (data) => {
    localStorage.setItem("vk_auth", JSON.stringify(data))
    document.body.removeChild(document.getElementById('modal-vk'))
    const $name = document.getElementById('name_holder')
    $name.innerHTML = `${data['first_name']} ${data['last_name']}`
    $name.dataset.uid = data['uid']
    main()
  }})
};

const main = async () => {
  if (document.location.hash) {
    
  }
  else {
    const rq = await serverRequest.request('https://jsonplaceholder.typicode.com/users')
    console.log(rq)
    new App()
  }
}