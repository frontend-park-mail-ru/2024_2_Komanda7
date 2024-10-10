/**
 * FeedElement module.
 * 
 * This module provides a class to render a feed element.
 * 
 * @module feedElement
 */

/**
 * FeedElement class.
 * 
 * This class is responsible for rendering a feed element.
 * 
 * @class FeedElement
 */
export class FeedElement {
    /**
     * Creates a new FeedElement instance.
     * 
     * @constructor
     * @param {string} elemId - The ID of the feed element.
     * @param {string} description - The description of the feed element.
     * @param {string} imagePath - The path to the image of the feed element.
     */
    constructor(elemId, description, imagePath) {
      /**
       * The feed element.
       * 
       * @type {HTMLElement}
       */
      this.feedElement = document.createElement('div');
      this.feedElement.id = elemId;
  
      /**
       * The image element configuration.
       * 
       * @type {Object}
       */
      const imageElement = this.config.image;
      imageElement.src = imagePath;
  
      /**
       * The description element configuration.
       * 
       * @type {Object}
       */
      const descriptionElement = this.config.description;
      descriptionElement.text = description;
      descriptionElement.className = 'description';
    }
  
    /**
     * The configuration object.
     * 
     * @type {Object}
     */
    config = {
      /**
       * The image configuration.
       * 
       * @type {Object}
       */
      image: {
        /**
         * The image source.
         * 
         * @type {string}
         */
        src: '',
      },
      /**
       * The description configuration.
       * 
       * @type {Object}
       */
      description: {
        /**
         * The description class name.
         * 
         * @type {string}
         */
        className: '',
        /**
         * The description text.
         * 
         * @type {string}
         */
        text: '',
      },
    };
  
    /**
     * Renders the feed element template.
     * 
     * This method creates the feed element template and appends the image and description elements to it.
     * 
     * @method renderTemplate
     * @returns {HTMLElement} The feed element.
     */
    renderTemplate() {
      this.feedElement.className = 'feed-element';
  
      /**
       * The image element.
       * 
       * @type {HTMLImageElement}
       */
      const imageElement = document.createElement('img');
      imageElement.src = this.config.image.src;
      imageElement.onerror = function() {
        this.src = "/static/images/placeholder.png";
        this.style.objectFit = 'fill';
      };
      this.feedElement.appendChild(imageElement);
  
      /**
       * The description element.
       * 
       * @type {HTMLDivElement}
       */
      const descriptionElement = document.createElement('div');
      descriptionElement.className = this.config.description.className;
      descriptionElement.textContent = this.config.description.text;
      this.feedElement.appendChild(descriptionElement);
  
      return this.feedElement;
    }
  }
  