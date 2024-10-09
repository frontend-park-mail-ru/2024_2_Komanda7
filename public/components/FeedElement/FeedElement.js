export class FeedElement {

    constructor(elemId, description, imagePath) {
        this.feedElement = document.createElement('div');
        this.feedElement.id = elemId;

        const imageElement = this.config.image;
        imageElement.src = imagePath;
        const descriptionElement = this.config.description;

        descriptionElement.text = description;
        descriptionElement.className = 'description';

    }
    
    config = {
        image: {
            src:'',
        },
        description: {  
            className: '',
            text: '',
        },
        
    };




    
    renderTemplate() {
        this.feedElement.className = 'feed-element';

        const imageElement = document.createElement('img');
        imageElement.src = this.config.image.src;
        imageElement.onerror = function() {
            this.src = "/static/images/placeholder.png";
            this.style.objectFit = 'fill';
        };
        this.feedElement.appendChild(imageElement);

        const descriptionElement = document.createElement('div');
        descriptionElement.className = this.config.description.className;
        descriptionElement.textContent = this.config.description.text;
        this.feedElement.appendChild(descriptionElement);

        return this.feedElement;
    }
}