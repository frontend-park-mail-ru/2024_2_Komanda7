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
            type: '', 
        },
        registerLabel: {
            text: 'Регистрация',
            tag: 'label',   
            className: '',         
            type: '', 
        },
        
        registerUsernameEntry: {
            text: 'Имя пользователя',
            tag: 'input',
            type: 'text', 
            className: '',
        },
        registerUsernameError: {
            text: '',
            tag: 'label',
            className: 'error_text',
            type: '', 
        },

        registerEmailEntry: {
            text: 'Email',
            tag: 'input',
            className: '',
            type: '', 
            
        },

        registerEmailError: {
            text: '',
            tag: 'label',
            className: 'error_text',
            type: '', 
        },
    
        registerPasswordEntry: {
            text: 'Пароль',
            tag: 'input',
            type: 'password', 
            className: '',
        },
        registerPasswordError: {
            text: '',
            tag: 'label',
            className: 'error_text',
            type: '', 
        },

        registerSubmitBtn: {
            text: 'Зарегистрироваться',
            tag: 'button',
            type: 'submit', 
            className: '',
            type: '', 
        },
        
    };
    
    render() {

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
    }

    renderTemplate() {
        const template = Handlebars.templates['Register.hbs'];
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