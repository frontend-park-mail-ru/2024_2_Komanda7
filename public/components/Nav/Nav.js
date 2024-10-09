export class Nav {
    constructor() {
        this.navElement = document.createElement('nav');
        this.ul = document.createElement('ul');
    }
        navigation = {
            Popular: {
                href: '/events',
                text: 'Все события',
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

        renderNav() { 
            const template = Handlebars.templates['Nav.hbs'];
            const config = this.navigation;
            let itemss = Object.entries(config); 
            let items = itemss.map(([key, {href, text}], index) => {            
                return {key, href, text};
            });

            this.navElement.innerHTML += template({items});
        return this.navElement;
    }
}