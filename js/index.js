var APIKEY = "1136291543d398fff86ff109cf09ce1f";
var ENDPOINT = "http://api.openweathermap.org/data/2.5/weather";
function toCelsius (t) {
  return Math.round(t - 273.15);
}
function onReturnSuccess (data) {
  $('#result-container').fadeIn();
  $('#result').html(
    "Localizacao: " + data.name + "<br/>" +
    "Temp min: " + toCelsius(data.main.temp_min) + "ºC<br/>" +
    "Temp max: " + toCelsius(data.main.temp_max) + "ºC<br/>" +
    "Humidade: " + data.main.humidity + "<br/>" +
    "Humidade: " + data.main.pressure + "<br/>"
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
  navigator.geolocation.getCurrentPosition(function(position) {
    getWeatherByPos(position.coords.latitude, position.coords.longitude);
  });
  $('form').submit(function (e) {
    e.preventDefault();
    getWeatherByName($('#city').val(), $('#country').val());
  })
});
