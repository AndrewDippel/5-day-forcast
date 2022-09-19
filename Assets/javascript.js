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
            function appendText() {
                console.log(data.name);
                current['currentName'] = data.name;
                console.log(data.main.temp);
                console.log(data.wind.speed);
                console.log(data.main.humidity);
                console.log(data.weather.icon);
                current()

            }
        });
}


//function to get coordinates of city name being inputed 
function fetchWeather(lat, lon) {
    fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + key)
    console.log(lat, lon)
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
        $("#currentName").append.text("<p>data.name</p>");
        $("#temp").append.text("<p>data.main.temp</p>");
        $("#humidity").append.text("<p>data.main.humidity</p>");
        $("#windSpeed").append.text("<p>data.wind.speed</p>");

    })

//look into local storage for last city name

var previousSearch = localStorage.getItem("lastCityName");
//if find nothing do nothing
if (previousSearch) {
    console.log(previousSearch);
    cityName.value = previousSearch;
    fetchCoord(previousSearch);
}
//if find city
//then restore city to text input




