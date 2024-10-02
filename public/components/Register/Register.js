export class RegisterForm {

    constructor(formId) {
        this.form = document.createElement('form');
        this.form.id = formId;
    }
    
    config = {
        regusterServerError: {
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
        const form = document.createElement('form');
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
                newElement.innerText = textContent; 
                if (bigObj[key].hasOwnProperty('className')) {
                    newElement.classList.add(bigObj[key]['className']);

                }
                break;
            case 'button': 
                newElement.innerText = textContent; 
                if (tag === 'button') {
                    newElement.type = bigObj[key]['type']; 
                }
                break;
          }

          form.appendChild(newElement);
        }

        return form;
    }
}