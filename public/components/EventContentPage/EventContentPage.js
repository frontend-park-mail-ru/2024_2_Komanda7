import { api } from "../../modules/FrontendAPI.js";
import { endpoint } from "../../config.js";
import { navigate } from "../../modules/router.js";

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
        });
        // создать метку
        const myPlacemark = new ymaps.Placemark([mock_data.latitude, mock_data.longitude], {
            hintContent: 'Место',
        }, {
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: '/static/images/location.png',
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
            this.src = "/static/images/placeholder.png";
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
