

export class csat {
    constructor(event) {
        this.event = event; // Сохраняем событие, если нужно
    }

    renderTemplate() {
        const container = document.createElement('div');
        container.id = "csatContainer";
        container.className = 'survey-container';
        container.style.display = 'none';
        // Создаем элементы формы
        const title = document.createElement('h2');
        title.innerText = 'Оцените от 1 до 10';

        const rating = document.createElement("div");     
        for (let i = 1; i <= 10; i++) {
            const point = document.createElement('div'); // Change span to div
            point.className = "circle-number";
            point.innerText = i;
            point.addEventListener('click', () => this.submitRating(i));
            rating.appendChild(point);
        }

        const submitButton = document.createElement('button');
        submitButton.id = 'submit-rating';
        submitButton.innerText = 'Отправить';
        
        const messageDiv = document.createElement('div');
        messageDiv.id = 'message';
        messageDiv.style.marginTop = '10px';

        console.log("message create");
        const message = document.createElement('div');
        message.id = 'receivedMessage';
        message.innerHTML = 'receivedMessage';

        window.addEventListener('message', function(event) {
            // Проверяем источник сообщения (опционально)
            // if (event.origin !== "http://example.com") return;

            // Получаем данные
            const message = event.data;

            // Обрабатываем полученное сообщение
            document.getElementById('receivedMessage').innerText = `${message}`;
            document.getElementById('csatContainer').style.display = 'block';
        });
        
        container.appendChild(message);
        
        // Добавляем элементы в контейнер
        container.appendChild(title);
        // container.appendChild(input);
        container.appendChild(rating);  
        // container.appendChild(submitButton);
        container.appendChild(messageDiv);

        // Обработчик события для кнопки отправки
        submitButton.addEventListener('click', () => this.submitRating());
        
        return container;
    }

    recolor(untill) {
        
    }

    submitRating(i) {
        const rating = i;
        const messageDiv = document.getElementById('message');

        if (rating >= 1 && rating <= 10) {
            messageDiv.innerText = `Спасибо за вашу оценку: ${rating}`;
            // Здесь можно добавить код для отправки оценки на сервер

            setTimeout(() => {
                document.getElementById('csatContainer').style.display = 'none';
             }, 1000);
        } else {
            messageDiv.innerText = "Пожалуйста, введите число от 1 до 10.";
        }
    }
}
