export class LoginForm {
    
    loginContent = {
        loginLabel: {
            text: 'Вход',
            tag: 'label',            
        },
        usernameEntry: {
            text: 'Email',
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
            type: 'submit', 
        },
    };
    
    renderLogin() {
        const form = document.createElement('form');
        const bigObj = this.loginContent;

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