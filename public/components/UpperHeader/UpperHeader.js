export class UpperHeader {
    renderHeader() {
        const headerElement = document.createElement('header');

        // Логотип
        const logo = document.createElement('div');
        logo.className = 'logo';
        logo.textContent = 'Выходной';
        headerElement.appendChild(logo);

        // Навигация
        const nav = document.createElement('nav');
        const ul = document.createElement('ul');

        // Список пунктов меню
        const menuItems = ['Скоро тут', 'Будет', 'Нормальный', 'Хэдер'];

        // Создаем пункты меню
        menuItems.forEach(item => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            
            a.textContent = item;
            
            li.appendChild(a);
            ul.appendChild(li);
        });

        const btnLogin = document.createElement('button');
        const btnRegister = document.createElement('button');
        ul.appendChild(btnLogin);
        ul.appendChild(btnRegister);

        // Добавляем список в навигацию и навигацию в заголовок
        nav.appendChild(ul);
        headerElement.appendChild(nav);

        return headerElement;

    }
}


/////////////////////////////

//create button where to hang handler
// at index js hang this handler(?) (see example)
/////////////////////////////////