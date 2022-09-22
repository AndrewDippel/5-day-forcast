var key = "d0a6ce034feb50021b0c124b6bd6ea75";//key nneded to call weather api functions
var cityName = document.querySelector("#search");//input of search
var previousList = document.querySelector("#previousSearch");//list of previous searches to be displayed
var currentDisplay = document.querySelector("#currentWeather");//display for current weather

//gets basic data of city searched using city name
function fetchCurrent(city) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + key)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //here we are calling all our functions
            fetchWeather(data.coord.lat, data.coord.lon);
            renderWeather(data);
            fetchForcast(data);
            renderForcast(data);
            renderForcast(data);
            //renderPreviousList();
        });
}
//function to get coordinates of city name being inputed 
function fetchWeather(lat, lon) {
    let coordUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`
    fetch(coordUrl)
        .then(function (res) {
            return res.json();
        })
        .catch(function (err) {
            console.error(err);
        })

}
//this function gets the data for the forcast
function fetchForcast(location) {
    let city = location.name;
    let { lat, lon } = location.coord;
    let forcastUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=5&units=metric&appid=${key}`
    fetch(forcastUrl)
        .then(function (res) {
            return res.json()
        })
        .then(function (forcastData) {
            renderForcast(forcastData)

        })
        .catch(function (err) {
            console.error(err)
        });
}
function renderForcast(Data) {
    // $("#forcastDisplay").add(`<h4 class="card eachDay width="18rem">hello${forcastData.list[0].main.temp}`)

}
function renderWeather(data) {
    $("#currentWeather").append(`<dic class="currentDisplay">`);
    $(".currentDisplay").append(`<h3>Current Weather For: ${data.name}</h3>`);
    $(".currentDisplay").append(`<ul class="weatherList"></ul>`)
    $(".weatherList").append(`<li>Temp: ${data.main.temp} °C</li>`);//console.log(data.main.temp);
    $(".weatherList").append(`<li>Humidity: ${data.main.humidity} %<li>`);//console.log(data.main.humidity);
    $(".weatherList").append(`<li>Wind Speed: ${data.wind.speed} Knots</li>`);//console.log(data.wind.speed);
    $(".currentDisplay").append(`${data.weather[0].description}: `);//console.log(data.weather[0].description);
    $(".currentDisplay").append(`<img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" id="icon"></img>`);//console.log(data.weather[0].icon);

}

function renderForcast(forcastData) {
    console.log(forcastData);
    console.log(forcastData.weather[0].description)
    for (let i = 0; i < forcastData.length; i++) {
        $(`<div class="card eachDay"></div>`).appendTo("#forcastDisplay");
        $(`<img card-img-top src="http://openweathermap.org/img/w/${forcastData.list.weather.icon}.png alt="image of weather description">`).appendTo(".eachDay");
        $(`<h4 class="card-title">${forcastData.list.dt_txt}</h4>`).appendTo(".eachDay");
        $(`<p class="card-text">${forcastData.list.main.temp,
            forcastData.list.main.humidity,
            forcastData.list.wind.speed
            }`)
            .appendTo(".eachDay");

    }
}

var storeSearch = $("button")
    .addClass("previousCity")
    .on("click", function (event) {
        $(".currentDisplay").remove()
        event.preventDefault();
        console.log(cityName);
        var newCityName = cityName.value.trim();
        if (newCityName) {
            fetchCurrent(newCityName);
            localStorage.setItem("lastCityName", newCityName);
        }
    });
//render list of previous searches
// function renderPreviousList() {
//     $("#previousSearch").empty();
//     for (let i = 0; i < lastCityName.length; i++) {
//         let el = $("<li class='cities'>");
//         el.attr("data", lastCityName[i]);
//         el.text(citySearched[i]);
//         $("#previousSearch").append(el);
//     };

//look into local storage for last city name
var previousSearch = localStorage.getItem("lastCityName");
if (previousSearch) {
    cityName.value = previousSearch;
    fetchCurrent(previousSearch);
};