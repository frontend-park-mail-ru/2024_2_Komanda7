import { api } from "../../modules/FrontendAPI.js";
import { navigate } from "../../modules/router.js";
import Handlebars from 'handlebars';
import template from './Nav.hbs';

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
    const backAnswer = await response.json();

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

    const dynamicItems = backAnswer.categories.map(category => ({
      key: category.ID || category.name, 
      href: `/events/categories/${category.ID}`, 
      text: category.name 
    }));

    const items = [allEventsItem, ...dynamicItems, pastEventsItem];

    const html = template({ items });
    this.navElement.innerHTML += html;

    this.navElement.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault(); 
        const path = link.getAttribute('href');
        this.navigate(path); 
      });
    });

    return this.navElement;
  } catch (error) {
    console.error('Ошибка в Nav render:', error);
    return this.navElement;
  }
}
}
