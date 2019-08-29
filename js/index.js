var APIKEY = "1136291543d398fff86ff109cf09ce1f";
var ENDPOINT = "http://api.openweathermap.org/data/2.5/weather";
var map;
function toCelsius (number) {
  return Math.round(number - 273.15);
}
function onReturnSuccess (data) {
  sessionStorage.setItem("weather", JSON.stringify(data));
  $('#result-container').fadeIn();
  $('#result').html(
    "Localizacao: " + data.name + "<br/>" +
    "Temp min: " + toCelsius(data.main.temp_min) + "ºC<br/>" +
    "Temp max: " + toCelsius(data.main.temp_max) + "ºC<br/>" +
    "Humidade: " + data.main.humidity + "<br/>" +
    "Pressao: " + data.main.pressure + "<br/>"
  )
}

function onError (error) {
  console.error("Cidade nao existe, erro ",  error );
}

function getWeatherByName (city, country) {
  $.ajax({
    dataType: "json",
    url: ENDPOINT + "?q=" + city + "," + country.toLowerCase() + "&appid=" + APIKEY,
    success: onReturnSuccess,
    error: onError
  });
}
function getWeatherByPos (lat, lon) {
  $.ajax({
    dataType: "json",
    url: ENDPOINT + "?lat=" + lat + "&lon=" + lon + "&appid=" + APIKEY,
    success: onReturnSuccess,
    error: onError
  });
}
$('#result-container').hide();
$(document).ready(function () {
  var dataStorage = sessionStorage.getItem("weather");

  if(dataStorage !== null) {
    onReturnSuccess(JSON.parse(dataStorage));
  } else {
    navigator.geolocation.getCurrentPosition(function(position) {
      getWeatherByPos(position.coords.latitude, position.coords.longitude);
      map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: position.coords.latitude, lng: position.coords.longitude},
            zoom: 15
      });
    });
  }


  $('form').submit(function (e) {
    e.preventDefault();
    getWeatherByName($('#city').val(), $('#country').val());
  })
});
