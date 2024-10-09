import { endpoint } from "../../config.js"

const someHandler = (event, path, navigate) => {
    event.preventDefault();
    navigate(path);
};

export class Header {
    renderHeader(userIsLoggedIn, logout, navigate) {
        const headerElement = document.createElement('header');
        this.headerElement = headerElement;

        // Логотип
        const logo = document.createElement('a');
        logo.className = 'logo';
        logo.textContent = 'Выходной';
        logo.href = '/events';
        headerElement.appendChild(logo);

        const searchbar = document.createElement('input');
        searchbar.type = 'search';
        searchbar.className = 'searchbar'
        searchbar.placeholder = 'Найти событие';
        searchbar.setAttribute('disabled', "");

        headerElement.appendChild(searchbar);
        headerElement.appendChild(searchbar);

        const buttons = document.createElement('div');
        buttons.className = "buttons";

        if (!userIsLoggedIn) {
            //User is not logged in
            const btnLogin = document.createElement('button');
            const btnRegister = document.createElement('button');

            btnLogin.addEventListener('click', (event)=> someHandler(event, '/login', navigate));
            btnRegister.addEventListener('click', (event) => {
                event.preventDefault();
                const path = '/signup';
                navigate(path);
            });

            btnLogin.className = "btnLogin"
            btnRegister.className = "btnRegister"

            btnLogin.textContent = "Войти"
            btnRegister.textContent = "Зарегистрироваться"
            buttons.appendChild(btnLogin);
            buttons.appendChild(btnRegister);
        } else {
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
            buttons.appendChild(profileLink);

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
            buttons.appendChild(logoutButton);
        }

        headerElement.appendChild(buttons)
        return headerElement;
    }
}