fetch ("http://dataservice.accuweather.com/forecasts/v1/daily/5day/294021?apikey=Js77Hj5gXif9X6SWS2hGUYkrNk3gouaL")
  .then (response => 
    response.json())
  .then (function (forecastData) {
    
    /*Получаем название населенного пункта из ссылки на данные-->*/
    let locationName = forecastData.Headline.Link; 
    let locationNameStart = locationName.indexOf('/', 30);
    let locationNameEnd = locationName.indexOf('/', 35);
    locationName = locationName.slice( 
        (locationNameStart + 1), (locationNameEnd) 
        ).toUpperCase();
    document.querySelector(".location-name").innerHTML = locationName;

    /*Обрабатываем форму даты-->*/
    let requiredDate = forecastData.DailyForecasts[0].Date;
    let numberOfMonth =  requiredDate.slice( 
        (requiredDate.indexOf('-', 4) + 1 ), (requiredDate.indexOf('-', 4) + 3 ) 
        );
    switch (numberOfMonth) {
        case '01': strOfMonth = 'January'; break;
        case '02': strOfMonth = 'February'; break;
        case '03': strOfMonth = 'March'; break;
        case '04': strOfMonth = 'April'; break;
        case '05': strOfMonth = 'May'; break;
        case '06': strOfMonth = 'June'; break;
        case '07': strOfMonth = 'July'; break;
        case '08': strOfMonth = 'August'; break;
        case '09': strOfMonth = 'September'; break;
        case '10': strOfMonth = 'October'; break;
        case '11': strOfMonth = 'November'; break;
        case '12': strOfMonth = 'December'; break;
    }
    requiredDate = `${requiredDate.slice(
                        (requiredDate.indexOf('-', 7) + 1), (requiredDate.indexOf('-', 7) + 3))} 
                    ${strOfMonth} 
                    ${requiredDate.slice(0, 4)}`;
    document.querySelector(".required-date").innerHTML = requiredDate;
    
    document.querySelector(".warning-text").innerHTML = forecastData.Headline.Text; 
    document.querySelector(".weather_temperature__min").innerHTML = 'Min: '+((forecastData.DailyForecasts[0].Temperature.Minimum.Value -32)/1.8).toFixed(1)+'&#8451'; 
    document.querySelector(".weather_temperature__max").innerHTML = 'Max: '+((forecastData.DailyForecasts[0].Temperature.Maximum.Value -32)/1.8).toFixed(1)+'&#8451';
    document.querySelector(".weather_sky-condition__text").innerHTML = forecastData.DailyForecasts[0].Day.IconPhrase;
    
    /*Скрываем изображение на случай неудачного соединения-->*/
    let imageConectError = document.querySelector(".weather_sky-condition__image");
        imageConectError.classList.add("ok-for-image");
        document.querySelector(".weather_sky-condition__image").src = `https://www.accuweather.com/images/weathericons/${forecastData.DailyForecasts[0].Day.Icon}.svg`;
    
    /*Скрываем кнопку на случай неудачного соединения-->*/
    let gobuttonConectError = document.querySelector(".source-button_link");
        gobuttonConectError.classList.add("ok-for-button");
        document.querySelector(".source-button_link").href = forecastData.Headline.Link;
 })

  .catch(function() {
    console.log('sry');
  });

  

  

