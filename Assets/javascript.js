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
            renderCurrent(data);
            renderCurrentAndForcast(data);
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
        .then(function (data) {
            console.log(data);

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
        .then(function (dataFetch) {
            renderCurrentAndForcast(city, dataFetch)
        })
        .catch(function (err) {
            console.error(err)
        });
}
function renderCurrent(Data) {
    // $("#forcastDisplay").add(`<h4 class="card eachDay width="18rem">hello${forcastData.list[0].main.temp}`)
    console.log(Data.list[i].main.temp)
}
function renderWeather(data) {
    $("#currentName").append(data.name);//console.log(data.name);
    $("#temp").append(data.main.temp + " °C");//console.log(data.main.temp);
    $("#humidity").append(data.main.humidity + " %");//console.log(data.main.humidity);
    $("#windSpeed").append(data.wind.speed + " Knots");//console.log(data.wind.speed);
    $("#icon").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");//console.log(data.weather[0].icon);
    $('#imgLabel').append(data.weather[0].description + ": ");//console.log(data.weather[0].description);
}

function renderCurrentAndForcast(city, info) {
    console.log(city, info);


}
var storeSearch = $("button")
    .addClass("previousCity")
    .on("click", function (event) {
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