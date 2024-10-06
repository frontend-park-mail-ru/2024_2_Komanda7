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
        },
        loginLabel: {
            text: 'Вход',
            tag: 'label',
        },
        loginUsernameEntry: {
            text: 'Имя пользователя',
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
        const password = DOMPurify.sanitize(document.getElementById('loginPasswordEntry').value);

        if (!username || !password) {
            console.log("In form: empty login and password");
            return;
        }

    }

    render() {

        const config = this.config;

        for (const key in config) {
            const { tag, text, className, type } = config[key];
            const newElement = document.createElement(tag);
            newElement.id = key;

            const textContent = text;
            newElement.text = textContent;

            switch (tag) {
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