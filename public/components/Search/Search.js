/**
 * Import the endpoint configuration from the config.js file
 * @import {string} endpoint - The API endpoint URL
 */
import { endpoint } from "../../config.js";
/**
 * Import the FeedElement component from the FeedElement.js file
 * @import FeedElement - A component representing a feed element
 */
import { FeedElement } from "../FeedElement/FeedElement.js";
/**
 * Search module.
 * 
 * This module provides a class to render a search feed of events.
 * 
 * @module search
 */

/**
 * Search class.
 * 
 * This class is responsible for rendering a search feed of events.
 * 
 * @class Search
 */
export class Search {
    /**
     * Renders the search feed of events.
     * 
     * This method fetches the events from the server, creates a FeedElement for each event, and appends them to the feed content.
     * 
     * @async
     * @method renderSearch
     * @returns {HTMLElement} The search feed content element.
     */
    async renderSearch(navigate, searchQuery) {
        // Create the main container for the search page
        const searchPage = document.createElement('div');
        searchPage.id = 'searchPage';
    
        // Create the search parameters container
        const searchParameters = document.createElement('div');
        searchParameters.id = 'searchParameters';
        searchParameters.className = 'search-parameters'; // Add a class for styling
    
        // Create the Tags title and input field
        const tagsLabel = document.createElement('label');
        tagsLabel.textContent = 'Tags';
        tagsLabel.className = 'input-label'; // Add a class for styling
        const tagsInput = document.createElement('input');
        tagsInput.type = 'text';
        tagsInput.placeholder = 'Enter tags...'; // Placeholder text for Tags input
        tagsInput.className = 'tags-input'; // Add a class for styling
        // Add event listener to detect Enter key press
        tagsInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') { // Check if the pressed key is Enter
                event.preventDefault();
                const newTags = tagsInput.value;
                const newSearchTerm = searchInput.value;
                navigate(`/search?tags=${encodeURIComponent(newTags)}&q=${encodeURIComponent(newSearchTerm)}`);
            }
        });
        // Create the Search title and input field
        const searchLabel = document.createElement('label');
        searchLabel.textContent = 'Search';
        searchLabel.className = 'input-label'; // Add a class for styling
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Enter search term...'; // Placeholder text for Search input
        searchInput.className = 'search-input'; // Add a class for styling
        searchInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') { // Check if the pressed key is Enter
                event.preventDefault();
                const newSearchTerm = searchInput.value;
                const newTags = tagsInput.value;
                navigate(`/search?tags=${encodeURIComponent(newTags)}&q=${encodeURIComponent(newSearchTerm)}`);
            }
        });
        // Parse the searchQuery to extract tags and search term
        const params = new URLSearchParams(searchQuery);
        
        const tags = params.get('tags') ? params.get('tags').split(' ') : []; // Split tags by space
        const searchTerm = params.get('q') || ''; // Get the search term
        console.log("Tags: ", tags);
        console.log("searchTerms: ", searchTerm);
        // Set the value of the input fields
        tagsInput.value = tags.join(' '); // Join tags with space for display
        searchInput.value = searchTerm; // Set search term
    
        // Append the titles and input fields to the searchParameters container
        searchParameters.appendChild(tagsLabel);
        searchParameters.appendChild(tagsInput);
        searchParameters.appendChild(searchLabel);
        searchParameters.appendChild(searchInput);
    
        // Append the searchParameters to the searchPage
        searchPage.appendChild(searchParameters);
    
        // Create the feed content element
        const feedContent = document.createElement('div');
        feedContent.id = 'feedContent';
    
        // Fetch the feed from the server
        const fetchFeed = async (tags, searchTerm) => {
            const response = await fetch(`${endpoint}/events`, {
                method: "GET",
                headers: {
                    
                },
                SearchRequest: {
                    query: searchTerm,
                    tags: tags,
                }
            });
    
            if (response.ok) {
                const feed = await response.json();
                Object.entries(feed.events).forEach(([key, { description, id }]) => {
                    const feedElement = new FeedElement(key, description, id, navigate).renderTemplate();
                    feedContent.appendChild(feedElement);
                });
            } else {
                const errorText = await response.json();
                console.error('Error fetching feed:', errorText);
            }
        };
    
        await fetchFeed(tags, searchTerm); // Calls the fetchFeed function
    
        // Append the feed content to the main search page
        searchPage.appendChild(feedContent);
        return searchPage; // Returns the search page element
    }
}
