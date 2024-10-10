import { isValidUsername, isValidPassword, isValidEmail, removeDangerous } from './FormValidation.js';
import { endpoint } from "../config.js";

const EMPTY_FIELD = 'Это обязательное поле';
const INCORRECT_USERNAME = 'Логин может состоять из латинских букв, цифр и знаков _ и быть в длину не более 15 символов'
const INCORRECT_PASSWORD = 'Пароль должен состоят из букв и цифр';
const INCORRECT_EMAIL = 'Адрес email должен содержать несколько символов до знака @, один символ @, несколько символов после @, точка, несколько знаков послe точки';

export async function handleRegisterSubmit(event, setUserLoggedIn, navigate) {
    event.preventDefault();

    document.getElementById('registerUsernameError').innerText = '';
    document.getElementById('registerPasswordError').innerText = '';
    document.getElementById('registerEmailError').innerText = '';
    document.getElementById('registerServerError').innerText = '';

    const username = removeDangerous(document.getElementById('registerUsernameEntry').value);
    const email = removeDangerous(document.getElementById('registerEmailEntry').value);
    const password = removeDangerous(document.getElementById('registerPasswordEntry').value);

    let isValid = true;

    if (!username) {
        document.getElementById('registerUsernameError').innerText = EMPTY_FIELD;
        isValid = false;
    }

    if (!isValidUsername(username)) {
        document.getElementById('registerUsernameError').innerText = INCORRECT_USERNAME;
        isValid = false;
    }

    if (!isValidEmail(email)) {
        document.getElementById('registerEmailError').innerText = INCORRECT_EMAIL;
        isValid = false;
    }

    if (!isValidPassword(password)) {
        document.getElementById('registerPasswordError').innerText = INCORRECT_PASSWORD;
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    try {
        const response = await fetch(`${endpoint}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        setUserLoggedIn(true);
        navigate("/events");

    } catch (error) {
        document.getElementById('registerServerError').innerText = 'Пользователь с такими данными уже существует';
    }
}

export function handleRegisterCheck(event) {
    const target = event.target;
    const id = target.id;
    if (id === 'registerUsernameEntry') {
        const username = removeDangerous(target.value);
        if (!username) {
          document.getElementById('registerUsernameError').innerText = EMPTY_FIELD;
        } else if (!isValidUsername(username)) {
          document.getElementById('registerUsernameError').innerText = INCORRECT_USERNAME;
        } else {
          document.getElementById('registerUsernameError').innerText = '';
        }
      } else if (id === 'registerEmailEntry') {
        const email = removeDangerous(target.value);
        if (!email) {
          document.getElementById('registerEmailError').innerText = EMPTY_FIELD;
        } else if (!isValidEmail(email)) {
          document.getElementById('registerEmailError').innerText = INCORRECT_EMAIL;
        } else {
          document.getElementById('registerEmailError').innerText = '';
        }
      } else if (id === 'registerPasswordEntry') {
        const password = removeDangerous(target.value);
        if (!password) {
          document.getElementById('registerPasswordError').innerText = EMPTY_FIELD;
        } else if (!isValidPassword(password)) {
          document.getElementById('registerPasswordError').innerText = INCORRECT_PASSWORD;
        } else {
          document.getElementById('registerPasswordError').innerText = '';
        }
      }
}