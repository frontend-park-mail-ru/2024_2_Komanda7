import { endpoint } from "../../config.js";
import { api } from '../../modules/FrontendAPI.js';
import { navigate } from "../../modules/router.js";

export class Profile {
    renderProfile(logout) {
        const profilePage = document.createElement('div');
        profilePage.id = 'profilePage';
        const profileContent = document.createElement('div');
        profileContent.id = 'profileContent';

        const profileContainer = document.createElement('div');
        profileContainer.classList.add('profile-container');

        const profilePictureContainer = document.createElement('div');
        profilePictureContainer.classList.add('profile-picture-container');

        const profilePicture = document.createElement('img');
        profilePicture.id = 'profileImage';
        profilePicture.onerror = function() {
            this.src = "/static/images/default_avatar.png";
            this.style.objectFit = 'fill';
        };
        profilePicture.alt = 'Profile Picture';

        // Button to upload new image
        const uploadButton = document.createElement('input');
        uploadButton.id = "avatarUpload";
        uploadButton.type = 'file';
        uploadButton.accept = 'image/*';
        uploadButton.addEventListener('change', this.uploadProfilePicture.bind(this));

        profilePictureContainer.appendChild(profilePicture);
        profilePictureContainer.appendChild(uploadButton);

        const formContainer = document.createElement('div');
        formContainer.classList.add('form-container');

        // Unchangeable fields
        const changeableFields = [
            { label: 'Имя пользователя', id: 'username' },
            { label: 'Электронная почта', id: 'email' }
        ];

        const errorMessage = document.createElement('label');
        errorMessage.id = 'errorMessage';
        formContainer.appendChild(errorMessage);
        const successMessage = document.createElement('label');
        successMessage.id = 'successMessage';
        formContainer.appendChild(successMessage);

        changeableFields.forEach(field => {
            const fieldContainer = document.createElement('div');
            const label = document.createElement('label');
            label.textContent = field.label;
            label.setAttribute('for', field.id);

            const input = document.createElement('input');
            input.type = field.type;
            input.id = field.id;

            fieldContainer.appendChild(label);
            fieldContainer.appendChild(input);
            formContainer.appendChild(fieldContainer);
        });

        const saveButton = document.createElement('button');
        saveButton.textContent = 'Сохранить изменения';
        saveButton.addEventListener('click', this.saveChanges.bind(this));
        formContainer.appendChild(saveButton);

        const logoutButton = document.createElement('button');
        logoutButton.textContent = 'Выйти из аккаунта';
        logoutButton.onclick = async() => {
            try {
              const response = await fetch(`${endpoint}/logout`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                credentials: "include"
              });
              if (!response.ok) {
                throw new Error(response.statusText);
              }
              logout();
              navigate('events');
            } catch (error) {
              console.error(error);
            }
          };
        formContainer.appendChild(logoutButton);

        profileContainer.appendChild(profilePictureContainer);
        profileContainer.appendChild(formContainer);
        profileContent.appendChild(profileContainer);

        this.fetchProfileData().then(profileData => {
            if (profileData) {
                document.getElementById('username').value = profileData.username;
                document.getElementById('email').value = profileData.email;
                profilePicture.src = endpoint + '/' + profileData.image || '/static/images/default_avatar.png';
            }
        }).catch(error => {
            console.error('Error fetching profile data:', error);
        });

        profilePage.append(profileContent);
        return profilePage;
    }

    async uploadProfilePicture(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        
        // Set up the onload event for the FileReader
        reader.onload = (e) => {
            // Update the src of the profile picture with the uploaded image
            document.getElementById('profileImage').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    async fetchProfileData() {
        try {
            const request = {
                headers: {

                },
                credentials: 'include',
            };
            const response = await api.get('/session', request);

            if (!response.ok) {
                throw new Error('Failed to fetch profile data');
            }
            const data = await response.json(); // Ожидаем завершения выполнения
            console.log(data.user);
            return await data.user;
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    }

    async saveChanges() {
        const profileData = await this.fetchProfileData().user;
        let username = '';
        let email = '';
        if (document.getElementById('username').value !== profileData.username) {
            username = document.getElementById('username').value;
        }
        if (document.getElementById('email').value !== profileData.email) {
            email = document.getElementById('email').value;
        }
        const image = '' || document.getElementById('avatarUpload').files[0];
        try {
            const userData = {
                email: email, 
                username: username,
            };
            const json = JSON.stringify(userData);
            const formData = new FormData();
            formData.append('json', json);
            formData.append('image', image);
            const body = formData;
            const request = {
                    headers: {

                    },
                    credentials: 'include',
                    body: body,
                };
            const path = '/profile';
            const response = await api.put(path, request);

            if (response.ok) {
                document.getElementById('successMessage').innerText = 'Профиль успешно обновлён!';
                document.getElementById('errorMessage').innerText = '';
            } else {
                document.getElementById('successMessage').innerText = '';
                document.getElementById('errorMessage').innerText = 'Ошибка!';
                const errorText = await response.json();
            }
        } catch (error) {
            document.getElementById('errorMessage').innerText = 'Ошибка сохранения ' + JSON.stringify(error.status);
        }
    }
}

