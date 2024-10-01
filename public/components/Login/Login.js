export class LoginForm {

    constructor(formId) {
        this.form = document.createElement('form');
        this.form.id = formId;
    }
    
    config = {
        loginLabel: {
            text: 'Вход',
            tag: 'label',            
        },
        loginEmailEntry: {
            text: 'username',
            tag: 'input',
            errorText: "Incorrect login"
        },
        loginPasswordEntry: {
            text: 'Пароль',
            tag: 'input',
            type: 'password', 
        },
        loginErrorText: {
            text: '',
            tag: 'label',
        },
        submitBtn: {
            text: 'Войти',
            tag: 'button',
            type: 'submit', 
        },
    };

    
    render() {
        
        const bigObj = this.config;

        for (const key in bigObj) {
            const tag = bigObj[key]['tag'];
            const newElement = document.createElement(tag);
            newElement.id = key;

            const textContent = bigObj[key]['text']; 

            switch(tag) {
                case 'input':  
                    newElement.placeholder = textContent;
                    if (bigObj[key].hasOwnProperty('type')) {
                        newElement.type = bigObj[key]['type']; 
                    }
                    break;
                case 'label':
                case 'button': 
                    newElement.innerText = textContent; 
                    if (tag === 'button') {
                        newElement.type = bigObj[key]['type']; 
                    }
                    break;
            }

            this.form.appendChild(newElement);
        }

        return this.form;
    }


    
}