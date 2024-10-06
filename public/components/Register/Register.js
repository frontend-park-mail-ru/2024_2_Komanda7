export class RegisterForm {

    constructor(formId) {
        this.form = document.createElement('form');
        this.form.id = formId;
    }
    
    config = {
        registerServerError: {
            text: '',
            tag: 'label',
            className: 'error_text',
        },
        registerLabel: {
            text: 'Регистрация',
            tag: 'label',            
        },
        
        registerUsernameEntry: {
            text: 'Имя пользователя',
            tag: 'input',
            type: 'text', 
        },
        registerUsernameError: {
            text: '',
            tag: 'label',
            className: 'error_text',
        },

        registerEmailEntry: {
            text: 'Email',
            tag: 'input',
            
        },

        registerEmailError: {
            text: '',
            tag: 'label',
            className: 'error_text',
        },
    
        registerPasswordEntry: {
            text: 'Пароль',
            tag: 'input',
            type: 'password', 
        },
        registerPasswordError: {
            text: '',
            tag: 'label',
            className: 'error_text',
        },

        registerSubmitBtn: {
            text: 'Зарегистрироваться',
            tag: 'button',
            type: 'submit', 
        },
        
    };
    
    render() {
        //const form = document.createElement('form');

        const config = this.config;

        for (const key in config) {
            const {tag, text, className, type} = config[key];
            const newElement = document.createElement(tag);
            newElement.id = key;

            const textContent = text; 

            switch(tag) {
                case 'input':  
                    newElement.placeholder = textContent;
                    if (config[key].hasOwnProperty('type')) {
                        newElement.type = type; 
                    }
                    break;
                case 'label':
                    newElement.innerText = textContent; 
                    if (config[key].hasOwnProperty('className')) {
                        newElement.classList.add(className);
                    }
                    break;
                case 'button': 
                    newElement.innerText = textContent;
                    newElement.type = type; 
                    break;
            }

            this.form.appendChild(newElement);
        }

        return this.form;
    }
}