export const navigate = (path) => {
    /**
     * Update the URL
     */
    window.history.pushState({}, '', path);
    /**
     * Dispatch a popstate event
     */
    window.dispatchEvent(new PopStateEvent('popstate'));
};
