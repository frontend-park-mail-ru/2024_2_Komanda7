/**
 * LoginForm class
 */
import { api } from '../../modules/FrontendAPI.js';
export class EventCreateForm {
   
    constructor(formId) {
      this.form = document.createElement('form');
      this.form.id = formId;
    }

    config = {
      eventServerError: {
        text: '',
        tag: 'label',
        className: 'error_text',
        type: '',
      },

      eventAddLabel: {
        
        text: 'Создать мероприятие',
        
        tag: 'label',
        
        className: '',
        
        type: '',
      },
      
      eventNameEntry: {
        /**
         * Text
         * @type {string}
         */
        text: 'Название мероприятия',
        /**
         * Tag type
         * @type {string}
         */
        tag: 'input',
        /**
         * Type
         * @type {string}
         */
        type: 'text',
        /**
         * Class name
         * @type {string}
         */
        className: '',

      },
      
      eventNameError: {
        text: '',
        tag: 'label',
        className: 'error_text',
        type: '',
      },
      eventDescriptionEntry: {
        
        text: 'Описание мероприятия',
        tag: 'textarea',
        
        type: '',
        
        className: '',
      },
      eventDescriptionError: {
        /**
         * Error text
         * @type {string}
         */
        text: '',
        /**
         * Tag type
         * @type {string}
         */
        tag: 'label',
        /**
         * Class name
         * @type {string}
         */
        className: 'error_text',
        /**
         * Type
         * @type {string}
         */
        type: '',
      },

      eventTagsEntry: {
        
        text: 'Тэги (не более 3 штук)',
        
        tag: 'input',
        
        type: '',
        
        className: '',
      },
     
      eventTagsError: {

        text: '',
        
        tag: 'label',
        
        className: 'error_text',
        
        type: '',
      },

      eventBeginEntry: {
          
          text: 'Время начала мероприятия',
          
          tag: 'input',
          
          type: 'datetime-local',
          
          className: '',
      },
      
      eventBeginError: {
          
          text: '',
          
          tag: 'label',
          
          className: 'error_text',
          
          type: '',
      },

      eventEndEntry: {
        /**
         * Text
         * @type {string}
         */
        text: 'Время окончания мероприятия',
        /**
         * Tag type
         * @type {string}
         */
        tag: 'input',
        /**
         * Type
         * @type {string}
         */
        type: 'datetime-local',
        /**
         * Class name
         * @type {string}
         */
        className: '',
      },

      eventEndError: {
        /**
         * Error text
         * @type {string}
         */
        text: '',
        /**
         * Tag type
         * @type {string}
         */
        tag: 'label',
        /**
         * Class name
         * @type {string}
         */
        className: 'error_text',
        /**
         * Type
         * @type {string}
         */
        type: '',
      },
      imageInput: {
        /**
         * Error text
         * @type {string}
         */
        text: '',
        /**
         * Tag type
         * @type {string}
         */
        tag: 'input',
        /**
         * Class name
         * @type {string}
         */
        className: '',
        /**
         * Type
         * @type {string}
         */
        type: 'file',
        accept: "image/png, image/jpeg"
      },
      categories: {
        
        text: '',
        /**
         * Tag type
         * @type {string}
         */
        tag: 'div',
        /**
         * Class name
         * @type {string}
         */
        className: '',
        /**
         * Type
         * @type {string}
         */
        type: '',
      },
     
      eventSubmitBtn: {
      
        text: 'Создать',
        
        tag: 'button',

        type: 'submit',
      
        className: '',
      },
    };
  
    /**
     * Renders the form template
     * @returns {HTMLFormElement} The rendered form
     */
    renderTemplate(selectElement) {
      
      const template = Handlebars.templates['EventCreateForm.hbs'];

      const config = this.config;
      let itemsArray = Object.entries(config);
      let items = itemsArray.map(([key, {tag, text, className, type}], index) => {
        let needPlaceholder = (tag === 'input');
        let needMaxMinTime = (type === 'time');
        return {key, tag, text, className, type, needPlaceholder, needMaxMinTime}; 
      });
      console.log(items);
  
      this.form.innerHTML += template({items});
  
      const categoriesSelect = selectElement;
      selectElement.id = 'categoriesInput';
      this.form.appendChild(categoriesSelect);

      //const createBtn = document.getElementById('createBtn');
      //createBtn.addEventListener();
      
      return this.form;
    }
  }
   