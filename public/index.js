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
import { Profile } from "./components/Profile/Profile.js";
import { Search } from "./components/Search/Search.js";
import { EventContentPage } from "./components/EventContentPage/EventContentPage.js";
import { UserEventsPage } from "./components/UserEventsPage/UserEventsPage.js";
import { Footer } from "./components/Footer/Footer.js";
import { checkSession } from './modules/session.js';
import { handleRegisterSubmit, handleRegisterCheck } from './modules/registerForm.js';
import { handleLoginSubmit, handleLoginCheck } from './modules/loginForm.js';
import { EventCreateForm } from "./components/EventCreateForm/EventCreateForm.js";
import { handleCreateEventSubmit, loadCategories, handleCreateEventEdit } from './modules/handleEventsActions.js';
import { EditEventForm } from "./components/EditEventForm/EditEventForm.js";
import { csat } from "./components/csat/csat.js";

/**
 * Get the root element
 * @type {HTMLElement}
 */
const root = document.getElementById('root');
const currentPath = window.location.pathname;
const inIframe = window.self !== window.top;
function loadQuestion() {
    const currentFrame = document.getElementById("iframeQuestion");
    if (currentFrame) {
        currentFrame.remove();
    }
    const currentPath = window.location.pathname;
if (!inIframe && currentPath != '/csat') {
    // let header = new Header().renderHeader(userIsLoggedIn, logout, navigate);
    // root.appendChild(header);
    const iframe = document.createElement('iframe');
    iframe.id = 'iframeQuestion';
    iframe.scrolling = 'no';
    iframe.src = "http://127.0.0.1/csat"; // Set the source URL for the iframe
    iframe.className = "fixed-iframe";    // Append the iframe to the root content
    root.appendChild(iframe);
    
    iframe.onload = function() {
        // Добавляем задержку перед отправкой сообщения
        setTimeout(() => {
            iframe.contentWindow.postMessage(currentPath, '*');
        }, 100); // Задержка 1000 мс (1 секунда)
        };
    };
}

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

const newsFeed = document.createElement('main');

initializeApp();
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

async function initializeApp() {
    // Добавление header
    // let header = new Header().renderHeader(userIsLoggedIn, logout, navigate);
    // root.appendChild(header);

    // Добавление навигации
    if (!inIframe && currentPath != '/csat'){
        let header = new Header().renderHeader(userIsLoggedIn, logout, navigate);
        root.appendChild(header);
        const nav = await new Nav().renderNav();
        root.appendChild(nav);
        
    }
    root.appendChild(newsFeed);
    // const footer = new Footer().renderFooter();
    // root.appendChild(footer);
}

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
        let feed = await new Feed().renderFeed('/events');
        newsFeed.appendChild(feed);
    },
    '/profile': () => {
        newsFeed.innerHTML = ''; // Clear the modal window content
        const profile = new Profile();
        const profileElement = profile.renderProfile();
        newsFeed.appendChild(profileElement);
    },
    '/events/:id': async(id) => {
        newsFeed.innerHTML = ''; // Clear the modal window content
        
        let eventPage = await new EventContentPage('event').renderTemplate(id);
        newsFeed.appendChild(eventPage);
    },
    '/events/my': async(id) => {
        newsFeed.innerHTML = ''; // Clear the modal window content
        let UserEventPage = await new UserEventsPage('userEvents').renderTemplate(id);
        newsFeed.appendChild(UserEventPage);
        let eventPage = await new Feed().renderFeed('/events/my');
        newsFeed.appendChild(eventPage);
    },
    '/events/categories/:id': async(id) => {
        newsFeed.innerHTML = ''; // Clear the modal window content
        let eventPage = await new Feed().renderFeed(`/events/categories/${id}`);
        newsFeed.appendChild(eventPage);
    },
    '/events/past': async() => {
        newsFeed.innerHTML = ''; // Clear the modal window content
        let eventPage = await new Feed().renderFeed('/events/past');
        newsFeed.appendChild(eventPage);
    },
    '/search': async() => {
        newsFeed.innerHTML = ''; // Clear the modal window content
        let feed = await new Search().renderSearch('/search', window.location.search.substring(1));
        newsFeed.appendChild(feed);
    },
    '/add_event': async(id) => {
        newsFeed.innerHTML = ''; // Clear the modal window content
        const categSelect = await loadCategories();
        const formCreate = new EventCreateForm().renderTemplate(categSelect);
        newsFeed.appendChild(formCreate);
        const createBtn = document.getElementById('eventSubmitBtn');        
        createBtn.addEventListener('click', (event) => handleCreateEventSubmit(event, '/events/my', navigate));

    },
    '/edit_event': async(id) => {
        newsFeed.innerHTML = ''; // Clear the modal window content
        const categSelect = await loadCategories();
        const formId = 'editEventForm';
        const editEventForm = new EditEventForm(formId);
        
        const formCreate = editEventForm.renderTemplate(categSelect);
        newsFeed.appendChild(formCreate);
        await editEventForm.init(id);
        const editBtn = document.getElementById('editSubmitBtn');        
        editBtn.addEventListener('click', (event) => handleCreateEventEdit(event, id, navigate));
    },
    '/csat': async () => {
        const csatForm = await new csat('event').renderTemplate(1);
        newsFeed.appendChild(csatForm);
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
//This segment is enacted on URL change
window.addEventListener('popstate', () => {
    loadQuestion();
    const path = window.location.pathname;
    const route = routes[path];
    if (/\/events\/\d+/.test(path)) {
        /**
         * Call the events route function
         */
        const id = path.split('/')[2];
        if (path.split('/')[3] === "edit") {
            routes['/edit_event'](id);
        } else {
            routes['/events/:id'](id);
        }
        //routes['/events/:id'](id);
    }
    else if (/\/events\/categories\/\d+/.test(path)) {
        /**
         * Call the events route function
         */
        const id = path.split('/')[3];
        routes['/events/categories/:id'](id);
    }
    else if (route) {
        route();
    } else {
        defaultRoute(); // Call the default route if no matching route is found
    }
});

/**
 * Check the current path when the page is loaded
 */

/**
 * Check if the current path is the login or signup page
 */
//This segment is enacted on refresh
loadQuestion();
if (currentPath === '/login' || currentPath === '/signup' || currentPath == '/profile' || currentPath == '/search' || currentPath == '/events/my' || currentPath == '/csat') {
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
} else if (currentPath === '/events' || currentPath === '/') {
    /**
     * Call the events route function
     */
    routes['/events']();
} else if (/\/events\/\d+/.test(currentPath)) {
    /**
     * Call the events route function
     */
    const id = currentPath.split('/')[2];
    if (currentPath.split('/')[3] === "edit") {
        routes['/edit_event'](id);
    } else {
        routes['/events/:id'](id);
    } // Вызываем обработчик с id
}  else if (/\/events\/categories\/\d+/.test(currentPath)) {
    /**
     * Call the events route function
     */
    const id = currentPath.split('/')[3];
    routes['/events/categories/:id'](id);
} else if (currentPath === '/my_events') {
    const num = 0;
    /* somehow get current user id and check that user is logged in*/
    routes['/events/my'](num);
} else if (currentPath === '/add_event') {
    routes['/add_event']();
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
