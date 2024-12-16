import { navigate } from "../../modules/router.js";

export class UserEventsPage {
    constructor(eventId) {
        this.contentBody = document.createElement('div');
        this.contentBody.className = 'userEventManager';

        this.eventId = eventId;
    }
    config = {
        createBtn: {
        },
        tag: {
            text: '',
            tag: 'label',
            className: 'actions',
        },
        image: {
            text: '',
            tag: 'label',
            className: '',
            src: '',
        },

    };

    _formUsersEvents(divToAppend) {
        
    }

    renderEvent(event){
        
        const createEventDiv = document.createElement('div');
        createEventDiv.className = 'actions';

        const btnCreate = document.createElement('button');
        btnCreate.className = 'createEvent';
        btnCreate.textContent = 'Добавить мероприятие';

        btnCreate.addEventListener('click', (event) => {
          event.preventDefault();
          const path = '/add_event';
          navigate(path);})

        createEventDiv.appendChild(btnCreate);

        const userEventsDiv = document.createElement('div');
        this._formUsersEvents(userEventsDiv);

        this.contentBody.appendChild(createEventDiv);
        this.contentBody.appendChild(userEventsDiv);
         
    }
    async renderTemplate(id) {
        const event = {};
        this.renderEvent(event);
        return this.contentBody; 
    }
}