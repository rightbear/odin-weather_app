import { retrieveData } from "./APIControl.js";

export function locationInputEvent() {
    const locationInput = document.querySelector('#locationInput');

    locationInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            if (event.keyCode === 13 || event.keyCode === 13) {
                retrieveData();
            }
        }
    });
}