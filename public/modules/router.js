export const navigate = (path) => {
    /**
     * Update the URL
     */
    window.history.pushState({}, '', path);
    /**
     * Dispatch a popstate event
     */
    console.log(path)
    window.dispatchEvent(new PopStateEvent('popstate'));
};
