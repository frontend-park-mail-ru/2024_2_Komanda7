import { LoginForm } from "./components/Login/Login.js";
import { RegisterForm } from "./components/Register/Register.js";
import { Header } from "./components/Header/Header.js";
import { Nav } from "./components/Nav/Nav.js";
import { Feed } from "./components/Feed/Feed.js";
import { Footer } from "./components/Footer/Footer.js";
import { checkSession } from './modules/session.js';
import { handleRegisterSubmit } from './modules/registerForm.js';
import { handleLoginSubmit } from './modules/loginForm.js';

const root = document.getElementById('root');
let userIsLoggedIn = await checkSession();

function logout() {
    userIsLoggedIn = false;
    updateLinksContainer();
}

function setUserLoggedIn(isLoggedIn) {
    userIsLoggedIn = isLoggedIn;
    updateLinksContainer();
}

// Updates the URL when the user navigates
const navigate = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
};

function updateLinksContainer() {
    const newHeaderElement = new Header().renderHeader(userIsLoggedIn, logout, navigate);
    root.replaceChild(newHeaderElement, header);
    header = newHeaderElement;
}

let header = new Header().renderHeader(userIsLoggedIn, logout, navigate);
root.appendChild(header);

const nav = new Nav().renderNav();
root.appendChild(nav);

//create a feed element
const newsFeed = document.createElement('main');
root.appendChild(newsFeed);

//create a footer element
const footer = new Footer().renderFooter();
root.appendChild(footer);

const responseElement = document.createElement('div');
responseElement.id = 'response';

// Update the routes to render the login and signup forms
const routes = {
    '/login': () => {
        const loginForm = new LoginForm();
        const loginFormElement = loginForm.renderTemplate();
        newsFeed.innerHTML = '';
        newsFeed.appendChild(loginFormElement)
        loginFormElement.addEventListener('submit', (event) => handleLoginSubmit(event, setUserLoggedIn, navigate));
    },
    '/signup': () => {
        const registerForm = new RegisterForm();
        const registerFormElement = registerForm.renderTemplate();
        newsFeed.innerHTML = '';
        newsFeed.appendChild(registerFormElement);
        registerFormElement.addEventListener('submit', (event) => handleRegisterSubmit(event, setUserLoggedIn, navigate));
    },
    //load the events
    '/events': async() => {
        newsFeed.innerHTML = ''; // Clear the modal window content
        let feed = await new Feed().renderFeed();
        newsFeed.appendChild(feed);
    },
};

// Update the default route to hide the modal window
const defaultRoute = () => {
    newsFeed.innerHTML = '';
    const newsFeedText = document.createElement('p');
    newsFeedText.textContent = 'Тут пока ничего нет, но скоро будет!';
    newsFeedText.id = 'newsFeedText';
    newsFeed.appendChild(newsFeedText);
    newsFeed.appendChild(responseElement);
};

//url bar listener
window.addEventListener('popstate', () => {
    const path = window.location.pathname;
    const route = routes[path];
    if (route) {
        route();
    } else {
        defaultRoute(); // Call the default route if no matching route is found
    }
});

// Check the current path when the page is loaded
const currentPath = window.location.pathname;
if (currentPath === '/login' || currentPath === '/signup') {
    const route = routes[currentPath];
    if (route) {
        route();
    }
} else if (currentPath === '/events' || currentPath === "/") {
    routes['/events']();
} else {
    defaultRoute()
}
// Add an event listener to the links
const links = document.querySelectorAll('a');
links.forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the default behavior of the link click
        const path = link.getAttribute('href');
        navigate(path); // Use your client-side routing mechanism to navigate to the new path
    });
});