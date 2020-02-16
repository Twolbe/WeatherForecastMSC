const CITY_NAME_SELECTOR = ".location-name";
const DATE_SELECTOR = ".required-date";
const WARNING_SELECTOR = ".warning-text";
const TEMP_MIN_SELECTOR = ".weather_temperature__min";
const TEMP_MAX_SELECTOR = ".weather_temperature__max";
const SKY_CONDITION_SELECTOR = ".weather_sky-condition__text";
const IMAGE_SELECTOR = ".weather_sky-condition__image"
const BUTTON_SELECTOR = ".source-button_link"
const SHOW_BUTTON_SELECTOR = "ok-for-button";
const SHOW_IMAGE_SELECTOR = "ok-for-image";

fetch('http://dataservice.accuweather.com/forecasts/v1/daily/5day/294021?apikey=Js77Hj5gXif9X6SWS2hGUYkrNk3gouaL')
    .then(forecastData => forecastData.json())
    .then(function (forecastData) {
        document.querySelector(CITY_NAME_SELECTOR).innerHTML = transformCityName(forecastData.Headline.Link);
        document.querySelector(DATE_SELECTOR).innerHTML = transformDate(forecastData.DailyForecasts[0].Date);
        document.querySelector(WARNING_SELECTOR).innerHTML = forecastData.Headline.Text;
        document.querySelector(TEMP_MIN_SELECTOR).innerHTML = 'Min: ' + transformTempToCelcium(forecastData.DailyForecasts[0].Temperature.Minimum.Value) + '&#8451';
        document.querySelector(TEMP_MAX_SELECTOR).innerHTML = 'Max: ' + transformTempToCelcium(forecastData.DailyForecasts[0].Temperature.Maximum.Value) + '&#8451';
        document.querySelector(SKY_CONDITION_SELECTOR).innerHTML = forecastData.DailyForecasts[0].Day.IconPhrase;
        hideCSSClass(IMAGE_SELECTOR, SHOW_IMAGE_SELECTOR, forecastData.DailyForecasts[0].Day.Icon);
        hideCSSClass(BUTTON_SELECTOR, SHOW_BUTTON_SELECTOR);
    })

function transformCityName(cityName) {
    return cityName.slice(
        (cityName.indexOf('/', 32) + 1),
        (cityName.indexOf('/', 33))
    ).toUpperCase();
}

function transformDate(date) {
    let dateObj = new Date(date);
    return Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(dateObj);
}

function transformTempToCelcium(tempValue) {
    return ((tempValue - 32) / 1.8).toFixed(1);
}

function hideCSSClass(initialClass, newClass, link) {
    let getClassToUpdate = document.querySelector(initialClass);
    getClassToUpdate.classList.add(newClass);
    document.querySelector(initialClass).src = `https://www.accuweather.com/images/weathericons/${link}.svg`;
}
