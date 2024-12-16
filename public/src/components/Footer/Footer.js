/**
 * Footer module.
 * 
 * This module provides a class to render a footer element.
 * 
 * @module footer
 */

/**
 * Footer class.
 * 
 * This class is responsible for rendering a footer element.
 * 
 * @class Footer
 */
export class Footer {
    /**
     * Renders the footer element.
     * 
     * This method creates a footer element and appends various child elements to it, including a subscribe block and two list blocks.
     * 
     * @method renderFooter
     * @returns {HTMLElement} The footer element.
     */
    renderFooter() {
      /**
       * The footer element.
       * 
       * @type {HTMLElement}
       */
      const footerElement = document.createElement('footer');
      footerElement.classList.add('footer');
  
      /**
       * The subscribe block element.
       * 
       * @type {HTMLElement}
       */
      const subscribeBlock = document.createElement('div');
      subscribeBlock.classList.add('subscribe-block');
  
      /**
       * The subscribe card element.
       * 
       * @type {HTMLElement}
       */
      const subscribeCard = document.createElement('div');
      subscribeCard.classList.add('subscribe-card');
  
      /**
       * The subscribe title element.
       * 
       * @type {HTMLElement}
       */
      const subscribeTitle = document.createElement('h3');
      subscribeTitle.textContent = 'Подпишитесь на рассылку';
  
      /**
       * The input email element.
       * 
       * @type {HTMLInputElement}
       */
      const inputEmail = document.createElement('input');
      inputEmail.type = 'email';
      inputEmail.placeholder = 'Введите ваш email';
      inputEmail.setAttribute('disabled', "");
  
      /**
       * The subscribe button element.
       * 
       * @type {HTMLButtonElement}
       */
      const subscribeButton = document.createElement('button');
      subscribeButton.textContent = 'Подписаться';
      subscribeButton.setAttribute('disabled', "");
  
      subscribeCard.appendChild(subscribeTitle);
      subscribeCard.appendChild(inputEmail);
      subscribeCard.appendChild(subscribeButton);
      subscribeBlock.appendChild(subscribeCard);
  
      /**
       * The list 1 block element.
       * 
       * @type {HTMLElement}
       */
      const list1Block = document.createElement('div');
      list1Block.classList.add('list-block');
  
      /**
       * The header 1 element.
       * 
       * @type {HTMLElement}
       */
      const header1 = document.createElement('h2');
      header1.textContent = "О нас";
      list1Block.appendChild(header1);
  
      /**
       * The ul 1 element.
       * 
       * @type {HTMLElement}
       */
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
  
      /**
       * The list 2 block element.
       * 
       * @type {HTMLElement}
       */
      const list2Block = document.createElement('div');
      list2Block.classList.add('list-block');
  
      /**
       * The header 2 element.
       * 
       * @type {HTMLElement}
       */
      const header2 = document.createElement('h2');
      header2.textContent = "О сайте";
      list2Block.appendChild(header2);
  
      /**
       * The ul 2 element.
       * 
       * @type {HTMLElement}
       */
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
  
      /**
       * The lists container element.
       * 
       * @type {HTMLElement}
       */
      const listsContainer = document.createElement('div');
      listsContainer.classList.add('lists-container');
      listsContainer.appendChild(list1Block);
      listsContainer.appendChild(list2Block);
  
      footerElement.appendChild(subscribeBlock);
      footerElement.appendChild(listsContainer);
  
      return footerElement;
    }
  }
  