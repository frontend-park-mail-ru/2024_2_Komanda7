import { endpoint } from "../../config.js"
import { FeedElement } from "../FeedElement/FeedElement.js"

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
                    const feedElement = new FeedElement(key, description, `${endpoint}${image}`).renderTemplate();
                    feedContent.appendChild(feedElement);
                });

            } else {
                const errorText = await response.json();
            }
        };

        await fetchFeed(); // Вызов функции fetchFeed
        return feedContent; // Возвращаем контент после загрузки данных
    }
}