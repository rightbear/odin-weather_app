import { showEmptyError, showInputError, clearInputField } from "./DOMControl"

const myKey = "D79PDB2396QBXM7JCA3DYAGB4";

export async function retrieveInputData(location){
    if(location === "") {
        showEmptyError();
    }
    else {
        try {
            clearInputField();
            const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next5days?unitGroup=metric&key=${myKey}`, { mode: "cors" });
            
            if(response.status === 400) {
                // Status code 400 means the format of the API is incorrect or an invalid parameter for location
                showInputError();

                throw new Error(`Error parameter for the location: ${location}`);
            }
            else if(!response.ok) {
                // response.ok is true when status code is 200~299

                alert("Oops...Some errors just happen! Maybe refresh the page or search again later.")
                
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const weatherData = await response.json();

            // Use object destructing and rest parameters to get location, date, time, temperature, condition, icon, temp-max/min, temp-feelslike, humidity, windspeed, uvindex, future-5-days-data
            const { resolvedAddress: locationAddress, currentConditions: {datetime: currentTime, temp, conditions, icon, feelslike, humidity, windspeed, uvindex},
                    days: [ {datetime: currentDate, tempmax: todaytempMax, tempmin: todaytempMin}, ...future5Days] } = weatherData;

            const selectedWeatherData =  { locationAddress, currentDate, currentTime, temp, conditions, icon, todaytempMax, todaytempMin, feelslike, humidity, windspeed, uvindex, future5Days };

            // return the weather data we want
            return selectedWeatherData;
        }
        catch (error) {
            // If there is some error thrown out when requesting the weather data, re-throw the error message
            throw error;
        }
    }
}

export async function retrieveBtnData(position){
    try {
        clearInputField();
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const allResponse = await customPromiseAllWait([
            fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}/next5days?unitGroup=metric&key=${myKey}`, { mode: "cors" }),
            fetch(`https://nominatim.openstreetmap.org/reverse?format=geojson&lat=${latitude}&lon=${longitude}`, { mode: "cors" })
        ]);

        if(allResponse[0].status === 400) {
            throw new Error(`Error parameter for the location: ${latitude}, ${longitude}`);
        }
        allResponse.forEach((response) => {
            if (!response.ok) {
                alert("Oops...Some errors just happen! Maybe refresh the page or search again later.");
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        });

        const allResult = await customPromiseAllWait([
            allResponse[0].json(),
            allResponse[1].json()
        ]);

        const weatherData = allResult[0];
        const locationData = allResult[1];
        console.log(locationData);
        // Use object destructing and rest parameters to get location, date, time, temperature, condition, icon, temp-max/min, temp-feelslike, humidity, windspeed, uvindex, future-5-days-data
        const { currentConditions: {datetime: currentTime, temp, conditions, icon, feelslike, humidity, windspeed, uvindex},
                days: [ {datetime: currentDate, tempmax: todaytempMax, tempmin: todaytempMin}, ...future5Days] } = weatherData;

        // Use object to get location
        const { features: [ {properties: { address: { country, city, suburb } }}, ...restElemnt] } = locationData;

        const selectedWeatherData =  { locationAddress: `${country}${city}${suburb}`, currentDate, currentTime, temp, conditions, icon, todaytempMax, todaytempMin, feelslike, humidity, windspeed, uvindex, future5Days };

        // return the weather data we want
        return selectedWeatherData;
    }
    catch (error) {
        // If there is some error thrown out when requesting the weather data, re-throw the error message
        throw error;
    }
}

function customPromiseAllWait(promises) {
  return new Promise((resolve, reject) => {
    const results = new Array(promises.length);
    let settledCount = 0;
    let firstError = null;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(result => {
          results[index] = result;
        })
        .catch(error => {
          if (firstError === null) {
            firstError = error;
          }
        })
        .finally(() => {
          settledCount++;
          if (settledCount === promises.length) {
            if (firstError !== null) {
              reject(firstError);
            } else {
              resolve(results);
            }
          }
        });
    });
  });
}