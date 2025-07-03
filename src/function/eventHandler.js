import { retrieveInputData, retrieveBtnData } from "./APIControl.js";
import { showInputEmptyError, showBtnInitError, clearInputField, displayLoadError, displayWeatherResult, celToFah, preciseRound } from "./DOMControl"

let currentWeatherData = null;

export function locationInputEvent() {
    const locationInput = document.querySelector('#locationInput');

    locationInput.addEventListener('keydown', function checkInput(event) {
        if (event.key === 'Enter' || event.keyCode === 13) {
                event.preventDefault();

                if(locationInput.value === ""){
                    showInputEmptyError();
                }
                else {
                    retrieveInputData(locationInput.value)
                    .then(selectedWeatherData => {
                        // catch and print the re-solved promise from retrieveInputData
                        currentWeatherData = selectedWeatherData;
                        console.log(currentWeatherData);
                        return displayWeatherResult(selectedWeatherData);
                    })
                    .then(() => {
                        console.log('Weather data successfully loaded');
                    })
                    .catch(error => {
                        // catch and print the error re-thrown from retrieveInputData
                        console.log(error);
                        const errorMsg = error.message;
                        // Deal with all error except the empty input
                        if(!errorMsg.includes("Cannot read properties of null")){
                            return displayLoadError();
                        }
                    });
                }
        }
    });
}

export function locationButtonEvent() {
    const locationBtn = document.querySelector('.locationBtn');

    locationBtn.addEventListener('click', function checkClick(event) {
        event.preventDefault();

        clearInputField();
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
        currentWeatherData = selectedWeatherData;
        console.log(currentWeatherData);
        return displayWeatherResult(selectedWeatherData);
    })
    .then(() => {
        console.log('Weather data successfully loaded');
    })
    .catch(error => {
        // catch and print the error re-thrown from retrieveBtnData
        console.log(error);
        const errorMsg = error.message;
        // Deal with all errors except the empty input
        if(!errorMsg.includes("Cannot read properties of null")){
            return displayLoadError();
        }
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

export function unitSwitchEvent() {
    const unitSwitchItem = document.querySelector('#switchItem');

    unitSwitchItem.addEventListener('change', function checkChange(event) {
        if(currentWeatherData && document.querySelector('.locationAddress')) {
            const temp = document.querySelector('.temp');
            const tempRange = document.querySelector('.tempRange');
            const feelsLike = document.querySelector('.feelsLike');
            const futureDays = document.querySelectorAll('.future-tempRange');

            // The default unit of temperature fetched from VisualCrossing is °C
            // The unit for cheched state of switch is °C, unit for uncheched state is °F
            if(unitSwitchItem.checked){
                temp.textContent = `${currentWeatherData.temp}°C`;
                tempRange.textContent = `${currentWeatherData.todaytempMax}°C / ${currentWeatherData.todaytempMin}°C`;
                feelsLike.textContent = `Feels-like: ${currentWeatherData.feelslike}°C`;
                futureDays.forEach((future_tempRange, index) => {
                    future_tempRange.textContent = `${currentWeatherData.future5Days[index].tempmax} / ${currentWeatherData.future5Days[index].tempmin}`;
                });
            }
            else {
                temp.textContent = `${preciseRound(celToFah(currentWeatherData.temp), 1)}°F`;
                tempRange.textContent = `${preciseRound(celToFah(currentWeatherData.todaytempMax), 1)}°F / ${preciseRound(celToFah(currentWeatherData.todaytempMin), 1)}°F`;
                feelsLike.textContent = `Feels-like: ${preciseRound(celToFah(currentWeatherData.feelslike), 1)}°F`;
                futureDays.forEach((future_tempRange, index) => {
                    future_tempRange.textContent = `${preciseRound(celToFah(currentWeatherData.future5Days[index].tempmax), 1)} / ${preciseRound(celToFah(currentWeatherData.future5Days[index].tempmin), 1)}`;
                });
            }
        }
    });
    
}