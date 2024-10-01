export class LoginForm {

    constructor(formId) {
        this.form = document.createElement('form');
        this.form.id = formId;
    }
    
    config = {
        EmptyLoginError: {
            text: '',
            tag: 'label',
            className: 'error_text',
        },
        loginLabel: {
            text: 'Вход',
            tag: 'label',            
        },
        loginUsernameEntry: {
            text: 'username',
            tag: 'input', 
        },
        loginUsernameError: {
            text: '',
            tag: 'label',
            className: 'error_text',
        },
        loginPasswordEntry: {
            text: 'Пароль',
            tag: 'input',
            type: 'password', 
        },
        loginPasswordError: {
            text: '',
            tag: 'label',
            className: 'error_text',
        },
        submitBtn: {
            text: 'Войти',
            tag: 'button',
            type: 'submit', 
        },
    };

    checkValues() {
        const username = DOMPurify.sanitize(document.getElementById('loginEmailEntry').value);
      const password = DOMPurify.sanitize(document.getElementById('loginPasswordEntry').value);//DOMPurify.sanitize(document.getElementById('passwordEntry').value);


      if (!username || !password) {
        console.log("In form: empty login and password");
        return;
      }

    }

    
    render() {
        
        const bigObj = this.config;

        for (const key in bigObj) {
            const tag = bigObj[key]['tag'];
            const newElement = document.createElement(tag);
            newElement.id = key;

            const textContent = bigObj[key]['text']; 
            newElement.text = textContent;

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



            this.form.appendChild(newElement);
        }

        

        return this.form;
    }    
}