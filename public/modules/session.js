/**
 * Session management module.
 * 
 * This module provides a function to check if a user's session is valid.
 * 
 */
/**
 * Import the endpoint configuration from the config.js file
 * @import {string} endpoint - The API endpoint URL
 */
import { endpoint } from "../../config.js"
/**
 * Checks if a user's session is valid.
 * 
 * This function sends a GET request to the session endpoint and checks the response code.
 * If the response code is 200, the session is valid. Otherwise, the session is invalid.
 * 
 * @function checkSession
 * @async
 * @returns {boolean} True if the session is valid, false otherwise.
 */
export async function checkSession() {
    try {
    console.log("checkSession");
      /**
       * The endpoint URL for the session check.
       * 
       * @constant {string}
       */
      const response = await fetch(`${endpoint}/session`, {
        /**
         * The HTTP method for the request.
         * 
         * @constant {string}
         */
        method: 'GET',
        /**
         * The credentials to include in the request.
         * 
         * @constant {string}
         */
        credentials: 'include',
      });
      /**
       * The response data from the server.
       * 
       * @type {object}
       */
      const errorData = await response.json();
      /**
       * Checks if the response code is not 200.
       * 
       * If the response code is not 200, the session is invalid.
       */
      if (errorData.code != 200 && errorData.code) {
        return false;
      }
      /**
       * If the response code is 200, the session is valid.
       */
      return true;
    } catch (error) {
      /**
       * If an error occurs during the request, the session is invalid.
       */
      return false;
    }
  }
  