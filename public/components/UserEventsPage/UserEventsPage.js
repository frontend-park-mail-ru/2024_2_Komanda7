import { api } from "../../modules/FrontendAPI.js";
import { navigate } from "../../modules/router.js";
import { FeedElement } from "../FeedElement/FeedElement.js"
import { EventCreateForm } from "../EventCreateForm/EventCreateForm.js"

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
        console.log(id);
        //const path = '/events/'+id.toString();
        //const request = {headers: {}};
        /*try {
            const response = await api.get(path, request);

            const event = await response.json();
            console.log(event);
            console.log("here");
           
            this.renderEvent(event);
            //this.leftPart = document.createElement('leftPart');
            //this.rightPart = document.createElement('rightPart');
    
        } catch (error) {
            console.log(error);
            console.log("ERROR HERE");
            
        }*/
        const event = {};
        this.renderEvent(event);
        console.log(this.contentBody);
        return this.contentBody; 
    }
}