import Handlebars from 'handlebars';
import template from './Register.hbs';
import defaultAvatar from '../../assets/images/default_avatar.png';

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
        registerPasswordRepeatEntry: {
          /**
           * Input placeholder text
           */
          text: 'Повторите пароль',
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
         * Avatar upload label
         */
        avatarUploadLabel: {
          /**
           * Label text
           */
          text: 'Загрузить аватар',
          /**
           * HTML tag for label element
           */
          tag: 'label',
          /**
           * CSS class for label element
           */
          className: 'avatar_upload_label',
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

        const avatarImg = document.createElement('img');
        avatarImg.id = 'avatarImage';
        avatarImg.className = 'avatarImage';
        avatarImg.src = defaultAvatar;
        avatarImg.alt = 'Avatar';
        avatarImg.style.borderRadius = '50%';
        avatarImg.style.objectFit = 'cover';

        this.form.innerHTML += template({items});
        this.form.insertBefore(avatarImg, this.form.querySelector('#registerSubmitBtn'));

        const imageInputElement = document.createElement('input');
        imageInputElement.id = 'imageInput';
        imageInputElement.type = 'file';
        imageInputElement.accept = 'image/png, image/jpeg';
        imageInputElement.className = '';
        imageInputElement.addEventListener('change', this.updateAvatarImage.bind(this));
        this.form.insertBefore(imageInputElement, this.form.querySelector('#registerSubmitBtn'));
        return this.form;
    }

    /**
     * Обновляет изображение аватара при изменении входного изображения.
     * 
     * @param {Event} event - Событие изменения входного изображения.
     */
    updateAvatarImage(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const avatarImg = document.getElementById('avatarImage');
                if (avatarImg) {
                    avatarImg.src = e.target.result;
                }
            };
            reader.readAsDataURL(file);
        }
    }
}