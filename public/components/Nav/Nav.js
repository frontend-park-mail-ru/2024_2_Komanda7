import { api } from "../../modules/FrontendAPI.js";
import { navigate } from "../../modules/router.js";
export class Nav {  

  constructor() {
    this.navElement = document.createElement('nav');
    this.navigate = navigate; 
  }
  /**
 * Renders the navigation template
 * @returns {HTMLNavElement} The rendered navigation
 */
async renderNav() {
  try {

    const request = { headers: {} };
    const response = await api.get('/categories', request);
    const dynamicCategories = await response.json();

    const allEventsItem = {
      key: 'allEvents',
      href: '/events',
      text: 'Все события'
    };

    const pastEventsItem = {
      key: 'pastEvents',
      href: '/events/past',
      text: 'Прошедшие'
    };

    const dynamicItems = dynamicCategories.map(category => ({
      key: category.id || category.name, 
      href: `/events/categories/${category.id}`, 
      text: category.name 
    }));

    const items = [allEventsItem, ...dynamicItems, pastEventsItem];

    const template = Handlebars.templates['Nav.hbs'];
    this.navElement.innerHTML += template({ items });

    this.navElement.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault(); 
        const path = link.getAttribute('href');
        this.navigate(path); 
      });
    });

    return this.navElement;
  } catch (error) {
    console.error('Нет категорий:', error);
    return this.navElement;
  }
}
}
