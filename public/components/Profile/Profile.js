import { endpoint } from "../../config.js";

export class Profile {
    renderProfile() {
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
        uploadButton.type = 'file';
        uploadButton.accept = 'image/*';
        uploadButton.addEventListener('change', this.uploadProfilePicture.bind(this));

        profilePictureContainer.appendChild(profilePicture);
        profilePictureContainer.appendChild(uploadButton);

        const formContainer = document.createElement('div');
        formContainer.classList.add('form-container');

        // Unchangeable fields
        const unchangeableFields = [
            { label: 'Username', id: 'username' },
            { label: 'Email', id: 'email' }
        ];

        unchangeableFields.forEach(field => {
            const fieldContainer = document.createElement('div');
            const label = document.createElement('label');
            label.textContent = field.label;
            label.setAttribute('for', field.id);

            const input = document.createElement('input');
            input.type = 'text';
            input.id = field.id;
            input.readOnly = true; // Make the field read-only

            fieldContainer.appendChild(label);
            fieldContainer.appendChild(input);
            formContainer.appendChild(fieldContainer);
        });

        // Changeable fields
        const changeableFields = [
            { label: 'Name', id: 'name', type: 'text' },
            { label: 'Surname', id: 'surname', type: 'text' },
            // { label: 'Password', id: 'password', type: 'password' },
        ];

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
        saveButton.textContent = 'Save Changes';
        saveButton.addEventListener('click', this.saveChanges.bind(this));
        formContainer.appendChild(saveButton);

        profileContainer.appendChild(profilePictureContainer);
        profileContainer.appendChild(formContainer);
        profileContent.appendChild(profileContainer);

        this.fetchProfileData().then(profileData => {
            if (profileData) {
                document.getElementById('username').value = profileData.username;
                document.getElementById('email').value = profileData.email;
                document.getElementById('name').value = profileData.name || '';
                document.getElementById('surname').value = profileData.surname || '';
                profilePicture.src = profileData.profilePictureUrl || '/static/images/default_avatar.png';
            }
        }).catch(error => {
            console.error('Error fetching profile data:', error);
        });

        profilePage.append(profileContent);
        return profilePage;
    }

    async uploadProfilePicture(event) {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('profilePicture', file);
        }
    }

    async fetchProfileData() {
        try {
            const response = await fetch(`${endpoint}/profile`, {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to fetch profile data');
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    }

    async saveChanges() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const email = document.getElementById('email').value;
        const name = document.getElementById('name').value;
        const surname = document.getElementById('surname').value;
        const dob = document.getElementById('dob').value;

        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('email', email);
        formData.append('name', name);
        formData.append('surname', surname);
        formData.append('dob', dob);

        try {
            const response = await fetch(`${endpoint}/profile`, {
                method: 'PUT',
                json: {email: email, username: username},
            });

            if (response.ok) {
                alert('Profile updated successfully!');
            } else {
                const errorText = await response.json();
                alert(`Error updating profile: ${errorText.message}`);
            }
        } catch (error) {
            console.error('Error saving profile data:', error);
        }
    }
}

