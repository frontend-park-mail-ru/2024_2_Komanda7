import { LoginForm } from "./components/Login/Login.js";
import { RegisterForm } from "./components/Register/Register.js";
import { Header } from "./components/Header/Header.js";
import { Nav } from "./components/Nav/Nav.js";
import { Footer } from "./components/Footer/Footer.js";
import { Feed } from "./components/Feed/Feed.js"; 


const root = document.getElementById('root');

const header = new Header().renderHeader();
root.appendChild(header);
const nav = new Nav().renderNav()  ;
root.appendChild(nav);


const newsFeed = document.createElement('main');
root.appendChild(newsFeed);
const feedContent = document.createElement('content');

const fetchFeed = await fetch(`http://localhost:8080/events`, {
  method: "GET",
  headers: {
      "Content-Type": "application/json",
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

const footer = new Footer().renderFooter();
root.appendChild(footer);

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

const responseElement = document.createElement('div');
responseElement.id = 'response';

// Update the routes to render the login and signup forms in the modal window
const routes = {
  '/login': () => {
    // Render the login page in the modal window
    const loginForm = new LoginForm();
    const loginFormElement = loginForm.renderLogin();
    loginFormElement.id = "loginForm";
    newsFeed.innerHTML = '';
    //root.innerHTML = ''; // Clear the modal window content
    newsFeed.appendChild(loginFormElement);
    // modalContainer.style.display = 'block'; // Show the modal container
    // modalOverlay.style.display = 'block'; // Show the modal overlay


    const formLog = document.getElementById('loginForm');

    formLog.addEventListener('submit', async function(event) {
      event.preventDefault(); 

      const username = document.getElementById('emailEntry').value;
      const password = document.getElementById('passwordEntry').value;

      try {
      
          const response = await fetch('http://localhost:8080/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ username, password }),
          });
          const clonedResponse = response.clone();
          const errorText = await response.text();
          console.log(errorText);

          const data = await clonedResponse.json();
          document.getElementById('response').innerText = data.message;

          if (!response.ok) {
              throw new Error(data.message);
          }
          else {
            userIsLoggedIn = true;
            document.getElementById('response').innerText = "Вход выполнен";
            updateLinksContainer();
          }
      } catch (error) {
          
          document.getElementById('response').innerText = 'Ошибка: ' + error.message;
      }
    });
    newsFeed.appendChild(responseElement);
  },

  '/signup': () => {
    const registerForm = new RegisterForm();
    const registerFormElement = registerForm.render('registerForm');
    registerFormElement.id = "registerForm";
    newsFeed.innerHTML = ''; // Clear the modal window content
    newsFeed.appendChild(registerFormElement);

    const formReg = document.getElementById('registerForm');

    formReg.addEventListener('submit', async function(event) {
      event.preventDefault(); 

      const username = document.getElementById('usernameEntry').value;
      const email = document.getElementById('registerEmailEntry').value;
      const password = document.getElementById('registerPasswordEntry').value;

      try {
      
          const response = await fetch('http://localhost:8080/register', {
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
      } catch (error) {
          document.getElementById('response').innerText = 'Ошибка: ' + error.message;
      }
    });
    newsFeed.appendChild(responseElement);

    /*const loginForm = new LoginForm();
    const loginFormElement = loginForm.renderLogin();
    loginFormElement.id = "loginForm";
    newsFeed.innerHTML = '';
    //root.innerHTML = ''; // Clear the modal window content
    newsFeed.appendChild(loginFormElement);*/

    // modalContainer.style.display = 'block'; // Show the modal container
    // modalOverlay.style.display = 'block'; // Show the modal overlay
  },
  '/feed': () => {
    newsFeed.innerHTML = ''; // Clear the modal window content
    newsFeed.appendChild(feedContent);
  },
};
// Add an event listener to close the modal window when the overlay is clicked
modalOverlay.addEventListener('click', (event) => {
  if (event.target == modalOverlay) {
    modalContainer.style.display = 'none'; // Hide the modal container
    modalOverlay.style.display = 'none'; // Hide the modal overlay
  }
});


/*window.onclick = function (event) {
  if (event.target == loginForm) {
    loginForm.style.display = 'none';
  }
};*/


// Update the default route to hide the modal window
const defaultRoute = () => {
  modalContainer.style.display = 'none'; // Hide the modal container
  modalOverlay.style.display = 'none'; // Hide the modal overlay
  // Add some sample text to the news feed
  newsFeed.innerHTML = '';
  const newsFeedText = document.createElement('p');
  newsFeedText.textContent = 'No events!';
  newsFeed.appendChild(newsFeedText);
  newsFeed.appendChild(responseElement);
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


//////////////////
