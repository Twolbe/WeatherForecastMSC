fetch ("http://dataservice.accuweather.com/forecasts/v1/daily/5day/294021?apikey=Js77Hj5gXif9X6SWS2hGUYkrNk3gouaL") 
    .then (forecastData => forecastData.json())
    .then (function (forecastData) {
        innerCity (forecastData, '.location-name');
        innerDateinRightForm(forecastData,  '.required-date');                  
        innerWarningText (forecastData, ".warning-text");
        innerWeatherTempMinMax(forecastData, ".weather_temperature__min", ".weather_temperature__max");
        innerSkyCondition(forecastData, ".weather_sky-condition__text");
        imageConectError (forecastData, ".weather_sky-condition__image", "ok-for-image", ".source-button_link", "ok-for-button");
    })

function innerCity (data, elemCityClass) {
    function getCity () {
        return data.Headline.Link.slice( 
            (data.Headline.Link.indexOf('/', 32)+1), 
            (data.Headline.Link.indexOf('/', 33)) 
            ).toUpperCase();}
        document.querySelector(elemCityClass).innerHTML = getCity ();
}
            
function innerDateinRightForm (data, elemDateClass) {        
    function getNumberOfMonth () {
        return parseInt(data.DailyForecasts[0].Date.slice( 
                        (data.DailyForecasts[0].Date.indexOf('-', 4) + 1 ), (data.DailyForecasts[0].Date.indexOf('-', 4) + 3 ))
                        );
    }
    function getNameOfMonth() {
        return `${data.DailyForecasts[0].Date.slice(
                (data.DailyForecasts[0].Date.indexOf('-', 7) + 1), (data.DailyForecasts[0].Date.indexOf('-', 7) + 3))} 
                ${monthArray[(getNumberOfMonth()-1)]} 
                ${data.DailyForecasts[0].Date.slice(0, 4)}`;
    }
    document.querySelector(elemDateClass).innerHTML = getNameOfMonth();
}
            
function innerWarningText (data, elemWarnTextClass) {
    document.querySelector(elemWarnTextClass).innerHTML = data.Headline.Text;
}
            
function innerWeatherTempMinMax (data, elemTempMinClass, elemTempMaxClass) {
    function tr() {
        return ((data.DailyForecasts[0].Temperature.Minimum.Value -32)/1.8).toFixed(1);
    }
        document.querySelector(elemTempMinClass).innerHTML = 'Min: '+ tr() +'&#8451'; 
        document.querySelector(elemTempMaxClass).innerHTML = 'Max: '+ tr() +'&#8451';
}

function innerSkyCondition (data, elemSkyCondClass) {
    document.querySelector(elemSkyCondClass).innerHTML = data.DailyForecasts[0].Day.IconPhrase;
}

function imageConectError (data, initialClassImage, changedClassImage, initialClassButton, changedClassButton) {
    let getClassToUPD = document.querySelector(initialClassImage);
        getClassToUPD.classList.add(changedClassImage);
        document.querySelector(initialClassImage).src = 
        `https://www.accuweather.com/images/weathericons/${data.DailyForecasts[0].Day.Icon}.svg`;
        getClassToUPD = document.querySelector(initialClassButton);
        getClassToUPD.classList.add(changedClassButton); 
}            

monthArray =    ['January', 'February', 'March', 
                'April', 'May', 'June', 'July', 'August', 
                'September', 'October', 'November', 'December'];