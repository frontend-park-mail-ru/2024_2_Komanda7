/**
 * EditEventForm class
 */
import { api } from '../../modules/FrontendAPI.js';
export class EditEventForm {
    constructor(formId) {
        this.form = document.createElement('form');
        this.form.id = formId;
        this.form.className = 'event-edit-form';
    }
    async init(id) {
        const path = `/events/${id}`;
        const request = { headers: {} };
        try {
            const response = await api.get(path, request);
            const event = await response.json();
            console.log("Fetched event data:", event);
            this._renderEvent(event);
        } catch (error) {
            console.log(error);
            console.log("Ошибка при загрузке события");
        }
    }
    _renderEvent(event) {
        const mapping = {
            title: 'eventNameEntry',
            description: 'eventDescriptionEntry',
            category_id: 'categories',
        };
        const time = {
            event_start: 'eventBeginEntry',
            event_end: 'eventEndEntry',
        };
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
            className: 'event-edit-form__error-text',
            type: '',
        },
        eventAddLabel: {
            text: 'Редактировать мероприятие',
            tag: 'label',
            className: 'event-edit-form__title',
            type: '',
        },
        eventNameEntry: {
            text: 'Название мероприятия',
            tag: 'input',
            type: 'text',
            className: 'event-edit-form__input',
        },
        eventNameError: {
            text: '',
            tag: 'label',
            className: 'event-edit-form__error-text',
            type: '',
        },
        eventDescriptionEntry: {
            text: 'Описание мероприятия',
            tag: 'textarea',
            type: '',
            className: 'event-edit-form__textarea',
        },
        eventDescriptionError: {
            text: '',
            tag: 'label',
            className: 'event-edit-form__error-text',
            type: '',
        },
        eventTagsEntry: {
            text: 'Тэги (не более 3 штук)',
            tag: 'input',
            type: 'text',
            className: 'event-edit-form__input',
        },
        eventTagsError: {
            text: '',
            tag: 'label',
            className: 'event-edit-form__error-text',
            type: '',
        },
        eventBeginEntry: {
            text: 'Время начала мероприятия',
            tag: 'input',
            type: 'datetime-local',
            className: 'event-edit-form__input event-edit-form__input--datetime-local',
        },
        eventBeginError: {
            text: '',
            tag: 'label',
            className: 'event-edit-form__error-text',
            type: '',
        },
        eventEndEntry: {
            text: 'Время окончания мероприятия',
            tag: 'input',
            type: 'datetime-local',
            className: 'event-edit-form__input event-edit-form__input--datetime-local',
        },
        eventEndError: {
            text: '',
            tag: 'label',
            className: 'event-edit-form__error-text',
            type: '',
        },
        imageInput: {
            text: '',
            tag: 'input',
            className: 'event-edit-form__input event-edit-form__input--file',
            type: 'file',
            accept: "image/png, image/jpeg",
        },
        categories: {
            text: '',
            tag: 'div',
            className: 'event-edit-form__categories-select',
            type: '',
        },
        editSubmitBtn: {
            text: 'Изменить',
            tag: 'button',
            type: 'submit',
            className: 'event-edit-form__submit-btn',
        },
    };
    /**
     * Renders the form template
     * @returns {HTMLFormElement} The rendered form
     */
    renderTemplate(selectElement) {
        const template = Handlebars.templates['EditEventForm.hbs'];
        const config = this.config;
        const itemsArray = Object.entries(config);
        const items = itemsArray.map(([key, { tag, text, className, type }]) => ({
            key,
            tag,
            text,
            className,
            type,
            needPlaceholder: tag === 'input',
            needMaxMinTime: type === 'time',
        }));
        this.form.innerHTML = template({ items });
        const categoriesSelect = selectElement;
        categoriesSelect.classList.add('event-edit-form__categories');
        categoriesSelect.id = 'categoriesInput';
        this.form.insertBefore(categoriesSelect, this.form.querySelector('.event-edit-form__submit-btn'));
        return this.form;
    }
}
function formatDateTimeForInput(dateTime) {
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}
