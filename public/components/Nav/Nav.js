export class Nav {
    renderNav() {
        const navElement = document.createElement('nav'); 
        const ul = document.createElement('ul'); 

        const navigation = {
            Popular: {
                href: 'events/popular',
                text: 'Популярное',
            },
            Exhibition: {
                href: '/exhibitions',
                text: 'Выставки',
            },
            Theater: {
                href: '/theater',
                text: 'Театр',
            },
            Cinema: {
                href: '/cinema',
                text: 'Кино',
            },
            Food: {
                href: '/food',
                text: 'Еда',
            },
            Kids: {
                href: '/kids',
                text: 'Детям',
            },
            Past: {
                href: '/past',
                text: 'Прошедшие',
            },
            Sport: {
                href: '/sport',
                text: 'Спорт',
            },
        };

     
        Object.entries(navigation).forEach(([key, { href, text }]) => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = href; 
            a.textContent = text; 
            li.appendChild(a); 
            ul.appendChild(li); 
        });

        navElement.appendChild(ul); 

        return navElement; 
    }
}
