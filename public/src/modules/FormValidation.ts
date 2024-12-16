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
 */
export function isValidUsername(username: string): boolean {
    const pattern = /^([a-zA-Z0-9_]){1,15}$/;
    return pattern.test(username);
}

/**
 * Checks if a password is valid.
 */
export function isValidPassword(password: string): boolean {
    const pattern = /^[a-zA-Z0-9]+$/;
    return pattern.test(password);
}

/**
 * Checks if an email is valid.
 */
export function isValidEmail(email: string): boolean {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

/**
 * Removes dangerous characters from an input value.
 */
export function removeDangerous(inputValue: string): string {
    return DOMPurify.sanitize(inputValue);
}