/**
 * LoginForm class
 */
export class EventCreateForm {
   
    constructor(formId) {
      this.form = document.createElement('form');
      this.form.id = formId;
    }

    config = {
      eventServerError: {
        text: 'очень много текста на неизвестном древнем языке',
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
        tag: 'input',
        
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
        
        text: 'Тэги (не более 3 штуки)',
        
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
          
          type: '',
          
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
        type: '',
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
    renderTemplate() {
      
      const template = Handlebars.templates['EventCreateForm.hbs'];
      console.log( template );
      const config = this.config;
      let itemsArray = Object.entries(config);
      let items = itemsArray.map(([key, {tag, text, className, type}], index) => {
        let needPlaceholder = (tag === 'input');
        return {key, tag, text, className, type, needPlaceholder}; 
      });
      console.log(items);
  
      this.form.innerHTML += template({items});

      //const createBtn = document.getElementById('createBtn');
      //createBtn.addEventListener();
      
      return this.form;
    }
  }
  