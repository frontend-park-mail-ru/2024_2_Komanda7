/**
 * LoginForm class
 */
export class LoginForm {
    /**
     * Creates a new LoginForm instance
     * @param {string} formId - The ID of the form
     */
    constructor(formId) {
      /**
       * The form element
       * @type {HTMLFormElement}
       */
      this.form = document.createElement('form');
      this.form.id = formId;
    }
  
    /**
     * Configuration object for the form
     * @type {Object}
     */
    config = {
      /**
       * Login server error configuration
       * @type {Object}
       */
      loginServerError: {
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
      /**
       * Login label configuration
       * @type {Object}
       */
      loginLabel: {
        /**
         * Text
         * @type {string}
         */
        text: 'Вход',
        /**
         * Tag type
         * @type {string}
         */
        tag: 'label',
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
      /**
       * Login username entry configuration
       * @type {Object}
       */
      loginUsernameEntry: {
        /**
         * Text
         * @type {string}
         */
        text: 'Имя пользователя',
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
      /**
       * Login username error configuration
       * @type {Object}
       */
      loginUsernameError: {
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
      /**
       * Login password entry configuration
       * @type {Object}
       */
      loginPasswordEntry: {
        /**
         * Text
         * @type {string}
         */
        text: 'Пароль',
        /**
         * Tag type
         * @type {string}
         */
        tag: 'input',
        /**
         * Type
         * @type {string}
         */
        type: 'password',
        /**
         * Class name
         * @type {string}
         */
        className: '',
      },
      /**
       * Login password error configuration
       * @type {Object}
       */
      loginPasswordError: {
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
      /**
       * Login submit button configuration
       * @type {Object}
       */
      loginSubmitBtn: {
        /**
         * Text
         * @type {string}
         */
        text: 'Войти',
        /**
         * Tag type
         * @type {string}
         */
        tag: 'button',
        /**
         * Type
         * @type {string}
         */
        type: 'submit',
        /**
         * Class name
         * @type {string}
         */
        className: '',
      },
    };
  
    /**
     * Renders the form template
     * @returns {HTMLFormElement} The rendered form
     */
    renderTemplate() {
      const template = Handlebars.templates['Login.hbs'];
      const config = this.config;
      let itemss = Object.entries(config);
      let items = itemss.map(([key, {tag, text, className, type}], index) => {
        let needPlaceholder = (tag === 'input');
        return {key, tag, text, className, type, needPlaceholder};
      });
  
      this.form.innerHTML += template({items});
      
      return this.form;
    }
  }
  