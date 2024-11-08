/**
 * LoginForm class
 */
import { api } from '../../modules/FrontendAPI.js';
export class EditEventForm {
   
    constructor(formId) {
      this.form = document.createElement('form');
      this.form.id = formId;
    }
    async init(id) {
        const path = `/events/${id}`;
        const request = { headers: {} };
        try {
            const response = await api.get(path, request);
            const event = await response.json();
            console.log("Fetched event data:", event);
            this._renderEvent(event); // Assuming you have a method to render the event
        } catch (error) {
            console.log(error);
            console.log("Ошибка при загрузке события");
        }
    }
    _renderEvent(event) {
        // Сопоставляем ключи из события с полями формы
        const mapping = {
            title: 'eventNameEntry',
            description: 'eventDescriptionEntry',
            category_id: 'categories',
        };
        const time = {
            event_start: 'eventBeginEntry',
            event_end: 'eventEndEntry',
        }
        for (const key in mapping) {
            const inputElement = this.form.querySelector(`[id="${mapping[key]}"]`);
            if (inputElement) {
                console.log(`Updating ${mapping[key]} with value: ${event[key]}`);
                inputElement.value = event[key];
            }
        }
        for (const key in time) {
            const inputElement = this.form.querySelector(`[id="${time[key]}"]`);
            if (inputElement) {
                console.log(`Updating ${time[key]} with value: ${event[key]}`);
                inputElement.value = formatDateTimeForInput(event[key]);
            }
        }
    }

    config = {
        eventServerError: {
            text: '',
            tag: 'label',
            className: 'error_text',
            type: '',
        },
        eventAddLabel: {
            text: 'Создать мероприятие',
            tag: 'label',
            className: '',
            type: '',
        },
        eventNameEntry: {
            text: 'Название мероприятия',
            tag: 'input',
            type: 'text',
            className: '',
        },
        eventNameError: {
            text: '',
            tag: 'label',
            className: 'error_text',
            type: '',
        },
        eventDescriptionEntry: {
            text: 'Описание мероприятия',
            tag: 'textarea',
            type: '',
            className: '',
        },
        eventDescriptionError: {
            text: '',
            tag: 'label',
            className: 'error_text',
            type: '',
        },
        eventTagsEntry: {
            text: 'Тэги (не более 3 штук)',
            tag: 'input',
            type: '',
            className: '',
        },
        eventTagsError: {
            text: '',
            tag: 'label',
            className: 'error_text',
            type: '',
        },
        eventBeginEntry: {
            text: 'Время начала мероприятия',
            tag: 'input',
            type: 'datetime-local',
            className: '',
        },
        eventBeginError: {
            text: '',
            tag: 'label',
            className: 'error_text',
            type: '',
        },
        eventEndEntry: {
            text: 'Время окончания мероприятия',
            tag: 'input',
            type: 'datetime-local',
            className: '',
        },
        eventEndError: {
            text: '',
            tag: 'label',
            className: 'error_text',
            type: '',
        },
        imageInput: {
            text: '',
            tag: 'input',
            className: '',
            type: 'file',
            accept: "image/png, image/jpeg",
        },
        categories: {
            text: '',
            tag: 'div',
            className: '',
            type: '',
        },
        editSubmitBtn: {
            text: 'Изменить',
            tag: 'button',
            type: 'submit',
            className: '',
        },
    };
  
    /**
     * Renders the form template
     * @returns {HTMLFormElement} The rendered form
     */
    renderTemplate(selectElement) {
      
      const template = Handlebars.templates['EditEventForm.hbs'];

      const config = this.config;
      let itemsArray = Object.entries(config);
      let items = itemsArray.map(([key, {tag, text, className, type}], index) => {
        let needPlaceholder = (tag === 'input');
        let needMaxMinTime = (type === 'time');
        return {key, tag, text, className, type, needPlaceholder, needMaxMinTime}; 
      });
      //console.log(items);
  
      this.form.innerHTML += template({items});
  
      const categoriesSelect = selectElement;
      selectElement.id = 'categoriesInput';
      this.form.appendChild(categoriesSelect);

      //const createBtn = document.getElementById('createBtn');
      //createBtn.addEventListener();
      
      return this.form;
    }
  }
  function formatDateTimeForInput(dateTime) {
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }