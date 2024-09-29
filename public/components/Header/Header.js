export class Header {
    renderHeader(userIsLoggedIn, logout) {
        const headerElement = document.createElement('header');

        // Логотип
        const logo = document.createElement('div');
        logo.className = 'logo';
        logo.textContent = 'Выходной';
        headerElement.appendChild(logo);

        const searchbar = document.createElement('input');
        searchbar.type = 'search';
        searchbar.className = 'searchbar'
        searchbar.placeholder = 'Найти событие';
        headerElement.appendChild(searchbar);
        headerElement.appendChild(searchbar);

        const buttons = document.createElement('div');
        buttons.className="buttons";


        if (!userIsLoggedIn) {
            //User is not logged in
      const btnLogin = document.createElement('button');
      const btnRegister = document.createElement('button');
      btnLogin.addEventListener('click', function() {
        window.location.href = '/login'; 
      });
      btnRegister.addEventListener('click', function() {
        window.location.href = '/signup';
      });
      
      btnRegister.setAttribute('href', '/register');

      btnLogin.className = "btnLogin"
      btnRegister.className = "btnRegister"
      
      btnLogin.textContent = "Войти"
      btnRegister.textContent = "Зарегистрироваться"
      buttons.appendChild(btnLogin);
      buttons.appendChild(btnRegister);
    } else {
        //User is logged in
      const profileLink = document.createElement('a');
      profileLink.href = '/profile';
      const avatarImage = document.createElement('img');
      avatarImage.src = 'avatar-image.png'; // replace with your avatar image path
      avatarImage.alt = 'Avatar';
      avatarImage.className = 'avatar'; // add a class to style the avatar image
      profileLink.appendChild(avatarImage);
      buttons.appendChild(profileLink);

      const logoutButton = document.createElement('button');
      logoutButton.textContent = 'Logout';
      logoutButton.onclick = async () => {
        try {
          const response = await fetch('http://localhost:8080/logout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          logout();
          // redirect to login page or clear the session
        } catch (error) {
          console.error(error);
          logout();
        }
      };
      buttons.appendChild(logoutButton);
    }

    headerElement.appendChild(buttons)
        // Добавляем список в навигацию и навигацию в заголовок

        return headerElement;
    }
}
