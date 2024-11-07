/**
 * Import the endpoint configuration from the config.js file
 * @import {string} endpoint - The API endpoint URL
 */
import { endpoint } from "../../config.js"
/**
 * Header module.
 * 
 * This module provides a class to render a header element.
 * 
 * @module header
 */

/**
 * Header class.
 * 
 * This class is responsible for rendering a header element.
 * 
 * @class Header
 */
export class Header {
    /**
     * Renders the header element.
     * 
     * This method creates a header element and appends various child elements to it, including a logo, searchbar, and buttons.
     * 
     * @method renderHeader
     * @param {boolean} userIsLoggedIn - Whether the user is logged in or not.
     * @param {function} logout - The logout function to be called when the logout button is clicked.
     * @param {function} navigate - The navigate function to be used for navigation.
     * @returns {HTMLElement} The header element.
     */
    renderHeader(userIsLoggedIn, logout, navigate) {
      /**
       * The header element.
       * 
       * @type {HTMLElement}
       */
      const headerElement = document.createElement('header');
      this.headerElement = headerElement;
  
      /**
       * The logo element.
       * 
       * @type {HTMLElement}
       */
      const logo = document.createElement('a');
      logo.className = 'logo';
      logo.textContent = 'Выходной';
      logo.href = '/events';
      headerElement.appendChild(logo);
  
      /**
       * The searchbar element.
       * 
       * @type {HTMLInputElement}
       */
      const searchbar = document.createElement('input');
      searchbar.type = 'search';
      searchbar.className = 'searchbar';
      searchbar.placeholder = 'Найти событие';
      // Add event listener to detect Enter key press
      searchbar.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') { // Check if the pressed key is Enter
            event.preventDefault();
            const searchQuery = searchbar.value;
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
      });
      headerElement.appendChild(searchbar);
      headerElement.appendChild(searchbar);
  
      /**
       * The buttons container element.
       * 
       * @type {HTMLElement}
       */
      const buttons = document.createElement('div');
      buttons.className = "buttons";
  
      if (!userIsLoggedIn) {
        //User  is not logged in
        /**
         * The login button element.
         * 
         * @type {HTMLButtonElement}
         */
        const btnLogin = document.createElement('button');
        btnLogin.addEventListener('click', () => navigate("/login"));
        btnLogin.className = "btnLogin";
        btnLogin.textContent = "Войти";
        buttons.appendChild(btnLogin);
  
        /**
         * The register button element.
         * 
         * @type {HTMLButtonElement}
         */
        const btnRegister = document.createElement('button');
        btnRegister.addEventListener('click', (event) => {
          event.preventDefault();
          const path = '/signup';
          navigate(path);
        });
        btnRegister.className = "btnRegister";
        btnRegister.textContent = "Зарегистрироваться";
        buttons.appendChild(btnRegister);
      } 
      if (userIsLoggedIn) {
        //User  is logged in
        /**
         * The profile link element.
         * 
         * @type {HTMLElement}
         */
        const profileLink = document.createElement('a');
        profileLink.href = '/profile';
        const avatarImage = document.createElement('img');
        avatarImage.src = '/static/images/myavatar.png';
        avatarImage.onerror = function() {
          this.src = "/static/images/default_avatar.png";
          this.style.objectFit = 'fill';
        };
        avatarImage.alt = 'Avatar';
        avatarImage.className = 'avatar';
        profileLink.appendChild(avatarImage);
        buttons.appendChild(profileLink);

        const btnMyEvents = document.createElement('button');
        btnMyEvents.textContent = 'Мои мероприятия';
        btnMyEvents.addEventListener('click', (event) => {
          event.preventDefault();
          const path = '/my_events';
          navigate(path);
        });
  
        /**
         * The logout button element.
         * 
         * @type {HTMLButtonElement}
         */
        const logoutButton = document.createElement('button');
        logoutButton.textContent = 'Выйти';
        logoutButton.onclick = async() => {
          try {
            const response = await fetch(`${endpoint}/logout`, {
              method: "POST",
              headers: { 'Content-Type': 'application/json' },
              credentials: "include"
            });
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            logout();
          } catch (error) {
            console.error(error);
          }
        };
        buttons.appendChild(btnMyEvents);
        buttons.appendChild(logoutButton);
      }
  
      headerElement.appendChild(buttons);
      return headerElement;
    }
  }
  