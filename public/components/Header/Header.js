import { endpoint } from "../../config.js"

export class Header {
    renderCommonPart() {
        // Логотип
        const logo = document.createElement('a');
        logo.className = 'logo';
        logo.textContent = 'Выходной';
        logo.href = '/events';
        this.headerElement.appendChild(logo);

        const searchbar = document.createElement('input');
        searchbar.type = 'search';
        searchbar.className = 'searchbar'
        searchbar.placeholder = 'Найти событие';
        searchbar.setAttribute('disabled', "");

        this.headerElement.appendChild(searchbar);
        this.headerElement.appendChild(searchbar);

        this.buttons = document.createElement('div');
        this.buttons.className = "buttons";

    }
    renderUnauthorizedHead(navigate) {
        //User is not logged in
        const btnLogin = document.createElement('button');
        const btnRegister = document.createElement('button');
        btnLogin.addEventListener('click', (event) => {
            event.preventDefault();
            const path = '/login';
            navigate(path);
        });
        btnRegister.addEventListener('click', (event) => {
            event.preventDefault();
            const path = '/signup';
            navigate(path);
        });

        btnLogin.className = "btnLogin"
        btnRegister.className = "btnRegister"

        btnLogin.textContent = "Войти"
        btnRegister.textContent = "Зарегистрироваться"
        this.buttons.appendChild(btnLogin);
        this.buttons.appendChild(btnRegister);
    }
    renderAuthorizedHead(logout) {
        //User is logged in
        const profileLink = document.createElement('a');
        const avatarImage = document.createElement('img');
        avatarImage.src = '/static/images/myavatar.png';
        avatarImage.onerror = function() {
            this.src = "/static/images/default_avatar.png";
            this.style.objectFit = 'fill';
        };
        avatarImage.alt = 'Avatar';
        avatarImage.className = 'avatar';
        profileLink.appendChild(avatarImage);
        this.buttons.appendChild(profileLink);

        const logoutButton = document.createElement('button');
        logoutButton.textContent = 'Выйти';
        logoutButton.onclick = async() => {
            try {
                const response = await fetch(`${endpoint}/logout`, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    credentials: "include"
                });
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                logout();
            } catch (error) {
                console.error(error);
            }
        };
        this.buttons.appendChild(logoutButton);
    }
    renderHeader(userIsLoggedIn, logout, navigate) {
        this.headerElement = document.createElement('header');
        this.renderCommonPart();
        
        if (!userIsLoggedIn) {
            this.renderUnauthorizedHead(navigate);
        } else {
            this.renderAuthorizedHead(logout);
        }

        this.headerElement.appendChild(this.buttons)
        return this.headerElement;
    }
}