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


const loginForm = new LoginForm();
const loginFormElement = loginForm.renderLogin();

if (window.location.pathname === '/login') {
    newsFeed.innerHTML = ''; // Clear the news feed content
    newsFeed.appendChild(loginFormElement); // Add the login form element
  } else {
    // Add some sample text to the news feed
    const newsFeedText = document.createElement('p');
    newsFeedText.textContent = 'This is the news feed!';
    newsFeed.appendChild(newsFeedText);
  }