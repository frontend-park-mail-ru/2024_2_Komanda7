/**
 * Registration module.
 * 
 * This module handles the registration functionality, including form validation and backend requests.
 * 
 * @module registration
 */
/**
 * Import form validation functions from the FormValidation.js file
 * @import {function} isValidUsername - Checks if a username is valid
 * @import {function} isValidPassword - Checks if a password is valid
 * @import {function} isValidEmail - Checks if an email is valid
 * @import {function} removeDangerous - Removes dangerous characters from a string
 */
import { isValidUsername, isValidPassword, isValidEmail, removeDangerous } from './FormValidation.js';
/**
 * Import the endpoint configuration from the config.js file
 * @import {string} endpoint - The API endpoint URL
 */
import { endpoint } from "../../config.js"
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
const INCORRECT_PASSWORD = 'Пароль должен состоят из букв и цифр';

/**
 * Error message for invalid emails.
 * @constant {string}
 */
const INCORRECT_EMAIL = 'Адрес email должен содержать несколько символов до знака @, один символ @, несколько символов после @, точка, несколько знаков послe точки';

/**
 * Handles the registration form on submission.
 * 
 * This function validates the form data, sends a request to the backend, and handles the response.
 * 
 * @async
 * @function handleRegisterSubmit
 * @param {Event} event - The form submission event.
 * @param {function} setUserLoggedIn - A function to set the user's logged-in state.
 * @param {function} navigate - A function to navigate to a different page.
 */
export async function handleRegisterSubmit(event, setUserLoggedIn, navigate) {
  event.preventDefault();

  // Clear error messages
  document.getElementById('registerUsernameError').innerText = '';
  document.getElementById('registerPasswordError').innerText = '';
  document.getElementById('registerEmailError').innerText = '';
  document.getElementById('registerServerError').innerText = '';

  // Get form data
  const username = removeDangerous(document.getElementById('registerUsernameEntry').value);
  const email = removeDangerous(document.getElementById('registerEmailEntry').value);
  const password = removeDangerous(document.getElementById('registerPasswordEntry').value);
  const image = document.getElementById('imageInput').files[0];

  // Initialize validation flag
  let isValid = true;

  // Validate form data
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

  // If form data is invalid, exit function
  if (!isValid) {
    return;
  }

  try {
    const userData = {
      username: username,
      email: email,
      password: password,
    };
  
    const json = JSON.stringify(userData);
    const formData = new FormData();    
    formData.append('json', json); 
    formData.append('image', image);
    // Send request to backend
    const response = await fetch(`${endpoint}/register`, {
      method: 'POST',
      headers: {
  
      },
      credentials: 'include',
      body: formData,
    });
    // If response is not OK, throw error
    if (!response.ok) {
      throw new Error(data.message);
    }
    const data = await response.json();
    if (data.code) {
        throw new Error(data.message);
    }

    // Set user as logged in and navigate to events page
    setUserLoggedIn(true);
    navigate("/events");

  } catch (error) {
    // Display error message if registration fails
    document.getElementById('registerServerError').innerText = error;
  }
}

/**
 * Handles the registration form on keyup input validation.
 * 
 * This function dynamically checks the input fields for validity and displays error messages accordingly.
 * 
 * @function handleRegisterCheck
 * @param {Event} event - The input event.
 */
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
