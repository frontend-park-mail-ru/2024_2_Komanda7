import { endpoint } from "../../config.js"

export class Feed {
    async renderFeed() {
        const feedContent = document.createElement('content');

        const fetchFeed = async() => {
            const response = await fetch(`${endpoint}/events`, {
                method: "GET",
                headers: {
                    //"Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const feed = await response.json();
                feedContent.id = 'feedContent';

                Object.entries(feed).forEach(([key, { description, image }]) => {
                    const FeedElement = document.createElement('div');
                    FeedElement.className = 'feed-element';

                    const imageElement = document.createElement('img');
                    imageElement.src = `${endpoint}${image}`;
                    imageElement.onerror = function() {
                        this.src = "/static/images/placeholder.png";
                        this.style.objectFit = 'fill';
                    };
                    FeedElement.appendChild(imageElement);

                    const descriptionElement = document.createElement('div');
                    descriptionElement.className = 'description';
                    descriptionElement.textContent = description;
                    FeedElement.appendChild(descriptionElement);

                    feedContent.appendChild(FeedElement);
                });

            } else {
                const errorText = await response.json();
            }
        };

        await fetchFeed(); // Вызов функции fetchFeed
        return feedContent; // Возвращаем контент после загрузки данных
    }
}