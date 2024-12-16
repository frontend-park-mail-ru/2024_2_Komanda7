/**
 * Import the endpoint configuration from the config.js file
 * @import {string} endpoint - The API endpoint URL
 */
import { endpoint } from "../../config.js"
import { api } from '../../modules/FrontendAPI.js';
import { navigate } from '../../modules/router.js';
import defaultAvatar from '../../assets/images/default_avatar.png';
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
     * @param {function} navigate - The navigate function to be used for navigation.
     * @returns {HTMLElement} The header element.
     */
    renderHeader(userIsLoggedIn, navigate) {
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

        this.fetchProfilePic().then(profilePic => {
          if (profilePic) {
            avatarImage.src = endpoint + '/' + profilePic.image;
          }
        })

        avatarImage.onerror = function() {
          this.src = defaultAvatar;
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
          const path = '/events/my';
          navigate(path);
        });
  
        buttons.appendChild(btnMyEvents);

        const btnMySubs = document.createElement('button');
        btnMySubs.textContent = 'Подписки';
        btnMySubs.addEventListener('click', (event) => {
          event.preventDefault();
          const path = '/events/subscription';
          navigate(path);
        });

        buttons.appendChild(btnMySubs);

        const btnMyFavorites = document.createElement('button');
        btnMyFavorites.textContent = 'Избранные';
        btnMyFavorites.addEventListener('click', (event) => {
          event.preventDefault();
          const path = '/events/favorites';
          navigate(path);
        });
  
        buttons.appendChild(btnMyFavorites);
  
      const notificationsContainer = document.createElement('div');
      notificationsContainer.className = 'notifications-container';
      notificationsContainer.style.display = 'none';
      buttons.appendChild(notificationsContainer);

      const btnNotifications = document.createElement('button');
      btnNotifications.textContent = 'Уведомления';
      btnNotifications.addEventListener('click', (event) => {
          event.preventDefault();
          // Переключаем видимость контейнера
          if (notificationsContainer.style.display === 'none') {
              notificationsContainer.style.display = 'block';
              this.loadNotifications(notificationsContainer); // Убедитесь, что функция вызывается
          } else {
              notificationsContainer.style.display = 'none';
          }
      });

      buttons.appendChild(btnNotifications);
      headerElement.appendChild(notificationsContainer);
      }
      headerElement.appendChild(buttons);
      
      return headerElement;
    }
    async fetchProfilePic() {
      try {
          const request = {
              headers: {

              },
              credentials: 'include',
          };
          const response = await api.get('/session', request);

          if (!response.ok) {
              throw new Error('Failed to fetch profile data');
          }
          const data = await response.json()
          return data.user;
      } catch (error) {
          console.error('Error fetching profile data:', error);
      }
    }
    async loadNotifications(container) {
      try {
            const response = await api.get('/notification', {
                credentials: 'include'
            });
            
            if (!response.ok) {
                throw new Error('Ошибка загрузки уведомлений');
            }
            
            const data = await response.json();
            
            const message = 'Вас пригласили на мероприятие.'
            container.innerHTML = ''; // Очищаем контейнер
            
            if (data.notifications.length == 0) {
                const emptyMessage = document.createElement('div');
                emptyMessage.className = 'notification-item';
                emptyMessage.textContent = 'Нет уведомлений';
                container.appendChild(emptyMessage);
                return;
            }
            
            data.notifications.forEach(notification => {
                const notificationItem = document.createElement('div');
                notificationItem.className = 'notification-item';
                notificationItem.textContent = message;

                // Добавляем обработчик события для навигации
                notificationItem.addEventListener('click', () => {
                    navigate(`/events/${+notification.event_id}`);
                });

                container.appendChild(notificationItem);
            });
        } catch (error) {
            console.error('Ошибка при загрузке уведомлений:', error);
        }
    }
  }
  