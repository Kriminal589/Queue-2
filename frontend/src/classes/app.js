import { QList } from "./Qlist";
import { serverRequest } from "./serverReq";
import { ReloadName, setPage } from "../util/util";
import { Notice } from "./notice";
import { $modalWindow } from "../plugins/modal"

export class App {
  #qList = new QList();
  #notice = new Notice(45);
  constructor() {
    this.error = false;
    this.#setup();
  }

  show_error() {
    document.getElementById("content-main").innerHTML =
      '<div class="error">Сайт не работает. Звоните фиксикам или попробуйте обновить страницу :)</div>';
  }

  #header() {
    const $header = document.createElement('header')
    $header.classList.add('center-items-inline')
		// <div class="p_btn notice_btn center-items padding-lr" id="noticeList"></div>
    $header.innerHTML = `
    <div class="container center-items-inline">
      <div class="logo center-items">stdq</div>
      <span class="title">Удобная очередь</span>
    </div>
    <div class="profile center-items-inline">
        <div class="name center-items" id="name_holder"></div>
        <div class="p_btn home center-items padding-lr" id="home"></div>
        <div class="p_btn logout center-items padding-lr" id="logout"></div>
    </div>`
    document.body.appendChild($header)
  }

  #main() {
    const $main = document.createElement('main')
    $main.classList.add('flex-space-center-wrap')
    $main.id = 'content-main'
    document.body.appendChild($main)
  }

  #footer() {
    const $footer = document.createElement('footer')
    $footer.classList.add('center-items-inline')
    $footer.innerHTML = `
    <div class="dev flex-row">
      <span>Разработчики:</span>
      <div class="link center-items padding-lr" data-action="open_modal" data-target="kriminal589" data-vk="https://vk.com/kriminal589" data-github="https://github.com/Kriminal589" data-role="backend разработчик">@Kriminal589</div>
      <div class="link center-items padding-lr" data-action="open_modal" data-target="viltskaa" data-vk="https://vk.com/viltskaa" data-github="https://github.com/viltskaa" data-role="frontend разработчик">@Viltskaa</div>
    </div>`
    document.body.appendChild($footer)
  }

  async #setup() {
    document.body.innerHTML = ''
    this.#header()
    this.#main()
    this.#footer()
    setPage('main')

    document.getElementById("logout").onclick = function () {
      setPage('home')
      console.log('logout init');
      VK.Auth.getLoginStatus(function(response){
        if (response) {
          VK.Auth.logout(function(data) {
            console.log(data);
            localStorage.removeItem('vk_auth')
            document.location.reload();
          });
        }
      })
    }
    //document.getElementById('noticeList').addEventListener('click', this.openNotice.bind(this));
    document.getElementById('home').addEventListener('click', this.openHome.bind(this));
    document.querySelectorAll('.link').forEach(item => {
      item.addEventListener('click', e => {
        e.preventDefault()
        $modalWindow({
          title : item.dataset.target,
          elements : [
						{
							type : 'span',
							innerHTML : item.dataset.role,
							class : '' 
						},
            {
              type : 'div',
              innerHTML : `<div class="vk"></div><a href=${item.dataset.vk}>Профиль ВК</a>`,
              class : 'dev-item center-items'
            },
            {
              type : 'div',
              innerHTML : `<div class="github"></div><a href=${item.dataset.github}>Профиль Github</a>`,
              class : 'dev-item center-items'
            }
          ]
        })
      })
    })
    
    const { id, name } = JSON.parse(localStorage.getItem("vk_auth"));
    const response = await serverRequest.addStudent(id, name);
    
    this.#qList.canAddQueue = +response.response || false;

    if (response === -1) {
      this.error = true;
    } else {
      await this.#qList.parseListOfQueues(id);
    }
    this.render();
  }

  openHome() {
    setPage('home');
    window.location.reload();
  }

  openNotice() {
    this.#notice.open()
    console.log('notifications list open.')
  }

  render() {
    ReloadName();
    if (this.error) {
      this.show_error();
    } else {
      this.#qList.render();
      console.log("render...");
    }
  }
}
