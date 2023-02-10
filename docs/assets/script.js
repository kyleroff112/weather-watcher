// https://openweathermap.org/forecast5



document.getElementById("searchButton").addEventListener("click", function(){
    event.preventDefault();
    var searchTerms = document.getElementById("searchTerms").value
    var searchTermsJson = JSON.stringify(searchTerms);
    console.log(searchTermsJson);
    var apiURL= 'api.openweathermap.org/data/2.5/weather?q='+searchTermsJson+'&APPID=2f41a48f60d6d854be758ad4552fc631'
    console.log(searchTermsJson);
    console.log(apiURL);
    fetch(apiURL)
.then(function(response){
    return response.json();
})
.then(function(data){
    console.log(data);
});
});

