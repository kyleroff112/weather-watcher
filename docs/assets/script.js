document.getElementById("searchButton").addEventListener("click", function () {
    event.preventDefault();
    var city = document.getElementById("city").value;
    if (city === "") {
        alert("Please enter a city");
        return;
    }
    else {
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
                        var dailyData = {};
                        data.list.forEach(function (element) {
                            var date = new Date(element.dt * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
                            if (!dailyData[date]) {
                                dailyData[date] = {
                                    temps: [],
                                    humidities: [],
                                    winds: [],
                                    icons: []
                                };
                            }
                            dailyData[date].temps.push(element.main.temp);
                            dailyData[date].humidities.push(element.main.humidity);
                            dailyData[date].winds.push(element.wind.speed);
                            dailyData[date].icons.push(element.weather[0].icon);
                        });
                        for (var date in dailyData) {
                            var temp = Math.round(dailyData[date].temps.reduce((a, b) => a + b) / dailyData[date].temps.length);
                            var humidity = Math.round(dailyData[date].humidities.reduce((a, b) => a + b) / dailyData[date].humidities.length);
                            var wind = Math.round(dailyData[date].winds.reduce((a, b) => a + b) / dailyData[date].winds.length);
                            var icon = dailyData[date].icons[0];
                            var iconURL = 'http://openweathermap.org/img/w/' + icon + '.png';

                            var card = document.createElement("div");
                            card.classList.add("card");
                            var cardBody = document.createElement("div");
                            cardBody.classList.add("card-body");
                            var cardTitle = document.createElement("h5");
                            cardTitle.classList.add("card-title");
                            cardTitle.innerHTML = date;
                            var cardText = document.createElement("p");
                            cardText.classList.add("card-text");
                            cardText.innerHTML = "Temp: " + temp + " &#8457; Humidity: " + humidity + " Wind: " + wind + " MPH";
                            var cardImg = document.createElement("img");
                            cardImg.setAttribute("src", iconURL);
                            cardImg.setAttribute("alt", "weather icon");
                            cardBody.appendChild(cardTitle);
                            cardBody.appendChild(cardText);
                            cardBody.appendChild(cardImg);
                            card.appendChild(cardBody);
                            document.getElementById("forecast").appendChild(card);
                        }
                    })
            })
    }
});
