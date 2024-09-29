export class LoginForm {
    
    loginContent = {
    
        loginLabel: {
            text: 'Вход',
            tag: 'label',            
        },
    
        usernameEntry: {
            text: 'Имя',
            tag: 'input',
        },
    
        passwordEntry: {
            text: 'Пароль',
            tag: 'input',
            type: 'password', 
        },

        submitBtn: {
            text: 'Войти',
            tag: 'button',
        },
        
    };
    
    renderLogin() {
        const form = document.createElement('form');

        const bigObj = this.loginContent;
    
        for (const key in bigObj) {
          const tag = bigObj[key]['tag'];
          const newElement = document.createElement(tag);
          newElement.id = key;

          switch (tag) {
            case 'input':  
                newElement.placeholder = bigObj[key]['text'];
                if (bigObj[key].hasOwnProperty('type')) {
                    newElement.type = bigObj[key]['type']; 
                }
                break;
            case 'label':
                newElement.innerText = bigObj[key]['text'];
                break;
            case 'button': 
                newElement.innerText = bigObj[key]['text'];
                break;
          }

          form.appendChild(newElement);
        }

        return form;
    }
}
