var key = "d0a6ce034feb50021b0c124b6bd6ea75";//key nneded to call weather api functions
var cityName = document.querySelector("search");//input of search
var previousList = document.querySelector("previousSearch");//list of previous searches
var currentDisplay = document.querySelector("currentWeather");//display for current weather
var URLweek = "http://api.openweathermap.org/data/2.5/forcast?q=" + cityName + "&units=metric" + key;
var URLday = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric" + key;



var previousCity = $("button")
    .addClass("previousCity")
    .on("click", function (event) {
        event.preventDefault();
        var storePrevious = cityName.val().trim();
        localStorage.setItem("" + index, save);
    })