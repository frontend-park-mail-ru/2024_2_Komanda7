import { api } from "../../modules/FrontendAPI.js";
import { endpoint } from "../../config.js";
import { navigate } from "../../modules/router.js";

export class StatsPage {
    constructor(eventId) {
        this.contentBody = document.createElement('div');
        this.contentBody.className = 'eventPage';
        this.eventId = eventId;

        
    }

    _formAnswer(answer) {
        //const answerDiv = document.createElement('div');

        const template = Handlebars.templates['answerDiv.hbs'];

        const questionAndValue = {};
        ///title questyion
        questionAndValue['title'] = answer.title;

        // answer question
        questionAndValue['value'] = answer.value;


        //answerDiv.innerHTML += template({ questionAndValue });
        //return answerDiv;
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

        const statsDetails = document.createElement('div');
        statsDetails.className = 'event__details';

        const statsTitle = document.createElement('div');
        statsTitle.className = 'event__title';
        statsTitle.textContent = 'Статистика опросов';

        statsDetails.appendChild(statsTitle);


        

        //for cicle for each answer got from back
        // render title and value

        console.log(stats);

        for (const key in stats) {
            console.log(stats[key]);
            const divAnswer = this._formAnswer(stats[key]);
            //statsDetails.appendChild(divAnswer);
            statsDetails.innerHTML += divAnswer;
            console.log(divAnswer);
        }
        this.contentBody.appendChild(statsDetails);
    }

    async renderTemplate() {
        const path = `/stats`;
        const request = { headers: {} };

        try {
            //const response = await api.get(path, request);
            //const stats = await response.json();
            const stats = {ans1 : {title: ' titl1 1', value: '1'}};
            this._renderStats(stats);

        } catch (error) {
            console.log(error);
            console.log("Ошибка при загрузке страницы статистики");
        }

        return this.contentBody;
    }
}
