export async function retrieveData(myKey){
    let location = null;
    
    while(!location) {
        location = prompt("Search a city..");
    }
    
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next5days?unitGroup=metric&key=${myKey}`, { mode: "cors" });
        
        if(response.status === 400) {
            // Status code 400 means the format of the API is incorrect or an invalid parameter for location

            // TODO: Show error message below the input field

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

        console.log(selectedWeatherData);
        console.log(weatherData);
    }
    catch (error) {
      // If there is some error thrown out when requesting the weather data, show the error message
      console.log(error);
    }
}