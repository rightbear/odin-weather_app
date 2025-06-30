export async function retrieveData(myKey){
    let location = null;
    
    while(!location) {
        location = prompt("Input a City or US Zip Code");
    }
    
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${myKey}`, { mode: "cors" });

        if(response.status === 400) {
            throw ("Error location parameter");
        }

        const weatherData = await response.json();
        console.log(weatherData);
    }
    catch (error) {
      // If there is some error thrown out when requesting the GIF, show the error message
      console.log(error);
    }
}