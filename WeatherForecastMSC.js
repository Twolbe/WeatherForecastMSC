fetch(
  "http://dataservice.accuweather.com/forecasts/v1/daily/5day/294021?apikey=Js77Hj5gXif9X6SWS2hGUYkrNk3gouaL"
)
  .then(response => response.json())
  .then(function(data) {
    console.log(data);
    let a = data.Headline.Link;
    let ab = a.indexOf('/', 30);
    let ac = a.indexOf('/', 35);
    let r = a.slice((ab+1), (ac)).toUpperCase();
    document.querySelector(".town").innerHTML = r;

    let b = data.DailyForecasts[0].Date;
    let Month =  b.slice((b.indexOf('-', 4)+1), (b.indexOf('-', 4)+3));
    let fMonth;
    switch (Month) {
        case '01': fMonth = 'January'; break;
        case '02': fMonth = 'February'; break;
        case '03': fMonth = 'March'; break;
        case '04': fMonth = 'April'; break;
        case '05': fMonth = 'May'; break;
        case '06': fMonth = 'June'; break;
        case '07': fMonth = 'July'; break;
        case '08': fMonth = 'August'; break;
        case '09': fMonth = 'September'; break;
        case '10': fMonth = 'October'; break;
        case '11': fMonth = 'November'; break;
        case '12': fMonth = 'December'; break;
    }
    let r2 = `${b.slice((b.indexOf('-', 7)+1), (b.indexOf('-', 7)+3))} ${fMonth} ${b.slice(0, 4)}`;
    document.querySelector(".date").innerHTML = r2;
    document.querySelector(".slogan").innerHTML = data.Headline.Text;
    document.querySelector(".temperature-1").innerHTML = 'Min: '+((data.DailyForecasts[0].Temperature.Minimum.Value -32)/1.8).toFixed(1)+'&#8451';
    document.querySelector(".temperature-2").innerHTML = 'Max: '+((data.DailyForecasts[0].Temperature.Maximum.Value -32)/1.8).toFixed(1)+'&#8451';
    document.querySelector(".image").src = `https://www.accuweather.com/images/weathericons/${data.DailyForecasts[0].Day.Icon}.svg`;
    document.querySelector(".word").innerHTML = data.DailyForecasts[0].Day.IconPhrase;
    document.querySelector(".button-primary").href = data.Headline.Link;
 })
  .catch(function() {
    // catch ane errors
  });

  

  

//PROTOTYPE
// const person = new Object({
//     name: 'Maxim',
//     age: 25,
//     greet: function() {
//         console.log('Greet!')
//     }
// })

// Object.prototype.sayHello = function () {
//     console.log('Hello!')
// }

// const lena = Object.create(person);
// lena.name = 'Elena';

// function hello() {
//     console.log('Hello', this)
// }

// const person = {
//     name: 'Gurami',
//     age: 25,
//     sayHello: hello,
//     sayHelloWindow: hello.bind(this)
// }

