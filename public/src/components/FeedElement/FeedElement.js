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
     * @param {string} title - The title of the feed element.
     * @param {string} imagePath - The path to the image of the feed element.
     */
    constructor(elemId, title, imagePath) {
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
       * The title element configuration.
       * 
       * @type {Object}
       */
      const titleElement = this.config.title;
      titleElement.text = title;
      titleElement.className = 'title';
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
       * The title configuration.
       * 
       * @type {Object}
       */
      title: {
        /**
         * The title class name.
         * 
         * @type {string}
         */
        className: '',
        /**
         * The title text.
         * 
         * @type {string}
         */
        text: '',
      },
    };
  
    /**
     * Renders the feed element template.
     * 
     * This method creates the feed element template and appends the image and title elements to it.
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
       * The title element.
       * 
       * @type {HTMLDivElement}
       */
      const titleElement = document.createElement('div');
      titleElement.className = this.config.title.className;
      titleElement.textContent = this.config.title.text;
      this.feedElement.appendChild(titleElement);
  
      return this.feedElement;
    }
  }
  