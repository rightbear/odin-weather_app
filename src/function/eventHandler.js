import { retrieveInputData, retrieveBtnData } from "./APIControl.js";
import { showBtnInitError, displayWeatherResult } from "./DOMControl"

export function locationInputEvent() {
    const locationInput = document.querySelector('#locationInput');

    locationInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.keyCode === 13) {
                event.preventDefault();

                retrieveInputData(locationInput.value)
                .then(selectedWeatherData => {
                    // catch and print the re-solved promise from retrieveInputData
                    console.log(selectedWeatherData);
                    displayWeatherResult();
                })
                .catch(error => {
                    // catch and print the error re-thrown from retrieveInputData
                    console.log(error);
                });
        }
    });
}

export function locationButtonEvent() {
    const locationBtn = document.querySelector('.locationBtn');

    locationBtn.addEventListener('click', function(event) {
        event.preventDefault();

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(locationBtnSuccess, locationBtnError);
        } else { 
            showBtnInitError();
        }
    });
}

function locationBtnSuccess(position) {
    retrieveBtnData(position)
    .then(selectedWeatherData => {
        // catch and print the re-solved promise from retrieveBtnData
        console.log(selectedWeatherData);
        displayWeatherResult(selectedWeatherData);
    })
    .catch(error => {
        // catch and print the error re-thrown from retrieveBtnData
        console.log(error);
    });
}

function locationBtnError(error) {
    const invalidBtnMsg = document.querySelector(".invalidBtnMsg");

    switch(error.code) {
        case error.PERMISSION_DENIED:
        invalidBtnMsg.textContent = "User denied the request for Geolocation."
        break;
        case error.POSITION_UNAVAILABLE:
        invalidBtnMsg.textContent = "Location information is unavailable."
        break;
        case error.TIMEOUT:
        invalidBtnMsg.textContent = "The request to get user location timed out."
        break;
        case error.UNKNOWN_ERROR:
        invalidBtnMsg.textContent = "An unknown error occurred."
        break;
  }
}