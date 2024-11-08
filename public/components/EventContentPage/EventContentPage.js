import { api } from "../../modules/FrontendAPI.js";
import { navigate } from "../../modules/router.js";
import { handleDeleteEventSubmit } from "../../modules/handleEventsActions.js";
import {endpoint} from "../../config.js"

export class EventContentPage {
    constructor(eventId) {
        this.contentBody = document.createElement('div');
        this.contentBody.className = 'eventPage';

        this.eventId = eventId;
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

    _renderEvent(event){
        console.log(event);
        console.log(event.title);
        
        const leftDiv = document.createElement('div');
        leftDiv.className = 'event__leftPart';
        
        const title = document.createElement('div');
        title.className = 'event__leftPart__title ';
        title.textContent = event.title;

        const image = document.createElement('img');
        image.className = 'image';
        image.src = endpoint + '/' + event.image || "/static/images/placeholder.png"; //this.config.image.src;
       
        const descr = document.createElement('div');            /** render event  */
        //descr.className = 'title';
        descr.textContent = event.description;
        
        leftDiv.appendChild(title);
        leftDiv.appendChild(image);
        leftDiv.appendChild(descr);

        const rightDiv = document.createElement('div');
        rightDiv.className = 'event__rightPart';

        const actionsDiv = document.createElement('div');
        rightDiv.className = 'event_actionsDiv';

        

        this.btnEditEvent = document.createElement('button');
        this.btnEditEvent.className = 'buttonEdit';
        this.btnEditEvent.textContent = 'Редактировать мероприятие';

        this.btnDeleteEvent = document.createElement('button');
        this.btnDeleteEvent.className = 'buttonDelete';
        this.btnDeleteEvent.textContent = 'Удалить мероприятие';

        actionsDiv.appendChild(this.btnEditEvent);
        actionsDiv.appendChild(this.btnDeleteEvent);
        
        const tagsDiv = document.createElement('div');
        tagsDiv.className = 'event_tagsDiv';
        tagsDiv.textContent = event.tag[0];
        
        const startDate = document.createElement('div');
        startDate.className = 'event__date';
        startDate.textContent = 'Дата начала: ' + event.date_start; // 

        const endDate = document.createElement('div');
        endDate.className = 'event__date';
        endDate.textContent = 'Дата окончания: ' + event.date_end; // 

        rightDiv.appendChild(actionsDiv);
        rightDiv.appendChild(tagsDiv);
        rightDiv.appendChild(startDate);
        rightDiv.appendChild(endDate);
               
        // Добавляем левую и правую части в основной контейнер
        this.contentBody.appendChild(leftDiv);
        this.contentBody.appendChild(rightDiv);
         
    }
    async renderTemplate(id) {
        console.log(id);
        const path = '/events/'+id.toString();
        const request = {headers: {}};
        try {
            const response = await api.get(path, request);

            const eventCon = await response.json();
            this._renderEvent(eventCon);

           
            console.log(this.btnDeleteEvent);

            this.btnDeleteEvent.addEventListener('click', (event)=>{handleDeleteEventSubmit(event, id, '/events')});
    
        } catch (error) {
            console.log(error);
            console.log("ERROR HERE");
            /* some more useful error handling */
        }
       return this.contentBody; 
    }
}