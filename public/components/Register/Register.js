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