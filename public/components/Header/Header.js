export class Header {
    renderHeader() {
        const headerElement = document.createElement('header');

        // Логотип
        const logo = document.createElement('div');
        logo.className = 'logo';
        logo.textContent = 'Выходной';
        headerElement.appendChild(logo);

        const searchbar = document.createElement('input');
        searchbar.type = 'search';
        searchbar.className = 'searchbar'
        searchbar.placeholder = 'Найти событие';
        headerElement.appendChild(searchbar);
        headerElement.appendChild(searchbar)

        const buttons = document.createElement('div');
        buttons.className="buttons"
        const btnLogin = document.createElement('button');
        const btnRegister = document.createElement('button');
        btnLogin.addEventListener('click', function() {
            window.location.href = '/login'; ъ
        });
        btnRegister.addEventListener('click', function() {
            window.location.href = '/signup'; // Замените '/login' на нужный URL
        });
        
btnRegister.setAttribute('href', '/register');

        btnLogin.className = "btnLogin"
        btnRegister.className = "btnRegister"
        
        btnLogin.textContent = "Войти"
        btnRegister.textContent = "Зарегистрироваться"
        buttons.appendChild(btnLogin);
        buttons.appendChild(btnRegister);
headerElement.appendChild(buttons)
        

        // Добавляем список в навигацию и навигацию в заголовок

        return headerElement;
    }
}
