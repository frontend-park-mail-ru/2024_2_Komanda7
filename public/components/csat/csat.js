
import { api } from "../../modules/FrontendAPI.js";
export class csat {
    constructor(event) {
        this.event = event; // Сохраняем событие, если нужно
    }

    async renderTemplate() {
        const container = document.createElement('div');
        container.id = "csatContainer";
        container.className = 'survey-container';
        container.style.display = 'none';
        // Создаем элементы формы
        const title = document.createElement('h2');
        title.innerText = 'Оцените от 1 до 10';

        const rating = document.createElement("div");     
        for (let i = 1; i <= 10; i++) {
            const point = document.createElement('div'); // Изменяем span на div
            point.className = "circle-number";
            point.innerText = i;
            const path = 'path';
            // Обработчик события для клика
            point.addEventListener('click', () => this.submitRating(i));

            // Обработчик события mouseover
            point.addEventListener('mouseover', () => {
                this.recolor(i);
            });
            rating.appendChild(point);
        }

        const submitButton = document.createElement('button');
        submitButton.id = 'submit-rating';
        submitButton.innerText = 'Отправить';
        
        const messageDiv = document.createElement('div');
        messageDiv.id = 'message';
        messageDiv.style.marginTop = '10px';

        const secretId = document.createElement('div');
        secretId.style.display = 'none';
        secretId.id = 'secretId';
        secretId.innerText = "4";

        const message = document.createElement('div');
        message.id = 'receivedMessage';
        message.innerHTML = 'Загрузка вопроса...';

        window.addEventListener('message', async function(event) {
            // Проверяем источник сообщения (опционально)
            // if (event.origin !== "http://example.com") return;

            // Получаем данные
            const message = event.data
            //console.log(message);
            const path = `/test?query=`;
            const request = { headers: {}, credentials: 'include',
         };
            try {
                const response = await api.get(path, request);
                const question = await response.json();
                // const question = {
                //     "id": 1,
                //     "title": "test 1",
                //     "question": [
                //         {
                //             "id": 1,
                //             "text": "who?"
                //         },
                //         {
                //             "id": 2,
                //             "text": "why?"
                //         }
                //     ]
                // };
                console.log(question.question[0]);
                document.getElementById('receivedMessage').innerText = `${question.question[0].text}`;
                document.getElementById('secretId').innerText = question.question[0].id;
            } catch (error) {
                console.log(error);
                console.log("Ошибка при загрузке вопроса");
                    document.getElementById('receivedMessage').innerText = `${error}`;
            }

            // Обрабатываем полученное сообщение
            //document.getElementById('receivedMessage').innerText = `${question.text}`;
            document.getElementById('csatContainer').style.display = 'block';
        });
        
        container.appendChild(message);
        
        // Добавляем элементы в контейнер
        container.appendChild(title);
        // container.appendChild(input);
        container.appendChild(rating);  
        // container.appendChild(submitButton);
        container.appendChild(messageDiv);
        container.appendChild(secretId);

        // Обработчик события для кнопки отправки
        // submitButton.addEventListener('click', () => this.submitRating(message, path));
        
        return container;
    }

    recolor(untill) {
        const circles = document.querySelectorAll('.circle-number');
        circles.forEach((circle, index) => {
            if (index < untill) {
                circle.classList.add('hover'); // Добавляем класс для изменения стиля
            } else {
                circle.classList.remove('hover'); // Убираем класс, если индекс больше
            }
        });
    }

    async submitRating(i) {
        const rating = i;
        const messageDiv = document.getElementById('message');
        const question = document.getElementById('secretId').innerHTML;
        if (rating >= 1 && rating <= 10) {
            messageDiv.innerText = `Спасибо за вашу оценку: ${rating}`;
            // Здесь можно добавить код для отправки оценки на сервер
            const shit = {
                "question_id": question,
                "value": i,
            };
            let arr = [shit];
            const file = {"answers": arr};
            //JSON.stringify(file)
            const request = {
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(file),
            };
            const response = await api.post('/test', request);
            console.log(i, question);
            //console.log(answers);
            setTimeout(() => {
                document.getElementById('csatContainer').style.display = 'none';
             }, 1000);
        } else {
            messageDiv.innerText = "Пожалуйста, введите число от 1 до 10.";
        }
    }
}
