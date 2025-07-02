import { retrieveInputData } from "./APIControl.js";

export function locationInputEvent() {
    const locationInput = document.querySelector('#locationInput');

    locationInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.keyCode === 13) {
                event.preventDefault();

                retrieveInputData(locationInput.value)
                .then(selectedWeatherData => {
                    // catch and print the re-solved promise from retrieveInputData
                    console.log(selectedWeatherData);
                })
                .catch(error => {
                    // catch and print the error re-thrown from retrieveInputData
                    console.log(error);
                });
        }
    });
}