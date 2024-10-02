import { LoginForm } from "./components/Login/Login.js";
import { RegisterForm } from "./components/Register/Register.js";
import { Header } from "./components/Header/Header.js";
import { Nav } from "./components/Nav/Nav.js";
import { Footer } from "./components/Footer/Footer.js";
import { endpoint } from "./config.js"

const EMPTY_FIELD = 'Это обязательное поле';
const INCORRECT_USERNAME = 'Логин может состоять из латинских букв, цифр и знаков _ и быть в длину не более 15 символов'
const INCORRECT_PASSWORD = 'Пароль должен состоят из букв и цифр';
const INCORRECT_EMAIL = 'Адрес email должен содержать несколько символов до знака @, один символ @, несколько символов после @, точка, несколько знаков посел точки';

import { isValidUsername, isValidPassword, isValidEmail, removeDangerous } from "./modules/FormValidation.js"

const root = document.getElementById('root');

let userIsLoggedIn = false;
try {
  const checkSession = await fetch(`${endpoint}/session`, {
    method: "GET",
    headers: {},
    credentials: 'include',
    
  });
  if (checkSession.ok) {
    userIsLoggedIn = true;
  }
}
catch {
  userIsLoggedIn = false;
}

function logout() {
  userIsLoggedIn = false;
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
const nav = new Nav().renderNav()  ;
root.appendChild(nav);

//create a feed element
const newsFeed = document.createElement('main');
root.appendChild(newsFeed);
//load events from backend
const feedContent = document.createElement('content');
const fetchFeed = await fetch(`${endpoint}/events`, {
  method: "GET",
  headers: {
      //"Content-Type": "application/json",
  },
});
if (fetchFeed.ok) {
  const feed = await fetchFeed.json();
  feedContent.id = 'feedContent';

  Object.entries(feed).forEach(([key, {description, image}]) => {
    const FeedElement = document.createElement('div');
    FeedElement.className = 'feed-element';
  
    const imageElement = document.createElement('img');
    imageElement.src = image;
    imageElement.onerror = function() {
      this.src = "/static/images/placeholder.png";
      this.style.objectFit = 'fill';
    };
    FeedElement.appendChild(imageElement);
  
    const descriptionElement = document.createElement('div');
    descriptionElement.className = 'description';
    descriptionElement.textContent = description;
    FeedElement.appendChild(descriptionElement);
  
    feedContent.appendChild(FeedElement);
  });
newsFeed.appendChild(feedContent);


}
else {
  const errorText = await fetchFeed.json();
  console.log(errorText);
}

//create a footer element
const footer = new Footer().renderFooter();
root.appendChild(footer);

const responseElement = document.createElement('div');
responseElement.id = 'response';

// Update the routes to render the login and signup forms
const routes = {
  '/login': () => {
    const loginForm = new LoginForm("loginForm");
    const loginFormElement = loginForm.render();
    newsFeed.innerHTML = '';
    newsFeed.appendChild(loginFormElement)


    loginFormElement.addEventListener('submit', async function(event) {
      event.preventDefault(); 

      document.getElementById('loginUsernameError').innerText = '';
      document.getElementById('loginPasswordError').innerText = '';
      document.getElementById('loginServerError').innerText = '';

      const username = removeDangerous(document.getElementById('loginUsernameEntry').value);
      const password = removeDangerous(document.getElementById('loginPasswordEntry').value);


      if (!username) {
        document.getElementById('loginUsernameError').innerText = EMPTY_FIELD;
        if (!password) {
          document.getElementById('loginPasswordError').innerText = EMPTY_FIELD;
        }
        return;
      }

      if (!isValidUsername(username))
      {
        document.getElementById('loginUsernameError').innerText = INCORRECT_USERNAME;
        return;
      }

      if (!isValidPassword(password))
      {
        document.getElementById('loginPasswordError').innerText = INCORRECT_PASSWORD;
        return;
      }


      try {
          //backend request
          const response = await fetch(`${endpoint}/login`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ username, password }),
              credentials: 'include',
          });
          const clonedResponse = response.clone();
          const errorText = await response.text();
          console.log(errorText);
          if (errorText === "Alredy logged in") {
            userIsLoggedIn = true;
            updateLinksContainer();
          }

          const data = await clonedResponse.json()
          document.getElementById('response').innerText = data.message;

          if (!response.ok) {

              throw new Error(data.message);
          }
          else {
            userIsLoggedIn = true;
            document.getElementById('response').innerText = "Вход выполнен";
            updateLinksContainer();
            navigate("exhibitions");
          }
      } catch (error) {
        document.getElementById('loginServerError').innerText = 'Неверный логин или пароль';

      }
    });
    newsFeed.appendChild(responseElement);
  },

  '/signup': () => {
    const registerForm = new RegisterForm('registerForm');
    const registerFormElement = registerForm.render();
    newsFeed.innerHTML = '';
    newsFeed.appendChild(registerFormElement);
    
    registerFormElement.addEventListener('submit', async function(event) {
      event.preventDefault(); 

      document.getElementById('registerUsernameError').innerText = '';
      document.getElementById('registerPasswordError').innerText = '';
      document.getElementById('registerEmailError').innerText = '';
      document.getElementById('registerServerError').innerText = '';
      

      const username = removeDangerous(document.getElementById('registerUsernameEntry').value);
      const email = removeDangerous(document.getElementById('registerEmailEntry').value);
      const password = removeDangerous(document.getElementById('registerPasswordEntry').value);

      if (!username) {
        document.getElementById('registerUsernameError').innerText = EMPTY_FIELD;
        if (!password) {
          document.getElementById('registerEmailError').innerText = EMPTY_FIELD;
          if (!email) {
            document.getElementById('registerPasswordError').innerText = EMPTY_FIELD;
          }
        }
        return;
      }

      if (!isValidUsername(username))
      {
        document.getElementById('registerUsernameError').innerText = INCORRECT_USERNAME;
        return;
      }

      if (!isValidEmail(email))
      {
        document.getElementById('registerEmailError').innerText = INCORRECT_EMAIL;
        return;
      }

      if (!isValidPassword(password))
        {
          document.getElementById('registerPasswordError').innerText = INCORRECT_PASSWORD;
          return;
        }
  

      try {
          //backend request
          const response = await fetch(`${endpoint}/register`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ username, email, password }),
          });
          const clonedResponse = response.clone();
          const errorText = await response.text();
          console.log(errorText);

          const data = await clonedResponse.json();
          document.getElementById('response').innerText = data.message;
          
          if (!response.ok) {
              throw new Error(data.message);
          }
          userIsLoggedIn = true;
          document.getElementById('response').innerText = "Вход выполнен";
          updateLinksContainer();
          navigate("exhibitions");
          //go to 
      } catch (error) {
        document.getElementById('registerServerError').innerText = 'Пользователь с такими данными уже существует';
      }
    });
    newsFeed.appendChild(responseElement);

  },
  //load the events
  '/exhibitions': () => {
    newsFeed.innerHTML = ''; // Clear the modal window content
    newsFeed.appendChild(feedContent);
  },
};


// Update the default route to hide the modal window
const defaultRoute = () => {
  newsFeed.innerHTML = '';
  const newsFeedText = document.createElement('p');
  newsFeedText.textContent = 'No events!';
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
