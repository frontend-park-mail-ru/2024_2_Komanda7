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
    async renderFeed() {
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
        const response = await fetch(`${endpoint}/events`, {
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
          Object.entries(feed).forEach(([key, { description, image }]) => {
            const feedElement = new FeedElement(key, description, `${endpoint}${image}`).renderTemplate();
            feedContent.appendChild(feedElement);
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
  