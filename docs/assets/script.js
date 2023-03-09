// https://api.openweathermap.org/geo/1.0/direct?q=hackettstown&limit=1&appid=2f41a48f60d6d854be758ad4552fc631
// https://api.openweathermap.org/data/2.5/forecast?lat=40.8538944&lon=-74.8291638&units=imperial&appid=2f41a48f60d6d854be758ad4552fc631

let searches = JSON.parse(localStorage.getItem("searches")) || [];
let index = 0;

document.getElementById("searchButton").addEventListener("click", function () {
    event.preventDefault();
    var city = document.getElementById("city").value;
    if (city === "") {
        alert("Please enter a city");
        return;
    }
    else {
        // create and store search history
        searches.push(city);
        localStorage.setItem("searches", JSON.stringify(searches));
        const storedSearches = JSON.parse(localStorage.getItem("searches"));
        console.log(storedSearches);
        // display search history
        document.getElementById("searchHistoryDiv").style.display = "block";
        var searchList = document.getElementById("searchHistory")
        var searchListItem = document.createElement("li");
        searchListItem.setAttribute("class", "list-group-item");
        searchListItem.setAttribute("id", "searchHistoryItem" + index);
        searchListItem.textContent = city;
        searchList.appendChild(searchListItem);
        index++;

        var geoCoderURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=2f41a48f60d6d854be758ad4552fc631';
        fetch(geoCoderURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                var lat = data[0].lat;
                var lon = data[0].lon;
                var apiURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=2f41a48f60d6d854be758ad4552fc631';
                fetch(apiURL)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        document.getElementById("currentWeather").style.display = "block";
                        var temp = data.list[0].main.temp;
                        var tempMin = data.list[0].main.temp_min;
                        var tempMax = data.list[0].main.temp_max;
                        var humidity = data.list[0].main.humidity;
                        var windSpeed = data.list[0].wind.speed;
                        var weatherDescription = data.list[0].weather[0].description;
                        var weatherIcon = data.list[0].weather[0].icon;
                        var weatherIconURL = 'http://openweathermap.org/img/w/' + weatherIcon + '.png';
                        console.log(weatherIconURL);
                        document.getElementById("nameofcity").textContent = city;
                        document.getElementById("currentWeatherIcon").setAttribute("src", weatherIconURL);
                        document.getElementById("currentWeatherIcon").setAttribute("alt", weatherDescription);
                        document.getElementById("currentWeatherDescription").textContent = weatherDescription;
                        document.getElementById("currentWeatherTemp").textContent = temp + " °F";
                        document.getElementById("currentTempMin").textContent = "Min: " + tempMin + " °F";
                        document.getElementById("currentTempMax").textContent = "Max: " + tempMax + " °F";
                        document.getElementById("currentWeatherWind").textContent = "Wind: " + windSpeed + " mph";
                        document.getElementById("currentWeatherHumidity").textContent = "Humidity: " + humidity + " %";
                        var forecast = data.list;
                        // Get the container element to append the forecast elements to
                        var forecastContainer = document.getElementById("forecast");
                        // Clear any existing forecast elements
                        document.getElementById("forecast").style.display = "block";

                        // Loop through each forecast and create HTML elements for each one
                        for (var i = 0; i < forecast.length; i++) {
                            if (forecast[i].dt_txt.includes("18:00:00")) {
                                var forecastTemp = forecast[i].main.temp;
                                var forecastTempMin = forecast[i].main.temp_min;
                                var forecastTempMax = forecast[i].main.temp_max;
                                var forecastHumidity = forecast[i].main.humidity;
                                var forecastWindSpeed = forecast[i].wind.speed;
                                var forecastWeatherDescription = forecast[i].weather[0].description;
                                var forecastWeatherIcon = forecast[i].weather[0].icon;
                                var forecastWeatherIconURL = 'http://openweathermap.org/img/w/' + forecastWeatherIcon + '.png';
                                var date = forecast[i].dt_txt.substring(0, 10);

                                // Create a new forecast element
                                var forecastElement = document.createElement("div");
                                forecastElement.classList.add("forecast");

                                // Add the forecast content to the element
                                forecastElement.innerHTML = '<h2>' + date + '</h2>' +
                                    '<img class="col" src="' + forecastWeatherIconURL + '" alt="' + forecastWeatherDescription + '">' +
                                    '<div class="col">' + forecastWeatherDescription + '</div>' +
                                    '<div class="col">' + forecastTemp + ' °F</div>' +
                                    '<div class="col">Min: ' + forecastTempMin + ' °F</div>' +
                                    '<div class="col">Max: ' + forecastTempMax + ' °F</div>' +
                                    '<div class="col">Wind: ' + forecastWindSpeed + ' mph</div>' +
                                    '<div class="col">Humidity: ' + forecastHumidity + '%</div>';

                                // Append the forecast element to the container
                                forecastContainer.appendChild(forecastElement);
                            }
                        }
                    })
            })
    }
});