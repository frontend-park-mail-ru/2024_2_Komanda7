import { api } from "../../modules/FrontendAPI.js";
import { endpoint } from "../../config.js";
import { navigate } from "../../modules/router.js";
import locationIcon from '../../assets/images/location.png';
import placeholderImage from '../../assets/images/placeholder.png';

export class EventContentPage {
    constructor(eventId) {
        this.contentBody = document.createElement('div');
        this.contentBody.className = 'eventPage';
        this.eventId = eventId;
    }
    init(mock_data) {
        var myMap = new ymaps.Map("map", {
            center: [mock_data.latitude, mock_data.longitude], // Координаты центра карты
            zoom: mock_data.zoom,
            controls: ['geolocationControl', 'typeSelector', 'fullscreenControl', 'zoomControl', 'rulerControl'],
        });
        // создать метку
        const myPlacemark = new ymaps.Placemark([mock_data.latitude, mock_data.longitude], {
            hintContent: 'Место',
        }, {
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: locationIcon,
            iconImageSize: [32, 32],
            iconImageOffset: [-16, -32]
        });
        myPlacemark.events.add('click', () => {
            //navigate(mock_data.id);
        });
        myMap.geoObjects.add(myPlacemark);
    };
    _formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('ru-RU', options);
    }

    config = {
        author: {
            text: '',
            tag: 'label',
            className: '',
        },
        dateStart: {
            text: '',
            tag: 'label',
            className: '',
        },
        dateEnd: {
            text: '',
            tag: 'label',
            className: '',
        },
        title: {
            text: '',
            tag: 'label',
            className: '',
        },
        description: {
            text: '',
            tag: 'label',
            className: '',
        },
        tag: {
            text: '',
            tag: 'label',
            className: '',
        },
        image: {
            text: '',
            tag: 'label',
            className: '',
            src: '',
        },
    };

    async _renderEvent(event) {
    const possession = await this.checkPossession();
    const myFavorites = await this.checkFavorites();
    const mySubsribtions = await this.checkSubscribe();

    let inSub = mySubsribtions.includes(event.id);

    let isFavorite = myFavorites.includes(event.id);

    const eventAuthor = document.createElement('div');
    eventAuthor.className = 'event__author';

    const subscribeButton = document.createElement('button');
    subscribeButton.className = 'buttonSubscribe';
    if (inSub) {
        subscribeButton.textContent = 'Отписаться';
    }
    else {
        subscribeButton.textContent = 'Подписаться';
    }
    subscribeButton.addEventListener("click", async () => {
        const request = {
            headers: {
            },
            credentials: 'include',
        };
        if (inSub) {
            const path = `/profile/subscribe/${event.author}`;
            try {
                const response = await api.delete(path, request);    
            } catch (error) {
                console.log(error);
            }
        }
        else {
            const path = `/profile/subscribe/${event.author}`;
            try {
                const response = await api.post(path, request);    
            } catch (error) {
                console.log(error);
            }
        }
        inSub = inSub ^ 1;
        if (inSub) {
            subscribeButton.textContent = 'Отписаться';
        }
        else {
            subscribeButton.textContent = 'Подписаться';
        }
    });

    if (possession > 0){
        eventAuthor.appendChild(subscribeButton);
    };
    
    const authorText = document.createElement('div');
    authorText.textContent = `Автор: ${event.author}`;
    authorText.className = 'authorText';
    eventAuthor.appendChild(authorText);

        const eventDetails = document.createElement('div');
        eventDetails.className = 'event__details';

        const eventTitle = document.createElement('div');
        eventTitle.className = 'event__title';
        eventTitle.textContent = event.title;

        const eventImage = document.createElement('img');
        eventImage.className = 'event__image';
        eventImage.src = endpoint + '/' + event.image;
        eventImage.onerror = function () {
            this.src = placeholderImage;
            this.style.objectFit = 'fill';
        };

        const tagsDiv = document.createElement('div');
        tagsDiv.className = 'event__tags';
        event.tag.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'event__tag';
            tagElement.textContent = tag;
            tagElement.addEventListener('click', (event) => {
                event.preventDefault();
                const path = `/search?tags=${tag}`;
                navigate(path);
            })
            tagsDiv.appendChild(tagElement);
        });

        const eventStartDate = document.createElement('div');
        eventStartDate.className = 'event__date';
        eventStartDate.textContent = `Дата начала: ${this._formatDate(event.event_start)}`;

        const eventEndDate = document.createElement('div');
        eventEndDate.className = 'event__date';
        eventEndDate.textContent = `Дата окончания: ${this._formatDate(event.event_end)}`;

        const eventInfoRow = document.createElement('div');
        eventInfoRow.className = 'event__info-row';
        eventInfoRow.appendChild(tagsDiv);
        eventInfoRow.appendChild(eventStartDate);
        eventInfoRow.appendChild(eventEndDate);

        const eventDescription = document.createElement('div');
        eventDescription.className = 'event__description';
        eventDescription.textContent = event.description;

        eventDetails.appendChild(eventTitle);
        eventDetails.appendChild(eventImage);
        eventDetails.appendChild(eventInfoRow);
        eventDetails.appendChild(eventDescription);

        const eventActions = document.createElement('div');
        eventActions.className = 'event__actions';

        const deleteButton = document.createElement('button');
        deleteButton.className = 'buttonDelete';
        deleteButton.textContent = 'Удалить мероприятие';
        deleteButton.addEventListener("click", async () => {
            const request = {
                headers: {
                },
                credentials: 'include',
            };
            const response = await api.delete(`/events/${event.id}`, request);
            navigate('/events/my');
        });

        const editButton = document.createElement('button');
        editButton.className = 'buttonEdit';
        editButton.textContent = 'Редактировать мероприятие';
        editButton.addEventListener("click", () => {
            const currentPath = window.location.pathname;
            navigate(currentPath + "/edit");
        });

        //array of post ids
        
        const favoritesAddButton = document.createElement('button');
        favoritesAddButton.className = 'buttonSubscribe';

        if (isFavorite) {
            favoritesAddButton.textContent = 'Удалить из избранных';
        } else {
            favoritesAddButton.textContent = 'Добавить в избранные';
        };
        favoritesAddButton.addEventListener("click", async () => {
            const request = {
                headers: {
                },
                credentials: 'include',
            };
            if (isFavorite) {
                const path = `/events/favorites/${event.id}`;
                try {
                    const response = await api.delete(path, request);    
                } catch (error) {
                    console.log(error);
                }
            }
            else {
                const path = `/events/favorites/${event.id}`;
                try {
                    const response = await api.post(path, request);    
                } catch (error) {
                    console.log(error);
                }
            }
            isFavorite = isFavorite ^ 1;
            if (isFavorite) {
                favoritesAddButton.textContent = 'Удалить из избранных';
            } else {
                favoritesAddButton.textContent = 'Добавить в избранные';
            };
        });
        if (possession > 0) {
            eventActions.appendChild(favoritesAddButton);
        }

        const inviteButton = document.createElement('button');
        inviteButton.className = 'buttonInvite';
        inviteButton.textContent = 'Пригласить';
        inviteButton.addEventListener("click", async () => {
            // Создаем затемняющий фон
            const overlay = document.createElement('div');
            overlay.className = 'overlay';
            document.body.appendChild(overlay);

            // Создаем контейнер для приглашений
            const inviteContainer = document.createElement('div');
            inviteContainer.className = 'invite-container';
            inviteContainer.style.display = 'block';
            await this.loadInvitations(inviteContainer); // Загружаем список приглашений

            // Добавляем inviteContainer в overlay
            overlay.appendChild(inviteContainer);

            // Закрытие модального окна при клике на overlay
            overlay.addEventListener('click', () => {
                document.body.removeChild(overlay);
            });
        });
        eventActions.appendChild(inviteButton);

        if (event.author == possession) {
            eventActions.appendChild(editButton);
            eventActions.appendChild(deleteButton);
        }
        else {
            eventDetails.appendChild(eventAuthor);
        }

        this.contentBody.appendChild(eventDetails);
        this.contentBody.appendChild(eventActions);
        // Create map container
        const mapContainer = document.createElement('div');
        mapContainer.id = 'map';
        this.contentBody.appendChild(mapContainer);
        const eventLocation = {latitude: event.Latitude, longitude: event.Longitude, zoom: 10};
        // Initialize map after appending to DOM
        ymaps.ready(() => this.init(eventLocation));
    }

    async loadInvitations(container) {
        try {
            const response = await api.get('/profile/subscribe', {
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Ошибка загрузки подписчиков');
            }

            const invitations = await response.json();
            container.innerHTML = ''; // Очищаем контейнер

            if (invitations.length === 0) {
                const emptyMessage = document.createElement('div');
                emptyMessage.className = 'notification-item';
                emptyMessage.textContent = 'Нет подписчиков';
                container.appendChild(emptyMessage);
                return;
            }

            invitations.forEach(invitation => {
                const invitationItem = document.createElement('div');
                invitationItem.className = 'notification-item';
        
                // Создаем элемент для аватарки
                const avatarImage = document.createElement('img');
                avatarImage.src = invitation.avatar;
                avatarImage.alt = `${invitation.username}`;
                avatarImage.className = 'avatar-image';
                invitationItem.appendChild(avatarImage);
        
                const usernameText = document.createElement('span');
                usernameText.textContent = `Пригласить ${invitation.username}`;
                invitationItem.appendChild(usernameText);
        
                invitationItem.addEventListener('click', async () => {
                    const inviterId = await this.checkPossession(); // Получаем текущий user_id
                    const eventId = window.location.pathname.split('/').pop(); // Получаем ID события из URL
                    const userId = invitation.user_id;

                    const requestBody = {
                        event_id: eventId,
                        user_id: userId,
                        inviter_id: inviterId
                    };

                    const request = {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include',
                        body: JSON.stringify(requestBody),
                    };
                    console.log(requestBody);
                    try {
                        const response = await api.post('/invite', request);
                        if (response.ok) {
                            console.log('Приглашение отправлено');
                        } else {
                            console.error('Ошибка при отправке приглашения');
                        }
                    } catch (error) {
                        console.error('Ошибка при отправке запроса:', error);
                    }
                });
        
                container.appendChild(invitationItem);
            });
        } catch (error) {
            console.error('Ошибка при загрузке приглашений:', error);
        }
    }

    async renderTemplate(id) {
        const path = `/events/${id}`;
        const request = { headers: {} };

        try {
            const response = await api.get(path, request);
            const event = await response.json();
            this._renderEvent(event);
        } catch (error) {
            console.log(error);
            console.log("Ошибка при загрузке события");
        }

        return this.contentBody;
    }
    async checkPossession() {
        const path = `/session`;
        const request = { headers: {}, credentials: "include" };

        try {
            const response = await api.get(path, request);
            const event = await response.json();
            
            return event.user.id;

        } catch (error) {
            return -1;
        }
    }
    async checkFavorites() {
        const path = `/events/favorites`;
        const request = { headers: {}, credentials: "include" };

        try {
            const response = await api.get(path, request);
            const answer = await response.json();
            const arr = Array.from(answer.events, (ev) => ev.id);
            return arr;

        } catch (error) {
            return [];
        }
    }
    async checkSubscribe() {
        const path = `/events/subscription`;
        const request = { headers: {}, credentials: "include" };

        try {
            const response = await api.get(path, request);
            const answer = await response.json();
            const arr = Array.from(answer.events, (ev) => ev.id);
            return arr;

        } catch (error) {
            return [];
        }
    }
}
