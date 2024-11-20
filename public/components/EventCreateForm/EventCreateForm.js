import { api } from '../../modules/FrontendAPI.js';

export class EventCreateForm {
    constructor(formId) {
      this.form = document.createElement('form');
      this.form.id = formId;
      this.form.className = 'event-create-form'; 
    }

    config = {
      eventServerError: {
        text: '',
        tag: 'label',
        className: 'event-create-form__error-text',
        type: '',
      },

      eventAddLabel: {
        text: 'Создать мероприятие',
        tag: 'label',
        className: 'event-create-form__title',
        type: '',
      },
      
      eventNameEntry: {
        text: 'Название мероприятия',
        tag: 'input',
        type: 'text',
        className: 'event-create-form__input',
      },
      
      eventNameError: {
        text: '',
        tag: 'label',
        className: 'event-create-form__error-text',
        type: '',
      },
      
      eventDescriptionEntry: {
        text: 'Описание мероприятия',
        tag: 'textarea',
        type: '',
        className: 'event-create-form__textarea',
      },
      
      eventDescriptionError: {
        text: '',
        tag: 'label',
        className: 'event-create-form__error-text',
        type: '',
      },

      eventTagEntry: {
        text: 'Тэги (не более 3 штук)',
        tag: 'input',
        type: 'text',
        className: 'event-create-form__input',
      },
     
      eventTagsError: {
        text: '',
        tag: 'label',
        className: 'event-create-form__error-text',
        type: '',
      },

      eventBeginEntry: {
        text: 'Время начала мероприятия',
        tag: 'input',
        type: 'datetime-local',
        className: 'event-create-form__input event-create-form__input--datetime-local',
      },
      
      eventBeginError: {
        text: '',
        tag: 'label',
        className: 'event-create-form__error-text',
        type: '',
      },

      eventEndEntry: {
        text: 'Время окончания мероприятия',
        tag: 'input',
        type: 'datetime-local',
        className: 'event-create-form__input event-create-form__input--datetime-local',
      },

      eventEndError: {
        text: '',
        tag: 'label',
        className: 'event-create-form__error-text',
        type: '',
      },

      imageInput: {
        text: '',
        tag: 'input',
        className: 'event-create-form__input event-create-form__input--file',
        type: 'file',
        accept: 'image/png, image/jpeg',
      },

      categories: {
        text: '',
        tag: 'div',
        className: 'event-create-form__categories-select',
        type: '',
      },
     
      eventSubmitBtn: {
        text: 'Создать',
        tag: 'button',
        type: 'submit',
        className: 'event-create-form__submit-btn',
      },
    };
  
    /**
     * Renders the form template
     * @returns {HTMLFormElement} The rendered form
     */
    renderTemplate(selectElement) {
      const template = Handlebars.templates['EventCreateForm.hbs'];
      
      const config = this.config;
      const itemsArray = Object.entries(config);
      const items = itemsArray.map(([key, { tag, text, className, type }]) => ({
        key,
        tag,
        text,
        className,
        type,
        needPlaceholder: tag === 'input',
        needMaxMinTime: type === 'time'
      }));
    
      this.form.innerHTML = template({ items });
    
      const categoriesSelect = selectElement;
      categoriesSelect.classList.add('event-create-form__categories');
      categoriesSelect.id = 'categoriesInput';
      this.form.insertBefore(categoriesSelect, this.form.querySelector('.event-create-form__submit-btn'));
      // Создание контейнера для карты
      const mapContainer = document.createElement('div');
      mapContainer.id = 'map';
      mapContainer.style.width = '100%'; // Ширина карты
      mapContainer.style.height = '400px'; // Высота карты
      this.form.insertBefore(mapContainer, this.form.querySelector('.event-create-form__submit-btn'));

      // Инициализация карты
      const mock_data = { latitude: 55.79720450649618, longitude: 37.53777629133753, zoom: 17 };
      ymaps.ready(() => this.initMap(mock_data));

      return this.form;
    }
    initMap(mock_data) {
      const myMap = new ymaps.Map("map", {
          center: [mock_data.latitude, mock_data.longitude],
          zoom: mock_data.zoom,
      });  
      // Обработчик события клика на карту
      myMap.events.add('mousedown', (e) => {
          const coords = e.get('coords');
          const zoom = myMap.getZoom();
          var selectedPoint = {
              latitude: coords[0],
              longitude: coords[1],
              zoom: zoom,
          };
          // Удаляем старую метку, если она существует
          if (this.currentPlacemark) {
              myMap.geoObjects.remove(this.currentPlacemark);
          }
          // Создаем новую метку
          this.currentPlacemark = new ymaps.Placemark(coords, {
              hintContent: 'Новая метка',
          }, {
              iconLayout: 'default#image',
              iconImageHref: '/static/images/location.png',
              iconImageSize: [32, 32],
              iconImageOffset: [-16, -32]
          });
          // Добавляем новую метку на карту
          myMap.geoObjects.add(this.currentPlacemark);
          console.log(selectedPoint);
      });
  }
}

