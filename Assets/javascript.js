var key = "d0a6ce034feb50021b0c124b6bd6ea75";//key nneded to call weather api functions
var cityName = document.querySelector("#search");//input of search
var previousList = document.querySelector("#previousSearch");//list of previous searches
var currentDisplay = document.querySelector("#currentWeather");//display for current weather
var current = [];

//gets basic data of city searched using city name
function fetchCoord(city) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + key)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);//console logs data from fetch to be used later
            fetchWeather(data.coord.lat, data.coord.lon);
            renderWeather(data)
        });
}


//function to get coordinates of city name being inputed 
function fetchWeather(lat, lon) {
    fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + key)
    console.log(lat, lon)
}
function renderWeather(data) {
    console.log(data.name);
    console.log(data.main.temp);
    console.log(data.wind.speed);
    console.log(data.main.humidity);
    console.log(data.weather.icon);//"http://openweathermap.org/img/w/" + icon +".png"
    $("#currentName").append(data.name);
    $("#temp").append(data.main.temp + " °C");
    $("#humidity").append(data.main.humidity + " g.m-3");
    $("#windSpeed").append(data.wind.speed + " Knots");
}
var previousCity = $("button")
    .addClass("previousCity")
    .on("click", function (event) {
        event.preventDefault();
        console.log(cityName);
        var newCityName = cityName.value.trim();
        if (newCityName) {
            fetchCoord(newCityName);
            localStorage.setItem("lastCityName", newCityName);

        }


    })

//look into local storage for last city name
var previousSearch = localStorage.getItem("lastCityName");
if (previousSearch) {
    console.log(previousSearch);
    cityName.value = previousSearch;
    fetchCoord(previousSearch);
}
//if find city
//then add to button on aside




