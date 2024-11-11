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
import { navigate } from "../../modules/router.js";
/**
 * Import the endpoint configuration from the config.js file
 * @import {string} endpoint - The API endpoint URL
 */
import { endpoint } from "../../config.js"

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
  //console.log(selectElement);
  try {
    const request = { headers: {} };

      const response = await api.get('/categories', request);
      const categories = await response.json();

      //console.log(categories);

      // Заполнение выпадающего списка
      categories.forEach(category => {
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


export async function handleCreateEventEdit(event, pageToCome, navigate) {
  event.preventDefault();
  loadCategories();
   // Get form data
   const title = removeDangerous(document.getElementById('eventNameEntry').value);
   const description = removeDangerous(document.getElementById('eventDescriptionEntry').value);
   const tags = removeDangerous(document.getElementById('eventTagsEntry').value).split();
   const dateStart = removeDangerous(document.getElementById('eventBeginEntry').value) + ':00Z';       
   const dateEnd = removeDangerous(document.getElementById('eventEndEntry').value) + ':00Z';

   const categoryId = Number(removeDangerous(document.getElementById('categoriesInput').value));
   
   const image = document.getElementById('imageInput').files[0];
   console.log(title, description, tags, dateStart, dateEnd, image, categoryId);
  /*
  // Clear error messages
  document.getElementById('registerUsernameError').innerText = '';
  document.getElementById('registerPasswordError').innerText = '';
  document.getElementById('registerEmailError').innerText = '';
  document.getElementById('registerServerError').innerText = '';

  // Get form data
  const username = removeDangerous(document.getElementById('registerUsernameEntry').value);
  const email = removeDangerous(document.getElementById('registerEmailEntry').value);
  const password = removeDangerous(document.getElementById('registerPasswordEntry').value);

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
    */
  try {
    // Send request to backend
    const userData = {
      title: title,
      description: description,
      tags: tags,
      event_start: dateStart,
      event_end: dateEnd,
      category_id: categoryId,
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
    navigate(pageToCome);

  } catch (error) {
    // Display error message if registration fails
    document.getElementById('eventServerError').innerText = error;
  } 
    //navigate(pageToCome); //debug
}

export async function handleCreateEventSubmit(event, pageToCome, navigate) {


  event.preventDefault();

   // Get form data
   const title = removeDangerous(document.getElementById('eventNameEntry').value);
   const description = removeDangerous(document.getElementById('eventDescriptionEntry').value);
   const tags = removeDangerous(document.getElementById('eventTagsEntry').value).split();
   const dateStart = removeDangerous(document.getElementById('eventBeginEntry').value) + ':00Z';       
   const dateEnd = removeDangerous(document.getElementById('eventEndEntry').value) + ':00Z';

   const categoryId = Number(removeDangerous(document.getElementById('categoriesInput').value));
   
   const image = document.getElementById('imageInput').files[0];
   console.log(title, description, tags, dateStart, dateEnd, image, categoryId);
   
  try {
    // Send request to backend
    const userData = {
      title: title,
      description: description,
      tags: tags,
      event_start: dateStart,
      event_end: dateEnd,
      category_id: categoryId,
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
    //navigate(pageToCome); //debug
}

export async function handleCreateEventSubmit(event, pageToCome, navigate) {
  event.preventDefault();

   // Get form data
   const title = removeDangerous(document.getElementById('eventNameEntry').value);
   const description = removeDangerous(document.getElementById('eventDescriptionEntry').value);
   const tags = removeDangerous(document.getElementById('eventTagsEntry').value).split();
   const dateStart = removeDangerous(document.getElementById('eventBeginEntry').value) + ':00Z';       
   const dateEnd = removeDangerous(document.getElementById('eventEndEntry').value) + ':00Z';

   const categoryId = Number(removeDangerous(document.getElementById('categoriesInput').value));
   
   const image = document.getElementById('imageInput').files[0];
   console.log(title, description, tags, dateStart, dateEnd, image, categoryId);
   
  try {
    // Send request to backend
    const userData = {
      title: title,
      description: description,
      tags: tags,
      event_start: dateStart,
      event_end: dateEnd,
      category_id: categoryId,
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

