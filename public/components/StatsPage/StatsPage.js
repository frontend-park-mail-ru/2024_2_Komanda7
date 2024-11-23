import { api } from "../../modules/FrontendAPI.js";
import { endpoint } from "../../config.js";
import { navigate } from "../../modules/router.js";

export class StatsPage {
    constructor(eventId) {
        this.contentBody = document.createElement('div');
        this.contentBody.className = 'eventPage';
        this.eventId = eventId;
        //this.contentBody.className = 'event-edit-form';

        
    }

    _formAnswer(answer) {
        //const answerDiv = document.createElement('div');

        const template = Handlebars.templates['answerDiv.hbs'];

        const questionAndValue = {};
        ///title questyion
        questionAndValue['title'] = answer.title;

        // answer question
        questionAndValue['value'] = answer.value;

        return template(questionAndValue );
    }
  
    config = {
        mainHeader: {
            text:'Статистика опросов',
        },
        author: {
            text: '',
            tag: 'label',
            className: '',
        },
        
        titleQuestion: {
            text: '',
            tag: 'label',
            className: '',
        },
        valueQuestion: {
            text: '',
            tag: 'input',
            className: '',
        },
        
    };
    /** ststs - json object from backend with titles and values*/
    async _renderStats(stats) {

        const statsDetails = document.createElement('form');
        statsDetails.className = 'statistics-get';

        const statsTitle = document.createElement('div');
        statsTitle.className = 'statistics-get__title';
        statsTitle.textContent = 'Статистика опросов';

        statsDetails.appendChild(statsTitle);


        

        //for cicle for each answer got from back
        // render title and valu

        for (const key in stats) {
            const divAnswer = this._formAnswer(stats[key]);
            //statsDetails.appendChild(divAnswer);
            statsDetails.innerHTML += divAnswer;
        }
        //this.contentBody.appendChild(statsDetails);
        this.contentBody = statsDetails;
    }
 
    async renderTemplate() {
        const path = `/stats`;
        const request = { headers: {} };

        try {
            const response = await api.get(path, request);
            const stats = await response.json();
           /* const stats = {ans1 : {title: 'Статистика по странице мероприятия', value: '5.63'},
            ans2 : {title: 'Статистика по странице мероприятия', value: '4.5'},
            ans3 : {title: 'Статистика по странице мероприятия', value: '10'}};*/
            this._renderStats(stats);

        } catch (error) {
            console.log(error);
            console.log("Ошибка при загрузке страницы статистики");
        }

        return this.contentBody;
    }
}
