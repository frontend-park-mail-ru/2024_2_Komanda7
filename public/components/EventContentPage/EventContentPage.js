import { api } from "../../modules/FrontendAPI.js";

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
        image.src = this.config.image.src;
        image.onerror = function() {
            this.src = "/static/images/placeholder.png";
            this.style.objectFit = 'fill';
        };

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

        const btnDeleteEvent = document.createElement('button');
        btnDeleteEvent.className = 'buttonDelete';
        btnDeleteEvent.textContent = 'Удалить мероприятие';

        const btnEditEvent = document.createElement('button');
        btnEditEvent.className = 'buttonEdit';
        btnEditEvent.textContent = 'Редактировать мероприятие';
        
        actionsDiv.appendChild(btnEditEvent);
        actionsDiv.appendChild(btnDeleteEvent);

        const tagsDiv = document.createElement('div');
        tagsDiv.className = 'event_tagsDiv';
        tagsDiv.textContent = event.tag[0];
        
        const startDate = document.createElement('div');
        startDate.className = 'event__date';
        startDate.textContent = 'Дата начала: ' + event.date_start; // Укажите вашу дату начала

        const endDate = document.createElement('div');
        endDate.className = 'event__date';
        endDate.textContent = 'Дата окончания: ' + event.date_end; // Укажите вашу дату окончания

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

            const event = await response.json();
            this._renderEvent(event);
    
        } catch (error) {
            console.log(error);
            console.log("ERROR HERE");
            /* some more useful error handling */
        }
       return this.contentBody; 
    }
}