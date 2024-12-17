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

import { api } from './FrontendAPI.js';
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

export async function loadCategories() {
  const selectElement = document.createElement('select');
  try {
    const request = { headers: {} };
      const response = await api.get('/categories', request);
      const categories = await response.json();

      // Заполнение выпадающего списка
      categories.categories.forEach(category => {
          const option = document.createElement('option');
          option.value = category.id; // id категории
          option.textContent = category.name; // название категории
          selectElement.appendChild(option);
      });
      return selectElement;
  } catch (error) {
      console.error('Ошибка при загрузке категорий:', error);
  }
  return selectElement;
}

export async function loadEvent(eventId) {
  try {
    const request = { headers: {} };
      const response = await api.get(`/events/${eventId}`, request);
      const eventData = await response.json();
      return eventData;
  } catch (error) {
      console.error('Ошибка при загрузке мероприятия:', error);
  }
  return;
}

export async function handleCreateEventEdit(event, id, navigate) {
  event.preventDefault();
  loadCategories();
   // Get form data
   const title = removeDangerous(document.getElementById('eventNameEntry').value);
   const description = removeDangerous(document.getElementById('eventDescriptionEntry').value);
   const tag = Array.from(document.getElementById('eventTagEntry').value.split(' '), (tag) => removeDangerous(tag));
   const dateStart = removeDangerous(document.getElementById('eventBeginEntry').value) + ':00Z';       
   const dateEnd = removeDangerous(document.getElementById('eventEndEntry').value) + ':00Z';
   const categoryId = Number(removeDangerous(document.getElementById('categoriesInput').value));
   
   const latitude = removeDangerous(document.getElementById('latitude').value);
   const longitude = removeDangerous(document.getElementById('longitude').value);
   const image = document.getElementById('imageInput').files[0];
  try {
    // Send request to backend
    const userData = {
      title: title,
      description: description,
      tag: tag,
      event_start: dateStart,
      event_end: dateEnd,
      category_id: categoryId,
      Latitude: +latitude,
      Longitude: +longitude,
      };
    const json = JSON.stringify(userData);
    const formData = new FormData();
    formData.append('json', json); 
    formData.append('image', image);
    const body = formData;
    const request = {
        headers: {
      
        },
        credentials: 'include',
        body: body,
      };
    const path = `/events/${id}`;
    const response = await api.put(path, request);
    // If response is not OK, throw error
    if (!response.ok) {
      throw new Error(data.message);
    }
    const data = await response.json();
    if (data.code) {
        throw new Error(data.message);
    }
    // Navigate to page
    const pageToCome = `../${id}`;
    navigate(pageToCome);

  } catch (error) {
    // Display error message if registration fails
    document.getElementById('eventServerError').innerText = error;
  } 
    //navigate(pageToCome); //debug
}

export async function handleCreateEventSubmit(event, pageToCome, navigate) {
  event.preventDefault();
  loadCategories();
   // Get form data
    const title = removeDangerous(document.getElementById('eventNameEntry').value);
    const description = removeDangerous(document.getElementById('eventDescriptionEntry').value);
    const tag = Array.from(document.getElementById('eventTagEntry').value.split(' '), (tag) => removeDangerous(tag));
    const dateStart = removeDangerous(document.getElementById('eventBeginEntry').value) + ':00Z';       
    const dateEnd = removeDangerous(document.getElementById('eventEndEntry').value) + ':00Z';
    let categoryId = Number(removeDangerous(document.getElementById('categoriesInput').value));
    console.log(categoryId);
    categoryId = 1;
    const image = document.getElementById('imageInput').files[0];
    
    const latitude = removeDangerous(document.getElementById('latitude').value);
    const longitude = removeDangerous(document.getElementById('longitude').value);

  try {
    // Send request to backend
    const userData = {
      title: title,
      description: description,
      tag: tag,
      event_start: dateStart,
      event_end: dateEnd,
      category_id: categoryId,
      Latitude: +latitude,
      Longitude: +longitude,
      };
  
    const json = JSON.stringify(userData);
    const formData = new FormData();    
    formData.append('json', json); 
    formData.append('image', image);
    const body = formData;
    const request = {
        headers: {
      
        },
        credentials: 'include',
        body: body,
      };
    const path = '/events';
    const response = await api.post(path, request);
    
    // If response is not OK, throw error
    if (!response.ok) {
      throw new Error(data.message);
    }
    const data = await response.json();
    if (data.code) {
        throw new Error(data.message);
    }
    // Navigate to page
    navigate(pageToCome);

  } catch (error) {
    // Display error message if registration fails
    document.getElementById('eventServerError').innerText = error;
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
export function handleCreateEventCheck(event) {
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
