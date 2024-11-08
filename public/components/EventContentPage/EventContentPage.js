import { api } from "../../modules/FrontendAPI.js";

export class EventContentPage {
    constructor(eventId) {
        this.contentBody = document.createElement('div');
        this.contentBody.className = 'eventPage';
        this.eventId = eventId;
    }
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

    _renderEvent(event) {
        console.log(event);

        const eventDetails = document.createElement('div');
        eventDetails.className = 'event__details';

        const eventTitle = document.createElement('div');
        eventTitle.className = 'event__title';
        eventTitle.textContent = event.title;

        const eventImage = document.createElement('img');
        eventImage.className = 'event__image';
        eventImage.src = this.config.image.src;
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

        const editButton = document.createElement('button');
        editButton.className = 'buttonEdit';
        editButton.textContent = 'Редактировать мероприятие';

        eventActions.appendChild(editButton);
        eventActions.appendChild(deleteButton);

        this.contentBody.appendChild(eventDetails);
        this.contentBody.appendChild(eventActions);
    }

    async renderTemplate(id) {
        console.log(id);
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
}
