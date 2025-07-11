// Set error message when input value is empty
export function showInputEmptyError() {
  const invalidInputMsg = document.querySelector(".invalidInputMsg");
  invalidInputMsg.textContent = "The location name can't be enpty.";
}

// Set error message when input value is invalid
export function showInputLocationError() {
  const invalidInputMsg = document.querySelector(".invalidInputMsg");
  invalidInputMsg.textContent = "No matching location found.";
}

// Set error message when network or API is broken
export function showInputConnectError() {
  const invalidInputMsg = document.querySelector(".invalidInputMsg");
  invalidInputMsg.textContent = "Can't fetch the weather data with network";
}

// Set error message when Geolocation function fails
export function showBtnInitError() {
  const invalidBtnMsg = document.querySelector(".invalidBtnMsg");
  invalidBtnMsg.textContent = "Geolocation is not supported by this browser.";
}

// Set error message when absolute position is invalid
export function showBtnLocationError() {
  const invalidBtnMsg = document.querySelector(".invalidBtnMsg");
  invalidBtnMsg.textContent = "No matching location found.";
}

// Set error message when network or API is broken
export function showBtnConnectError() {
  const invalidBtnMsg = document.querySelector(".invalidBtnMsg");
  invalidBtnMsg.textContent = "Can't fetch the weather data with network";
}

// Clear value in input field and all error messages
export function clearInputField() {
  const locationInput = document.querySelector("#locationInput");
  const invalidInputMsg = document.querySelector(".invalidInputMsg");
  const invalidBtnMsg = document.querySelector(".invalidBtnMsg");

  locationInput.value = "";
  invalidInputMsg.textContent = "";
  invalidBtnMsg.textContent = "";
}

// Show the page loader when fetching weather forecasts from APIs
export function displayPageLoader() {
  const info = document.querySelector(".info");
  clearChild(info);

  const weatherInfo = document.createElement("div");
  weatherInfo.classList.add("weatherInfo");

  const weatherTitle = document.createElement("h2");
  weatherTitle.id = "infoTitle";
  weatherTitle.textContent = "Current Weather";

  const weatherContent = document.createElement("div");
  weatherContent.classList.add("weatherContent");

  const loaderContainer = document.createElement("div");
  loaderContainer.classList.add("loaderContainer");

  const weatherLoader = document.createElement("div");
  weatherLoader.classList.add("weatherLoader");

  loaderContainer.appendChild(weatherLoader);
  weatherContent.appendChild(loaderContainer);
  weatherInfo.append(weatherTitle, weatherContent);
  info.appendChild(weatherInfo);
}

// Show the error contnent when the weather forecasts can't be fetched from APIs
export async function displayLoadError() {
  const weatherContent = document.querySelector(".weatherContent");
  clearChild(weatherContent);

  const errorContainer = document.createElement("div");
  errorContainer.classList.add("errorContainer");

  const errorImage = document.createElement("img");
  errorImage.classList.add("errorImage");
  try {
    const imageSrc = await loadIcon("load-error");
    errorImage.src = imageSrc;
    errorImage.height = 100;
  } catch (error) {
    console.log("Error happens in displayLoadError", error.message);
  }

  const errorMessage = document.createElement("div");
  errorMessage.classList.add("errorMessage");
  errorMessage.textContent =
    "Oops...some errors just happen! Maybe refresh the page or search again later.";

  errorContainer.append(errorImage, errorMessage);
  weatherContent.appendChild(errorContainer);
}

// Show the weather reports fetched from APIs
export async function displayWeatherResult(weatherData) {
  const weatherContent = document.querySelector(".weatherContent");
  clearChild(weatherContent);
  try {
    await loadWeatherElement(weatherContent, weatherData);
    // return undefined to locationInputEvent and locationBtnSuccess
  } catch (error) {
    console.log("Error happens in displayWeatherResult", error.message);
    // Rethrow the error to catch block in locationInputEvent
    throw error;
  }
}

// Clear all childElements in a parentElement
function clearChild(parentElement) {
  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.firstChild);
  }
}

