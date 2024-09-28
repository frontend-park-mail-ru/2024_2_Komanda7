import { LoginForm } from "./components/Login/Login.js";

const root = document.getElementById('root');

// Create header element
const header = document.createElement('header');
root.appendChild(header);

// Create searchbar element
const searchbar = document.createElement('input');
searchbar.type = 'search';
searchbar.placeholder = 'Search...';
header.appendChild(searchbar);

// Create links container element
const linksContainer = document.createElement('div');
linksContainer.className = 'links'; /* Add class to links container */
header.appendChild(linksContainer);

// Create login and signup links
const loginLink = document.createElement('a');
loginLink.href = '/login';
loginLink.textContent = 'Login';
linksContainer.appendChild(loginLink);

const signupLink = document.createElement('a');
signupLink.href = '/signup';
signupLink.textContent = 'Signup';
linksContainer.appendChild(signupLink);

const navigation = {
        feed1: {
            href: '/feed1',
            text: 'Feed1',
        },
        feed2: {
            href: '/feed2',
            text: 'Feed2',
        },
        feed3: {
            href: '/feed3',
            text: 'Feed3',
        }, 
};

const navigationBar = document.createElement('navigation');
Object.entries(navigation).forEach(([key, {href, text}]) => {
    const navbarElement = document.createElement('a');
    navbarElement.href = href;
    navbarElement.textContent = text;

    navigationBar.appendChild(navbarElement);
});
root.appendChild(navigationBar);

// Create news feed element
const newsFeed = document.createElement('main');
newsFeed.id = 'news-feed';
root.appendChild(newsFeed);

// Create footer element
const footer = document.createElement('footer');
root.appendChild(footer);

// Create a modal container element
const modalContainer = document.createElement('div');
modalContainer.className = 'modal-container';
root.appendChild(modalContainer);

// Create a modal window element
const modalWindow = document.createElement('div');
modalWindow.className = 'modal-window';
modalContainer.appendChild(modalWindow);

// Create a modal overlay element
const modalOverlay = document.createElement('div');
modalOverlay.className = 'modal-overlay';
root.appendChild(modalOverlay);

// Update the routes to render the login and signup forms in the modal window
const routes = {
  '/login': () => {
    // Render the login page in the modal window
    const loginForm = new LoginForm();
    const loginFormElement = loginForm.renderLogin();
    modalWindow.innerHTML = ''; // Clear the modal window content
    modalWindow.appendChild(loginFormElement);
    modalContainer.style.display = 'block'; // Show the modal container
    modalOverlay.style.display = 'block'; // Show the modal overlay
  },
  '/signup': () => {
    const loginForm = new LoginForm();
    const loginFormElement = loginForm.renderLogin();
    modalWindow.innerHTML = ''; // Clear the modal window content
    modalWindow.appendChild(loginFormElement);
    modalContainer.style.display = 'block'; // Show the modal container
    modalOverlay.style.display = 'block'; // Show the modal overlay
  }
};

// Add an event listener to close the modal window when the overlay is clicked
modalOverlay.addEventListener('click', (event) => {
  if (event.target == modalOverlay) {
    modalContainer.style.display = 'none'; // Hide the modal container
    modalOverlay.style.display = 'none'; // Hide the modal overlay
  }
});

/*
window.onclick = function (event) {
  if (event.target == loginForm) {
    loginForm.style.display = 'none';
  }
};
*/

// Update the default route to hide the modal window
const defaultRoute = () => {
  modalContainer.style.display = 'none'; // Hide the modal container
  modalOverlay.style.display = 'none'; // Hide the modal overlay
  // Add some sample text to the news feed
  newsFeed.innerHTML = '';
  const newsFeedText = document.createElement('p');
  newsFeedText.textContent = 'This is the default route!';
  newsFeed.appendChild(newsFeedText);
};

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
}

// Update the URL when the user navigates
const navigate = (path) => {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

// Add an event listener to the links
const links = document.querySelectorAll('a');
links.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default behavior of the link click
    const path = link.getAttribute('href');
    navigate(path); // Use your client-side routing mechanism to navigate to the new path
  });
});

