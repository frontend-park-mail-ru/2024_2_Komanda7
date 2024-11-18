/**
 * Import the endpoint configuration from the config.js file
 * @import {string} endpoint - The API endpoint URL
 */
import { endpoint } from "../../config.js"
import { navigate } from "../../modules/router.js";
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
export class Feed {
    /**
     * Renders the feed of events.
     * 
     * This method fetches the events from the server, creates a FeedElement for each event, and appends them to the feed content.
     * 
     * @async
     * @method renderFeed
     * @returns {HTMLElement} The feed content element.
     */
    async renderFeed(apiPath) {
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
        const response = await fetch(`${endpoint}${apiPath}`, {
          /**
           * The HTTP method for the request.
           * 
           * @constant {string}
           */
          method: "GET",
          /**
           * The headers for the request.
           * 
           * @type {object}
           */
          headers: {
            //"Content-Type": "application/json",
          },
          credentials: "include",
        });
  
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
      };
  
      await fetchFeed(); // Calls the fetchFeed function
      return feedContent; // Returns the feed content element
    }
  }
  