import Handlebars from 'handlebars';
import template from './EventCreateForm.hbs';
import locationIcon from '../../assets/images/location.png';
import placeholderImage from '../../assets/images/placeholder.png';
import { endpoint } from '../../config.js';
import { handleCreateEventSubmit } from '../../modules/handleEventsActions.js';
import { navigate } from '../../index.js';

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
        text: 'Изображение',
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
    renderTemplate(selectElement, eventData) {
      let mock_data = { latitude: 55.797153, longitude: 37.537878, zoom: 17, needMark: true};

      const html = template({
        items: Object.entries(this.config).map(([key, { tag, text, className, type }]) => ({
          key,
          tag,
          text,
          className,
          type,
          needPlaceholder: tag === 'input' || tag === 'textarea',
          needMaxMinTime: type === 'time'
        }))
      });
    
      this.form.innerHTML = html;
      const hiddenLatitudeInput = document.createElement('input');
      hiddenLatitudeInput.type = 'hidden';
      hiddenLatitudeInput.id = 'latitude';
      this.form.appendChild(hiddenLatitudeInput);

      const hiddenLongitudeInput = document.createElement('input');
      hiddenLongitudeInput.type = 'hidden';
      hiddenLongitudeInput.id = 'longitude';
      this.form.appendChild(hiddenLongitudeInput);

      const zoom = document.createElement('input');
      zoom.type = 'hidden';
      zoom.id = 'zoom';
      this.form.appendChild(zoom);
      
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


      const img = document.createElement('img');
      img.src = placeholderImage;
      img.className = 'event-create-image';
      const fileInput = this.form.querySelector('.event-create-form__input--file');
      fileInput.parentNode.insertBefore(img, fileInput);
      fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                img.src = e.target.result; // Устанавливаем новое изображение
            };
            reader.readAsDataURL(file);
        }
    });
      if (eventData) {
        img.src = `${endpoint}/${eventData.image}`;
        img.width = fileInput.width;

        const submitButton = this.form.querySelector('.event-create-form__submit-btn');
        submitButton.innerHTML = 'Сохранить';
        const mapping = {
          title: 'eventNameEntry',
          image: 'imageInput',
          description: 'eventDescriptionEntry',
          category_id: 'categories',
          tag: 'eventTagEntry',
          category_id: "categoriesInput",
      };
      const time = {
          event_start: 'eventBeginEntry',
          event_end: 'eventEndEntry',
      };
      for (const key in mapping) {
          const inputElement = this.form.querySelector(`[id="${mapping[key]}"]`);
          if (inputElement) {
              if (mapping[key] === 'imageInput') {
                  inputElement.src = eventData[key];
              } else
              if (mapping[key] === 'eventTagEntry') {
                inputElement.value = eventData[key].join(' ');
              } else {
              inputElement.value = eventData[key];
              }
          }
      }
      for (const key in time) {
          const inputElement = this.form.querySelector(`[id="${time[key]}"]`);
          if (inputElement) {
              inputElement.value = formatDateTimeForInput(eventData[key]);
          }
      }
      mock_data = { latitude: eventData.Latitude, longitude: eventData.Longitude, zoom: 17, needMark: true};
      }

      // Инициализация карты
      ymaps.ready(() => this.initMap(mock_data));
      const createBtn = document.getElementById('eventSubmitBtn');        
      createBtn.addEventListener('click', (event) => handleCreateEventSubmit(event, '/events/my', navigate));

      return this.form;
    }
    initMap(mock_data) {
      const myMap = new ymaps.Map("map", {
          center: [mock_data.latitude, mock_data.longitude],
          zoom: mock_data.zoom,
          controls: ['geolocationControl', 'typeSelector', 'fullscreenControl', 'zoomControl', 'rulerControl'],
      });  
      if (mock_data.needMark) {
        const coords = myMap.getCenter();
        this.currentPlacemark = new ymaps.Placemark(coords, {
              hintContent: 'Новая метка',
          }, {
              iconLayout: 'default#image',
              iconImageHref: locationIcon,
              iconImageSize: [32, 32],
              iconImageOffset: [-16, -32]
          });
          // Добавляем новую метку на карту
          myMap.geoObjects.add(this.currentPlacemark);
      }
      // Обработчик события клика на карту
      myMap.events.add('mousedown', (e) => {
          const coords = e.get('coords');
          const zoom = myMap.getZoom();
          var selectedPoint = {
              latitude: coords[0],
              longitude: coords[1],
              zoom: zoom,
          };
          // Обновление скрытых полей с координатами
          document.getElementById('latitude').value = coords[0];
          document.getElementById('longitude').value = coords[1];
          document.getElementById('zoom').value = zoom;
          // Удаляем старую метку, если она существует
          if (this.currentPlacemark) {
              myMap.geoObjects.remove(this.currentPlacemark);
          }
          // Создаем новую метку
          this.currentPlacemark = new ymaps.Placemark(coords, {
              hintContent: 'Новая метка',
          }, {
              iconLayout: 'default#image',
              iconImageHref: locationIcon,
              iconImageSize: [32, 32],
              iconImageOffset: [-16, -32]
          });
          // Добавляем новую метку на карту
          myMap.geoObjects.add(this.currentPlacemark);
      });
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