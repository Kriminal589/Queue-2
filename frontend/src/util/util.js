import { serverRequest } from "../classes/serverReq";

export const applyInvite = (href, id) => {};

export const closeModal = () => {
  document.getElementById("modal").classList.remove("visible");
};

export const openModal = () => {
  document.getElementById("modal").classList.add("visible");
};

export const getStateModal = () => {
  return document.getElementById("modal").classList.contains("visible");
};

export const getTimeUnix = () => (Date.now() / 1000) | 0;

export function ReloadName() {
  const name = JSON.parse(localStorage.getItem("vk_auth")).name
  if (name) document.getElementById("name_holder").innerHTML = name
}

export const getName = () => JSON.parse(localStorage.getItem("vk_auth")).name
export const getId = () => JSON.parse(localStorage.getItem("vk_auth")).id
export const validSession = () => {
  const data = JSON.parse(localStorage.getItem("vk_auth"));
  return data && data.expire > getTimeUnix()
}

export const getPage = () => localStorage.getItem("page")
export const setPage = value => localStorage.setItem("page", value)

export function Auth(callback) {
  if (validSession()) {
    callback(false);
  } else {
    new Promise((resolve, reject) => {
      const $btn_auth = document.createElement("div");
      $btn_auth.classList.add("modal", "center-items", "visible");
      $btn_auth.id = "modal";
      $btn_auth.innerHTML += `
        <div class="btn auth" id="btn_vk_auth" data-action="login">Авторизация через ВК</div>
      `;
      document.body.appendChild($btn_auth);
      $btn_auth.addEventListener("click", function (e) {
        const action = e.target.dataset.action;
        if (action === "login") {
          VK.Auth.login((data) => {
            if (data.session) {
              console.log("auth | success");
              const { expire, user } = data.session;
              const { id, first_name, last_name } = user;
              localStorage.setItem(
                "vk_auth",
                JSON.stringify({
                  expire,
                  id,
                  name: `${first_name} ${last_name}`,
                })
              );
              document.body.removeChild($btn_auth);
              serverRequest.addStudent(id, `${first_name} ${last_name}`);
              resolve(false);
            } else {
              resolve(true);
            }
          });
        }
      });
    })
      .then(callback)
  }
}

export const createQueueText = list => list.map((item, index) => `${index+1} ${item.nameOfStudent}`).join('\n')

export const copyToClipboard = text => {
  if (window.clipboardData && window.clipboardData.setData) {
      // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
      return window.clipboardData.setData("Text", text);

  }
  else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
      var textarea = document.createElement("textarea");
      textarea.textContent = text;
      textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in Microsoft Edge.
      document.body.appendChild(textarea);
      textarea.select();
      try {
          return document.execCommand("copy");  // Security exception may be thrown by some browsers.
      }
      catch (ex) {
          console.warn("Copy to clipboard failed.", ex);
          return prompt("Copy to clipboard: Ctrl+C, Enter", text);
      }
      finally {
          document.body.removeChild(textarea);
      }
  }
}