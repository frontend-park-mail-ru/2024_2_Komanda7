import Handlebars from 'handlebars';
import template from './Register.hbs';

/**
 * Represents a register form.
 * 
 * @class RegisterForm
 * @export
 */
export class RegisterForm {

    /**
     * Creates a new instance of RegisterForm.
     * 
     * @param {string} formId - The ID of the form.
     */
    constructor(formId) {
        /**
         * The form element.
         * @type {HTMLFormElement}
         */
        this.form = document.createElement('form');
        this.form.id = formId;
    }
    
    config = {
        /**
         * Server error configuration
         */
        registerServerError: {
          /**
           * Error text
           */
          text: '',
          /**
           * HTML tag for error element
           */
          tag: 'label',
          /**
           * CSS class for error element
           */
          className: 'error_text',
          /**
           * Type of error element
           */
          type: '', 
        },
        /**
         * Registration label configuration
         */
        registerLabel: {
          /**
           * Label text
           */
          text: 'Регистрация',
          /**
           * HTML tag for label element
           */
          tag: 'label',   
          /**
           * CSS class for label element
           */
          className: '',         
          /**
           * Type of label element
           */
          type: '', 
        },
        
        /**
         * Username input configuration
         */
        registerUsernameEntry: {
          /**
           * Input placeholder text
           */
          text: 'Имя пользователя',
          /**
           * HTML tag for input element
           */
          tag: 'input',
          /**
           * Type of input element
           */
          type: 'text', 
          /**
           * CSS class for input element
           */
          className: '',
        },
        /**
         * Username error configuration
         */
        registerUsernameError: {
          /**
           * Error text
           */
          text: '',
          /**
           * HTML tag for error element
           */
          tag: 'label',
          /**
           * CSS class for error element
           */
          className: 'error_text',
          /**
           * Type of error element
           */
          type: '', 
        },
      
        /**
         * Email input configuration
         */
        registerEmailEntry: {
          /**
           * Input placeholder text
           */
          text: 'Email',
          /**
           * HTML tag for input element
           */
          tag: 'input',
          /**
           * CSS class for input element
           */
          className: '',
          /**
           * Type of input element
           */
          type: '', 
                  
        },
      
        /**
         * Email error configuration
         */
        registerEmailError: {
          /**
           * Error text
           */
          text: '',
          /**
           * HTML tag for error element
           */
          tag: 'label',
          /**
           * CSS class for error element
           */
          className: 'error_text',
          /**
           * Type of error element
           */
          type: '', 
        },
        
        /**
         * Password input configuration
         */
        registerPasswordEntry: {
          /**
           * Input placeholder text
           */
          text: 'Пароль',
          /**
           * HTML tag for input element
           */
          tag: 'input',
          /**
           * Type of input element
           */
          type: 'password', 
          /**
           * CSS class for input element
           */
          className: '',
        },
        /**
         * Password error configuration
         */
        registerPasswordError: {
          /**
           * Error text
           */
          text: '',
          /**
           * HTML tag for error element
           */
          tag: 'label',
          /**
           * CSS class for error element
           */
          className: 'error_text',
          /**
           * Type of error element
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
      
        /**
         * Submit button configuration
         */
        registerSubmitBtn: {
          /**
           * Button text
           */
          text: 'Зарегистрироваться',
          /**
           * HTML tag for button element
           */
          tag: 'button',
          /**
           * Type of button element
           */
          type: 'submit', 
          /**
           * CSS class for button element
           */
          className: '',
          /**
           * Type of button element ( duplicate property )
           */
          type: '', 
        },
              
      }
  
    /**
     * Renders the form template.
     * 
     * @returns {HTMLFormElement} The rendered form.
     */
    renderTemplate() {
        const config = this.config;
        const fields = Object.entries(config);
        const items = fields.map(([key, {tag, text, className, type}], index) => {
            
            let needPlaceholder = tag === 'input';
            return {key, tag, text, className, type, needPlaceholder};
        });

        this.form.innerHTML += template({items});
        
        return this.form;
    }
}