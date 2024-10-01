import { LoginForm } from "./components/Login/Login.js";
import { RegisterForm } from "./components/Register/Register.js";
import { Header } from "./components/Header/Header.js";
import { Nav } from "./components/Nav/Nav.js";
import { Footer } from "./components/Footer/Footer.js";
import { endpoint } from "./config.js"

import { isValidUsername, isValidPassword, isValidEmail, showMessage, removeDangerous } from "./modules/FormValidation.js"

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
  //console.log(feed); //DEBUG
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

      //const username = document.getElementById('emailEntry').value;//DOMPurify.sanitize(document.getElementById('emailEntry').value);
      const username = DOMPurify.sanitize(document.getElementById('loginEmailEntry').value);
      const password = DOMPurify.sanitize(document.getElementById('loginPasswordEntry').value);//DOMPurify.sanitize(document.getElementById('passwordEntry').value);


      if (!username || !password) {
        alert('Please fill all fields');
        return;
      }

      if (!isValidUsername(username))
      {
        document.getElementById('loginEmailEntry')["error_text"];
        alert('Username must contain latin letters and numbers');
        return;
      }

      if (!isValidPassword(password))
      {
        alert('Password must contain latin letters and numbers');
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

          const data = await clonedResponse.json();
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
          document.getElementById('response').innerText = 'Ошибка: ' + error.message;
          document.getElementById('response').classList.add('error');
          document.getElementById('response').classList.add('show');
          setTimeout(() => {
            document.getElementById('response').classList.remove('show');
            document.getElementById('response').classList.add('error');
          }, 3000); 
      }
    });
    newsFeed.appendChild(responseElement);
  },

  '/signup': () => {
    const registerForm = new RegisterForm();
    const registerFormElement = registerForm.render('registerForm');
    registerFormElement.id = "registerForm";
    newsFeed.innerHTML = '';
    newsFeed.appendChild(registerFormElement);
    const formReg = document.getElementById('registerForm');
    formReg.addEventListener('submit', async function(event) {
      event.preventDefault(); 

      const username = DOMPurify.sanitize(document.getElementById('usernameEntry').value);
      const email = DOMPurify.sanitize(document.getElementById('registerEmailEntry').value);
      const password = DOMPurify.sanitize(document.getElementById('registerPasswordEntry').value);

      if (!username || !password || !email) {
        alert('Please fill all fields');
        return;
      }

      if (!isValidUsername(username))
      {
        alert('Username must contain latin letters and numbers');
        return;
      }

      if (!isValidEmail(email))
      {
        alert('Incorrect email');
        return;
      }

      if (!isValidPassword(password))
        {
          alert('Password must contain latin letters and numbers');
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
          document.getElementById('response').innerText = 'Ошибка: ' + error.message;
        document.getElementById('response').classList.add('error');
        document.getElementById('response').classList.add('show');
        setTimeout(() => {
          document.getElementById('response').classList.remove('show');
          document.getElementById('response').classList.add('error');
        }, 3000);
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
