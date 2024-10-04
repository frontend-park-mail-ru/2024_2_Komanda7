import { endpoint } from "../config.js";
export async function checkSession() {
    try {
        const response = await fetch(`${endpoint}/session`, {
            method: 'GET',
            credentials: 'include',
        });
        const errorData = await response.json();
        if (errorData.code != 200 && errorData.code) {
            return false;
        }
        return true;
    } catch (error) {
        return false;
    }
}