// Show the page of the fetched weather report with address, icon, temperatures, humidity, uv, windspeend and future weather
async function loadWeatherElement(weatherContent, weatherData) {
  const tempSwitch = document.querySelector("#switchItem");

  const locationAddress = document.createElement("div");
  locationAddress.classList.add("locationAddress");
  locationAddress.textContent = weatherData.locationAddress;

  const timeData = document.createElement("div");
  timeData.classList.add("timeData");
  const recordDate = document.createElement("div");
  recordDate.classList.add("recordDate");
  recordDate.textContent = weatherData.recordDate;
  const recordTime = document.createElement("div");
  recordTime.classList.add("recordTime");
  recordTime.textContent = weatherData.recordTime;
  timeData.append(recordDate, recordTime);

  const conditionData = document.createElement("div");
  conditionData.classList.add("conditionData");
  const temp = document.createElement("div");
  temp.classList.add("temp");
  // The default unit of temperature fetched from VisualCrossing is °C
  // The unit for cheched state of switch is °C, unit for uncheched state is °F
  if (tempSwitch.checked) {
    temp.textContent = `${weatherData.temp}°C`;
  } else {
    temp.textContent = `${preciseRound(celToFah(weatherData.temp), 1)}°F`;
  }

  const conditoinRight = document.createElement("div");
  conditoinRight.classList.add("conditoinRight");
  const icon = document.createElement("img");
  icon.classList.add("icon");
  try {
    const iconSrc = await loadIcon(weatherData.icon);
    icon.src = iconSrc;
    icon.height = 50;
  } catch (error) {
    console.log("Error happens in loadWeatherElement", error.message);
    // Rethrow the error to catch block in displayWeatherResult
    throw error;
  }
  const tempRange = document.createElement("div");
  tempRange.classList.add("tempRange");
  let todayTempMax = null,
    todayTempMin = null,
    tempUnit = null;
  if (tempSwitch.checked) {
    todayTempMax = weatherData.todaytempMax;
    todayTempMin = weatherData.todaytempMin;
    tempUnit = "°C";
  } else {
    todayTempMax = preciseRound(celToFah(weatherData.todaytempMax), 1);
    todayTempMin = preciseRound(celToFah(weatherData.todaytempMin), 1);
    tempUnit = "°F";
  }
  tempRange.textContent = `${todayTempMax}${tempUnit} / ${todayTempMin}${tempUnit}`;
  conditoinRight.append(icon, tempRange);

  conditionData.append(temp, conditoinRight);

  const feelData = document.createElement("div");
  feelData.classList.add("feelData");
  const feelsLike = document.createElement("div");
  feelsLike.classList.add("feelsLike");
  if (tempSwitch.checked) {
    feelsLike.textContent = `Feels-like: ${weatherData.feelslike}°C`;
  } else {
    feelsLike.textContent = `Feels-like: ${preciseRound(celToFah(weatherData.feelslike), 1)}°F`;
  }

  const humidity = document.createElement("div");
  humidity.classList.add("humidity");
  humidity.textContent = `Humidity: ${weatherData.humidity}%`;
  feelData.append(feelsLike, humidity);

  const supplementData = document.createElement("div");
  supplementData.classList.add("supplementData");
  const uvIndex = document.createElement("div");
  uvIndex.classList.add("uvIndex");
  uvIndex.textContent = `UV: ${weatherData.uvindex}`;
  const windSpeed = document.createElement("div");
  windSpeed.classList.add("windSpeed");
  windSpeed.textContent = `Wind: ${weatherData.windspeed}km/h`;
  supplementData.append(uvIndex, windSpeed);

  const future5Days = document.createElement("div");
  future5Days.classList.add("future5Days");

  const futureTitle = document.createElement("h4");
  futureTitle.textContent = "Forecast for future 5 days";

  const futureDayGrid = document.createElement("div");
  futureDayGrid.classList.add("futureDayGrid");

  for (let i = 1; i <= 5; i++) {
    const future_day = document.createElement("div");
    future_day.classList.add("future-day");
    future_day.dataset.day = i;

    const future_dateTime = document.createElement("div");
    future_dateTime.classList.add("future-dateTime");
    future_dateTime.textContent = `${weatherData.future5Days[i - 1].datetime}`;
    const future_icon = document.createElement("img");
    future_icon.classList.add("future-icon");
    try {
      const iconSrc = await loadIcon(weatherData.future5Days[i - 1].icon);
      future_icon.src = iconSrc;
      future_icon.height = 30;
    } catch (error) {
      console.log("Error happens in loadWeatherElement", error.message);
      // Rethrow the error to catch block in displayWeatherResult
      throw error;
    }
    const future_tempRange = document.createElement("div");
    future_tempRange.classList.add("future-tempRange");
    let future_tempmax = null,
      future_tempmin = null;

    if (tempSwitch.checked) {
      future_tempmax = weatherData.future5Days[i - 1].tempmax;
      future_tempmin = weatherData.future5Days[i - 1].tempmin;
    } else {
      future_tempmax = preciseRound(
        celToFah(weatherData.future5Days[i - 1].tempmax),
        1,
      );
      future_tempmin = preciseRound(
        celToFah(weatherData.future5Days[i - 1].tempmin),
        1,
      );
    }
    future_tempRange.textContent = `${future_tempmax} / ${future_tempmin}`;

    future_day.append(future_dateTime, future_icon, future_tempRange);
    futureDayGrid.appendChild(future_day);
  }
  future5Days.append(futureTitle, futureDayGrid);

  weatherContent.append(
    locationAddress,
    timeData,
    conditionData,
    feelData,
    supplementData,
    future5Days,
  );
}

// Dynamically import the image file as module
async function loadIcon(iconName) {
  try {
    const iconModule = await import(`../images/${iconName}.png`);
    // The source of image is stored in default field of module
    return iconModule.default;
  } catch (error) {
    console.log("Error happens in loadIcon", error.message);
    // Rethrow the error to catch block in loadWeatherElement
    throw error;
  }
}

// Convert the unit from celsius to fahrenheit
export function celToFah(celTemp) {
  return celTemp * (9 / 5) + 32;
}

// Round the float number to specific precise value
export function preciseRound(number, decimalPlaces) {
  const factor = 10 ** decimalPlaces;
  return Number(Math.round((number + Number.EPSILON) * factor) / factor);
}
