export class LoginForm {

    constructor(formId) {
        this.form = document.createElement('form');
        this.form.id = formId;
    }
    
    config = {
        loginServerError: {
            text: '',
            tag: 'label',
            className: 'error_text',
            type: '', 
        },
        loginLabel: {
            text: 'Вход',
            tag: 'label',   
            className: '',         
            type: '', 
        },
        
        loginUsernameEntry: {
            text: 'Имя пользователя',
            tag: 'input',
            type: 'text', 
            className: '',
        },
        loginUsernameError: {
            text: '',
            tag: 'label',
            className: 'error_text',
            type: '', 
        },
    
        loginPasswordEntry: {
            text: 'Пароль',
            tag: 'input',
            type: 'password', 
            className: '',
        },
        loginPasswordError: {
            text: '',
            tag: 'label',
            className: 'error_text',
            type: '', 
        },

        loginSubmitBtn: {
            text: 'Войти',
            tag: 'button',
            type: 'submit', 
            className: '',
            type: '', 
        },
        
    };

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