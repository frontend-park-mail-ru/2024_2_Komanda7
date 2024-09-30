export class RegisterForm {
    
    config = {
    
        registerLabel: {
            text: 'Регистрация',
            tag: 'label',            
        },
    
        usernameEntry: {
            text: 'Имя',
            tag: 'input',
            type: 'text', 
        },

        registerEmailEntry: {
            text: 'Email',
            tag: 'input',
            type: 'email', 
        },
    
        registerPasswordEntry: {
            text: 'Пароль',
            tag: 'input',
            type: 'password', 
        },

        registerSubmitBtn: {
            text: 'Зарегистрироваться',
            tag: 'button',
            type: 'submit', 
        },
        
    };
    
    render(formName) {
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