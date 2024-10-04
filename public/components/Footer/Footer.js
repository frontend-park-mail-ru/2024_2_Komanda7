export class Footer {
    renderFooter() {
        const footerElement = document.createElement('footer');
        footerElement.classList.add('footer');

        const subscribeBlock = document.createElement('div');
        subscribeBlock.classList.add('subscribe-block');

        const subscribeCard = document.createElement('div');
        subscribeCard.classList.add('subscribe-card');

        const subscribeTitle = document.createElement('h3');
        subscribeTitle.textContent = 'Подпишитесь на рассылку';

        const inputEmail = document.createElement('input');
        inputEmail.type = 'email';
        inputEmail.placeholder = 'Введите ваш email';
        inputEmail.setAttribute('disabled', "");

        const subscribeButton = document.createElement('button');
        subscribeButton.textContent = 'Подписаться';
        subscribeButton.setAttribute('disabled', "");

        subscribeCard.appendChild(subscribeTitle);
        subscribeCard.appendChild(inputEmail);
        subscribeCard.appendChild(subscribeButton);
        subscribeBlock.appendChild(subscribeCard);

        const list1Block = document.createElement('div');
        list1Block.classList.add('list-block');

        const header1 = document.createElement('h2');
        header1.textContent = "О нас";
        list1Block.appendChild(header1);

        const ul1 = document.createElement('ul');
        const links1 = ['О компании', 'Реклама', 'Партнерам', 'Возврат билетов', 'Пользовательское соглашение'];
        links1.forEach(text => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.textContent = text;
            a.href = '#';
            li.appendChild(a);
            ul1.appendChild(li);
        });
        list1Block.appendChild(ul1);

        const list2Block = document.createElement('div');
        list2Block.classList.add('list-block');

        const header2 = document.createElement('h2');
        header2.textContent = "О сайте";
        list2Block.appendChild(header2);

        const ul2 = document.createElement('ul');
        const links2 = ['Справка', 'Сертификаты', 'Карта сайта', 'Контакты'];
        links2.forEach(text => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.textContent = text;
            a.href = '#';
            li.appendChild(a);
            ul2.appendChild(li);
        });
        list2Block.appendChild(ul2);

        const listsContainer = document.createElement('div');
        listsContainer.classList.add('lists-container');
        listsContainer.appendChild(list1Block);
        listsContainer.appendChild(list2Block);

        footerElement.appendChild(subscribeBlock);
        footerElement.appendChild(listsContainer);

        return footerElement;
    }
}