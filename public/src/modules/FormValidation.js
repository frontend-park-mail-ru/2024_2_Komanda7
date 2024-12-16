import DOMPurify from 'dompurify';

/**
 * Form validation module.
 * 
 * This module provides functions to validate usernames, passwords, and emails.
 * 
 * @module form-validation
 */

/**
 * Checks if a username is valid.
 * 
 * A valid username consists of alphanumeric characters and underscores, and has a maximum length of 15 characters.
 * 
 * @function isValidUsername
 * @param {string} username - The username to validate.
 * @returns {boolean} True if the username is valid, false otherwise.
 */
export function isValidUsername(username) {
    const pattern = /^([a-zA-Z0-9_]){1,15}$/;
    return pattern.test(username);
  }
  
  /**
   * Checks if a password is valid.
   * 
   * A valid password consists of alphanumeric characters.
   * 
   * @function isValidPassword
   * @param {string} password - The password to validate.
   * @returns {boolean} True if the password is valid, false otherwise.
   */
  export function isValidPassword(password) {
    const pattern = /^[a-zA-Z0-9]+$/;
    return pattern.test(password);
  }
  
  /**
   * Checks if an email is valid.
   * 
   * A valid email consists of characters before and after the '@' symbol, and a domain with at least one character.
   * 
   * @function isValidEmail
   * @param {string} email - The email to validate.
   * @returns {boolean} True if the email is valid, false otherwise.
   */
  export function isValidEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }
  
  /**
   * Removes dangerous characters from an input value.
   * 
   * This function uses DOMPurify to sanitize the input value.
   * 
   * @function removeDangerous
   * @param {string} inputValue - The input value to sanitize.
   * @returns {string} The sanitized input value.
   */
  export function removeDangerous(inputValue) {
    return DOMPurify.sanitize(inputValue);
  }
