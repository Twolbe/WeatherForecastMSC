// fetch('http://dataservice.accuweather.com/forecasts/v1/daily/5day/294021?apikey=Js77Hj5gXif9X6SWS2hGUYkrNk3gouaL')
// .then (function (resp) {return resp.json()})
//     .then (function (data) {
//         console.log(data);
//         document.querySelector('.package-name').innerHTML = Headline.Category;
//        alert (HeadLine);

//     })
//     .catch (function () {
//         // catch ane errors
//             })

fetch(
  "http://dataservice.accuweather.com/forecasts/v1/daily/5day/294021?apikey=Js77Hj5gXif9X6SWS2hGUYkrNk3gouaL"
).then(function(response) {
  if (response.ok) {
    let responseJson = response.json();
    console.log(responseJson);
    responseJson = JSON.parse(responseJson);
    alert(responseJson.DailyForecasts);
  } else {
    console.log("Ошибка HTTP: " + response.status);
  }
});
