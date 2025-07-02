export function showEmptyError() {
    const invalidMsg = document.querySelector(".invalidMsg");
    invalidMsg.textContent = "The location name can't be enpty.";
}

export function  showInputError() {
    const invalidMsg = document.querySelector(".invalidMsg");
    invalidMsg.textContent = "No matching location found.";
}

export function clearInputField() {
    const locationInput = document.querySelector("#locationInput");
    const invalidMsg = document.querySelector(".invalidMsg");

    locationInput.value = "";
    invalidMsg.textContent = "";
}