import { getPage, validSession } from "../util/util";

export const homepage = (callback) => {
    new Promise((resolve, reject) => {
        if (getPage() !== "home") resolve(false);

        const $page = document.createElement("div");
        $page.classList.add("homepage");
        $page.innerHTML = `
            <div class="circle" id="a"></div>
            <div class="square" id="b"></div>
            <div class="homepage_content flex-row">
                <div class="left flex-column">
                    <div class="nav flex-row">
                        <div class="h_btn about" data-action="about">Сервис</div>
                        <div class="h_btn link" data-action="link">Связь</div>
                    </div>

                    <div class="homepage_title flex-column">
                        <span>Удобная</span>
                        <span>Очередь</span>
                        <span>для студентов</span>
                        <span>разработаная такими же студентами</span>
                    </div>
                    ${
                        validSession()
                            ? '<div class="authbtn center-items" data-action="close">Перейти к очередям</div>'
                            : '<div class="authbtn center-items" data-action="auth">Авторизация через Вконтакте</div>'
                    }
                </div>
                <div class="right center-items">
                    <div class="news_page custom-scrollbar">
                        <div class="news_item center-items">
                            <div class="news_title">Обновление 1.1</div>
                            <div class="description">lol</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild($page);
        $page.addEventListener("click", (e) => {
            const action = e.target.dataset.action;

            if (action) {
                switch (action) {
                    case "auth": {
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
                                    }),
                                );
                                document.body.removeChild($page);
                                resolve(false);
                            } else {
                                resolve(true);
                            }
                        });
                        break;
                    }
                    case "close": {
                        document.body.removeChild($page);
                        resolve(false);
                    }
                }
            }
        });
    }).then(callback);
};
