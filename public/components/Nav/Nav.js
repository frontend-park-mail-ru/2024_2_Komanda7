/**
 * Nav class
 */
export class Nav {
    /**
     * Creates a new Nav instance
     */
    constructor() {
      /**
       * The nav element
       * @type {HTMLNavElement}
       */
      this.navElement = document.createElement('nav');
      /**
       * The ul element
       * @type {HTMLUListElement}
       */
      this.ul = document.createElement('ul');
    }
  
    /**
     * Navigation configuration object
     * @type {Object}
     */
    navigation = {
      /**
       * Popular navigation item configuration
       * @type {Object}
       */
      Popular: {
        /**
         * Link href
         * @type {string}
         */
        href: '/events',
        /**
         * Link text
         * @type {string}
         */
        text: 'Все события',
      },
      /**
       * Exhibition navigation item configuration
       * @type {Object}
       */
      Exhibition: {
        /**
         * Link href
         * @type {string}
         */
        href: '/exhibitions',
        /**
         * Link text
         * @type {string}
         */
        text: 'Выставки',
      },
      /**
       * Theater navigation item configuration
       * @type {Object}
       */
      Theater: {
        /**
         * Link href
         * @type {string}
         */
        href: '/theater',
        /**
         * Link text
         * @type {string}
         */
        text: 'Театр',
      },
      /**
       * Cinema navigation item configuration
       * @type {Object}
       */
      Cinema: {
        /**
         * Link href
         * @type {string}
         */
        href: '/cinema',
        /**
         * Link text
         * @type {string}
         */
        text: 'Кино',
      },
      /**
       * Food navigation item configuration
       * @type {Object}
       */
      Food: {
        /**
         * Link href
         * @type {string}
         */
        href: '/food',
        /**
         * Link text
         * @type {string}
         */
        text: 'Еда',
      },
      /**
       * Kids navigation item configuration
       * @type {Object}
       */
      Kids: {
        /**
         * Link href
         * @type {string}
         */
        href: '/kids',
        /**
         * Link text
         * @type {string}
         */
        text: 'Детям',
      },
      /**
       * Past navigation item configuration
       * @type {Object}
       */
      Past: {
        /**
         * Link href
         * @type {string}
         */
        href: '/past',
        /**
         * Link text
         * @type {string}
         */
        text: 'Прошедшие',
      },
      /**
       * Sport navigation item configuration
       * @type {Object}
       */
      Sport: {
        /**
         * Link href
         * @type {string}
         */
        href: '/sport',
        /**
         * Link text
         * @type {string}
         */
        text: 'Спорт',
      },
    };
  
    /**
     * Renders the navigation template
     * @returns {HTMLNavElement} The rendered navigation
     */
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
  