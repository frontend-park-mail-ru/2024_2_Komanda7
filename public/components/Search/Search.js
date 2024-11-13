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
                navigate(`/search?q=${encodeURIComponent(newSearchTerm)}&tags=${encodeURIComponent(newTags)}`);
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
                navigate(`/search?q=${encodeURIComponent(newSearchTerm)}&tags=${encodeURIComponent(newTags)}`);
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
        //console.log(apiPath);
        
        try {
            const request = {
                headers: {

                },
                credentials: 'include',
            };
            console.log(searchTerm);
            console.log(tags);
            let path = '/events/search?';
            if (searchTerm) {
              path += 'query=' + searchTerm;
            }
            if (tags.length) {
              path += '&tags=' + tags;
            }
            //path += '&category_id=' + 7;
            console.log(path);
            const response = await api.get(path, request);
            //console.log("Search request: ", path);
        
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
    searchPage.appendChild(feedContent);
    return searchPage; // Returns the search page element
    }
  }
  