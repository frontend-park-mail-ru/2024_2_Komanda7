/**
 * Login form module.
 * 
 * This module handles the login functionality, including form validation and backend requests.
 * 
 * @module login
 */

import { isValidUsername, isValidPassword, removeDangerous } from './FormValidation.js';
import { endpoint } from "../config.js";

/**
 * Error message for empty fields.
 * @constant {string}
 */
const EMPTY_FIELD = 'Это обязательное поле';

/**
 * Error message for invalid usernames.
 * @constant {string}
 */
const INCORRECT_USERNAME = 'Логин может состоять из латинских букв, цифр и знаков _ и быть в длину не более 15 символов';

/**
 * Error message for invalid passwords.
 * @constant {string}
 */
const INCORRECT_PASSWORD = 'Пароль должен состоять из букв и цифр';

/**
 * Handles the login form submission.
 * 
 * This function validates the form data, sends a request to the backend, and handles the response.
 * 
 * @async
 * @function handleLoginSubmit
 * @param {Event} event - The form submission event.
 * @param {function} setUserLoggedIn - A function to set the user's logged-in state.
 * @param {function} navigate - A function to navigate to a different page.
 */
export async function handleLoginSubmit(event, setUserLoggedIn, navigate) {
  event.preventDefault();

  // Clear error messages
  document.getElementById('loginUsernameError').innerText = '';
  document.getElementById('loginPasswordError').innerText = '';
  document.getElementById('loginServerError').innerText = '';

  // Get form data
  const username = removeDangerous(document.getElementById('loginUsernameEntry').value);
  const password = removeDangerous(document.getElementById('loginPasswordEntry').value);

  // Validate form data
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
    // Send request to backend
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
      setUserLoggedIn(true);
    }

    const data = await clonedResponse.json()
    console.log(response.ok)
    if (!response.ok) {
      throw new Error(data.message);
    } else {
      setUserLoggedIn(true);
      navigate("events");
    }
  } catch (error) {
    console.log(error)
    document.getElementById('loginServerError').innerText = 'Неверный логин или пароль';
  }
}

/**
 * Handles the login form on keyup input validation.
 * 
 * This function dynamically checks the input fields for validity and displays error messages accordingly.
 * 
 * @function handleLoginCheck
 * @param {Event} event - The input event.
 */
export function handleLoginCheck(event) {
  const target = event.target;
  const id = target.id;

  if (id === 'loginUsernameEntry') {
    const username = removeDangerous(target.value);
    if (!username) {
      document.getElementById('loginUsernameError').innerText = EMPTY_FIELD;
    } else if (!isValidUsername(username)) {
      document.getElementById('loginUsernameError').innerText = INCORRECT_USERNAME;
    } else {
      document.getElementById('loginUsernameError').innerText = '';
    }
  } else if (id === 'loginPasswordEntry') {
    const password = removeDangerous(target.value);
    if (!password) {
      document.getElementById('loginPasswordError').innerText = EMPTY_FIELD;
    } else if (!isValidPassword(password)) {
      document.getElementById('loginPasswordError').innerText = INCORRECT_PASSWORD;
    } else {
      document.getElementById('loginPasswordError').innerText = '';
    }
  }
}
