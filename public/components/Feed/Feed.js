export class Feed {
    constructor(apiUrl) {
      this.apiUrl = apiUrl; 
    }
  
    async fetchFeed() {
      try {
        const response = await fetch(this.apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (response.ok) {
          const feed = await response.json();
          return feed; 
        } else {
          const errorText = await response.text();
          console.log("Error fetching feed:", errorText);
          return null;
        }
      } catch (error) {
        console.error("Ошибка загрузки фида:", error);
        return null;
      }
    }
  
    renderFeed(feedData) {
      const feedContent = document.createElement('div');
      feedContent.id = 'feedContent';
  
      if (feedData && Object.keys(feedData).length > 0) {
        Object.entries(feedData).forEach(([key, { description, image }]) => {
          const feedElement = document.createElement('div');
          feedElement.className = 'feed-element';
  
          const imageElement = document.createElement('img');
          imageElement.src = image;
          imageElement.onerror = function() {
            this.src = '/static/images/placeholder.png'; 
            this.style.objectFit = 'fill';
          };
          feedElement.appendChild(imageElement);
  
          const descriptionElement = document.createElement('div');
          descriptionElement.className = 'description';
          descriptionElement.textContent = description;
          feedElement.appendChild(descriptionElement);
  
          feedContent.appendChild(feedElement);
        });
      } else {
        const noEventsMessage = document.createElement('p');
        noEventsMessage.textContent = 'No events!';
        feedContent.appendChild(noEventsMessage);
      }
  
      return feedContent; 
    }
  }
  