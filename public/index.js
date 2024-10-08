/**
 * Main application script
 */

/**
 * Import components and modules
 */
import { LoginForm } from "./components/Login/Login.js";
import { RegisterForm } from "./components/Register/Register.js";
import { Header } from "./components/Header/Header.js";
import { Nav } from "./components/Nav/Nav.js";
import { Feed } from "./components/Feed/Feed.js";
import { Footer } from "./components/Footer/Footer.js";
import { checkSession } from './modules/session.js';
import { handleRegisterSubmit, handleRegisterCheck } from './modules/registerForm.js';
import { handleLoginSubmit, handleLoginCheck } from './modules/loginForm.js';

/**
 * Get the root element
 * @type {HTMLElement}
 */
const root = document.getElementById('root');

/**
 * Check if the user is logged in
 * @type {boolean}
 */
let userIsLoggedIn = await checkSession();

/**
 * Logout function
 * Sets the user as logged out and redraws the header
 */
function logout() {
    /**
     * Set the user as logged out
     */
    userIsLoggedIn = false;
    /**
     * Redraw the header
     */
    updateLinksContainer();
}

/**
 * Set the user as logged in
 * @param {boolean} isLoggedIn - Whether the user is logged in
 */
function setUserLoggedIn(isLoggedIn) {
    /**
     * Set the user as logged in
     */
    userIsLoggedIn = isLoggedIn;
    /**
     * Redraw the header
     */
    updateLinksContainer();
}

/**
 * Navigate to a new path
 * @param {string} path - The path to navigate to
 */
const navigate = (path) => {
    /**
     * Update the URL
     */
    window.history.pushState({}, '', path);
    /**
     * Dispatch a popstate event
     */
    window.dispatchEvent(new PopStateEvent('popstate'));
};

/**
 * Update the links container
 */
function updateLinksContainer() {
    /**
     * Create a new header element
     */
    const newHeaderElement = new Header().renderHeader(userIsLoggedIn, logout, navigate);
    /**
     * Replace the old header element with the new one
     */
    root.replaceChild(newHeaderElement, header);
    /**
     * Update the header reference
     */
    header = newHeaderElement;
}

/**
 * Create the initial header element
 */
let header = new Header().renderHeader(userIsLoggedIn, logout, navigate);
root.appendChild(header);

/**
 * Create the navigation element
 */
const nav = new Nav().renderNav();
root.appendChild(nav);

/**
 * Create the feed element
 */
const newsFeed = document.createElement('main');
root.appendChild(newsFeed);

/**
 * Create the footer element
 */
const footer = new Footer().renderFooter();
root.appendChild(footer);

/**
 * Create the response element
 */
const responseElement = document.createElement('div');
responseElement.id = 'response';

/**
 * Define the routes
 * @type {Object}
 */
const routes = {
    /**
     * Login route
     */
    '/login': () => {
        /**
         * Create a new login form element
         */
        const loginForm = new LoginForm();
        const loginFormElement = loginForm.renderTemplate();
        newsFeed.innerHTML = '';
        newsFeed.appendChild(loginFormElement);
        loginFormElement.addEventListener('keyup', (event) => handleLoginCheck(event));
        loginFormElement.addEventListener('submit', (event) => handleLoginSubmit(event, setUserLoggedIn, navigate));
    },
    /**
     * Signup route
     */
    '/signup': () => {
        /**
         * Create a new register form element
         */
        const registerForm = new RegisterForm();
        const registerFormElement = registerForm.renderTemplate();
        newsFeed.innerHTML = '';
        newsFeed.appendChild(registerFormElement);
        registerFormElement.addEventListener('keyup', (event) => handleRegisterCheck(event));
        registerFormElement.addEventListener('submit', (event) => handleRegisterSubmit(event, setUserLoggedIn, navigate));
    },
    /**
     * Events route
     */
    '/events': async() => {
        newsFeed.innerHTML = ''; // Clear the modal window content
        let feed = await new Feed().renderFeed();
        newsFeed.appendChild(feed);
    },
};

/**
 * Default route
 */
const defaultRoute = () => {
    newsFeed.innerHTML = '';
    const newsFeedText = document.createElement('p');
    newsFeedText.textContent = 'Тут пока ничего нет, но скоро будет!';
    newsFeedText.id = 'newsFeedText';
    newsFeed.appendChild(newsFeedText);
    newsFeed.appendChild(responseElement);
};

/**
 * URL bar listener
 */
window.addEventListener('popstate', () => {
    const path = window.location.pathname;
    const route = routes[path];
    if (route) {
        route();
    } else {
        defaultRoute(); // Call the default route if no matching route is found
    }
});

/**
 * Check the current path when the page is loaded
 */
const currentPath = window.location.pathname;

/**
 * Check if the current path is the login or signup page
 */
if (currentPath === '/login' || currentPath === '/signup') {
    /**
     * Get the route for the current path
     */
    const route = routes[currentPath];
    if (route) {
        /**
         * Call the route function
         */
        route();
    }
} else if (currentPath === '/events' || currentPath === "/") {
    /**
     * Call the events route function
     */
    routes['/events']();
} else {
    /**
     * Call the default route function
     */
    defaultRoute()
}

/**
 * Add an event listener to the links
 */
const links = document.querySelectorAll('a');
links.forEach((link) => {
    /**
     * Add a click event listener to the link
     */
    link.addEventListener('click', (event) => {
        /**
         * Prevent the default behavior of the link click
         */
        event.preventDefault();
        /**
         * Get the path from the link's href attribute
         */
        const path = link.getAttribute('href');
        /**
         * Navigate to the new path
         */
        navigate(path);
    });
});
