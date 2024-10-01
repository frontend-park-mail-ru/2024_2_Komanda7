
export function isValidUsername(username) {
    const pattern = /^[a-zA-Z0-9]+$/;
    return pattern.test(username);
}

export function isValidPassword(password) {
    const pattern = /^[a-zA-Z0-9]+$/;// /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,20}$/;
    return pattern.test(password);
}

export function isValidEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}



export function showMessage(message) {
    //do sth

}


export function removeDangerous(inputValue) {
    return DOMPurify.sanitize(inputValue);
}