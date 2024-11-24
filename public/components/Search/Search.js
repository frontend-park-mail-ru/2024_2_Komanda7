/**
 * Import the endpoint configuration from the config.js file
 * @import {string} endpoint - The API endpoint URL
 */
import { endpoint } from "../../config.js"
import { navigate } from "../../modules/router.js";
import { api } from '../../modules/FrontendAPI.js';
/**
 * Import the FeedElement component from the FeedElement.js file
 * @import FeedElement - A component representing a feed element
 */
import { FeedElement } from "../FeedElement/FeedElement.js"
/**
 * Feed module.
 * 
 * This module provides a class to render a feed of events.
 * 
 * @module feed
 */

/**
 * Feed class.
 * 
 * This class is responsible for rendering a feed of events.
 * 
 * @class Feed
 */
export class Search {
    /**
     * Renders the feed of events.
     * 
     * This method fetches the events from the server, creates a FeedElement for each event, and appends them to the feed content.
     * 
     * @async
     * @method renderFeed
     * @returns {HTMLElement} The feed content element.
     */
    async renderSearch(apiPath, searchQuery) {
        // Create the main container for the search page
        const searchPage = document.createElement('div');
        searchPage.id = 'searchPage';
    
        // Create the search parameters container
        const searchParameters = document.createElement('div');
        searchParameters.id = 'searchParameters';
        searchParameters.className = 'search-parameters'; // Add a class for styling
    
        // Create the Tags title and input field
        const tagsLabel = document.createElement('label');
        tagsLabel.textContent = 'Tags';
        tagsLabel.className = 'input-label'; // Add a class for styling
        const tagsInput = document.createElement('input');
        tagsInput.type = 'text';
        tagsInput.placeholder = 'Enter tags...'; // Placeholder text for Tags input
        tagsInput.className = 'tags-input'; // Add a class for styling
        // Add event listener to detect Enter key press
        tagsInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') { // Check if the pressed key is Enter
                event.preventDefault();
                const newTags = tagsInput.value;
                const newSearchTerm = searchInput.value;
                navigate(`${apiPath}?q=${encodeURIComponent(newSearchTerm)}&tags=${encodeURIComponent(newTags)}`);
            }
        });
        //Create the Search title and input field
        const searchLabel = document.createElement('label');
        searchLabel.textContent = 'Поиск';
        searchLabel.className = 'input-label'; // Add a class for styling
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Введите искомые слова...'; // Placeholder text for Search input
        searchInput.className = 'search-input'; // Add a class for styling
        searchInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') { // Check if the pressed key is Enter
                event.preventDefault();
                const newSearchTerm = searchInput.value;
                const newTags = tagsInput.value;
                navigate(`${apiPath}?q=${encodeURIComponent(newSearchTerm)}&tags=${encodeURIComponent(newTags)}`);
            }
        });
        // Parse the searchQuery to extract tags and search term
        const params = new URLSearchParams(searchQuery);
        
        const tags = params.get('tags') ? params.get('tags').split(' ') : []; // Split tags by space
        const searchTerm = params.get('q') || ''; // Get the search term
        //Set the value of the input fields
        tagsInput.value = tags.join(' '); // Join tags with space for display
        searchInput.value = searchTerm; // Set search term
    
        // Append the titles and input fields to the searchParameters container
        searchParameters.appendChild(tagsLabel);
        searchParameters.appendChild(tagsInput);
        searchParameters.appendChild(searchLabel);
        searchParameters.appendChild(searchInput);
        // Append the searchParameters to the searchPage
        searchPage.appendChild(searchParameters);
      /**
       * The feed content element.
       * 
       * @type {HTMLElement}
       */
      const feedContent = document.createElement('content');
  
      /**
       * Fetches the feed from the server.
       * 
       * @async
       * @function fetchFeed
       */
      const fetchFeed = async () => {
        /**
         * The response from the server.
         * 
         * @type {Response}
         */
        
        try {
            const request = {
                headers: {

                },
                credentials: 'include',
            };
            let path = '/events/search?';
            if (searchTerm) {
              path += 'query=' + searchTerm;
            }
            if (tags.length) {
              tags.forEach((tag) => {
                path += '&tags=' + tag;
              })
            }
            //path += '&category_id=' + 7;
            const response = await api.get(path, request);
        
        if (response.ok) {
          /**
           * The feed data from the server.
           * 
           * @type {object}
           */
          const feed = await response.json();
          feedContent.id = 'feedContent';
  
          /**
           * Iterates over the feed data and creates a FeedElement for each event.
           * 
           * @param {string} key - The key of the event.
           * @param {string} description - The description of the event.
           * @param {string} image - The image URL of the event.
           */
          Object.entries(feed.events).forEach( (elem) => {
            const {id, title, image} = elem[1];
            const feedElement = new FeedElement(id, title, `${endpoint}/${image}`).renderTemplate();
            feedContent.appendChild(feedElement);
            feedElement.addEventListener('click', (event) => {
              event.preventDefault();
              const path = `/events/${id}`;
              navigate(path);
            });
          });
  
        } else {
          /**
           * The error text from the server.
           * 
           * @type {object}
           */
          const errorText = await response.json();
        }
    } catch (error) {
        console.error('Error searching:', error);
    }
      };
      await fetchFeed(); // Calls the fetchFeed function
      
      const hiddenLatitudeInput = document.createElement('input');
      hiddenLatitudeInput.type = 'hidden';
      hiddenLatitudeInput.id = 'latitude';
      searchParameters.appendChild(hiddenLatitudeInput);

      const hiddenLongitudeInput = document.createElement('input');
      hiddenLongitudeInput.type = 'hidden';
      hiddenLongitudeInput.id = 'longitude';
      searchParameters.appendChild(hiddenLongitudeInput);

      const zoom = document.createElement('input');
      zoom.type = 'hidden';
      zoom.id = 'zoom';
      searchParameters.appendChild(zoom);

      const mapContainer = document.createElement('div');
      mapContainer.id = 'map';
      mapContainer.style.width = '100%'; // Ширина карты
      mapContainer.style.height = '400px'; // Высота карты
      searchParameters.appendChild(mapContainer);
      const mock_data = { latitude: 55.79720450649618, longitude: 37.53777629133753, zoom: 17 };
      ymaps.ready(() => this.initMap(mock_data));
    searchPage.appendChild(feedContent);
    return searchPage; // Returns the search page element
    }

    initMap(mock_data) {
      const myMap = new ymaps.Map("map", {
          center: [mock_data.latitude, mock_data.longitude],
          zoom: mock_data.zoom,
      });  
      // Обработчик события клика на карту
      myMap.events.add('mousedown', (e) => {
          const coords = e.get('coords');
          const zoom = myMap.getZoom();
          var selectedPoint = {
              latitude: coords[0],
              longitude: coords[1],
              zoom: zoom,
          };
          // Обновление скрытых полей с координатами
          document.getElementById('latitude').value = coords[0];
          document.getElementById('longitude').value = coords[1];
          document.getElementById('zoom').value = zoom;
          // Удаляем старую метку, если она существует
          if (this.currentPlacemark) {
              myMap.geoObjects.remove(this.currentPlacemark);
          }
          // Создаем новую метку
          this.currentPlacemark = new ymaps.Placemark(coords, {
              hintContent: 'Новая метка',
          }, {
              iconLayout: 'default#image',
              iconImageHref: '/static/images/location.png',
              iconImageSize: [32, 32],
              iconImageOffset: [-16, -32]
          });
          // Добавляем новую метку на карту
          myMap.geoObjects.add(this.currentPlacemark);
          console.log(selectedPoint);
      });
    }
  }
  