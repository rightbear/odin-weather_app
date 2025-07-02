export function showEmptyError() {
    const invalidInputMsg = document.querySelector(".invalidInputMsg");
    invalidInputMsg.textContent = "The location name can't be enpty.";
}

export function  showInputError() {
    const invalidInputMsg = document.querySelector(".invalidInputMsg");
    invalidInputMsg.textContent = "No matching location found.";
}

export function showBtnInitError() {
    const invalidBtnMsg = document.querySelector(".invalidBtnMsg");
    invalidBtnMsg.textContent = "Geolocation is not supported by this browser.";
}

export function clearInputField() {
    const locationInput = document.querySelector("#locationInput");
    const invalidInputMsg = document.querySelector(".invalidInputMsg");
    const invalidBtnMsg = document.querySelector(".invalidBtnMsg");

    locationInput.value = "";
    invalidInputMsg.textContent = "";
    invalidBtnMsg.textContent = "";
}