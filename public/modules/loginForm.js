import { isValidUsername, isValidPassword, removeDangerous } from './FormValidation.js';
import { endpoint } from "../config.js";

const EMPTY_FIELD = 'Это обязательное поле';
const INCORRECT_USERNAME = 'Логин может состоять из латинских букв, цифр и знаков _ и быть в длину не более 15 символов'
const INCORRECT_PASSWORD = 'Пароль должен состоят из букв и цифр';

export async function handleLoginSubmit(event, setUserLoggedIn, navigate) {
    event.preventDefault();

    document.getElementById('loginUsernameError').innerText = '';
    document.getElementById('loginPasswordError').innerText = '';
    document.getElementById('loginServerError').innerText = '';

    const username = removeDangerous(document.getElementById('loginUsernameEntry').value);
    const password = removeDangerous(document.getElementById('loginPasswordEntry').value);

    if (!username) {
        document.getElementById('loginUsernameError').innerText = EMPTY_FIELD;
        if (!password) {
            document.getElementById('loginPasswordError').innerText = EMPTY_FIELD;
        }
        return;
    }

    if (!isValidUsername(username)) {
        document.getElementById('loginUsernameError').innerText = INCORRECT_USERNAME;
        return;
    }

    if (!isValidPassword(password)) {
        document.getElementById('loginPasswordError').innerText = INCORRECT_PASSWORD;
        return;
    }

    try {
        //backend request
        const response = await fetch(`${endpoint}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
            credentials: 'include',
        });
        const clonedResponse = response.clone();
        const errorText = await response.text();
        if (errorText === "Alredy logged in") {
            setuserIsLoggedIn(true);
        }

        const data = await clonedResponse.json()
            //document.getElementById('response').innerText = data.message;
        console.log(response.ok)
        if (!response.ok) {
            throw new Error(data.message);
        } else {
            if (data.code == 401){
            throw new Error(data.message);
            }
            setUserLoggedIn(true);
            //document.getElementById('response').innerText = "Вход выполнен";
            navigate("events");
        }
    } catch (error) {
        console.log(error)
        document.getElementById('loginServerError').innerText = 'Неверный логин или пароль';
    }
}
