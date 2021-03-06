$(document).ready(function() {
  console.log('v1.2');

  // Text Color
  $('body').css('color',config.txtColor);

  // Init Background images
  $.backstretch(config.bgImages, {duration: config.bgImageDuration, fade: config.bgImageFade});

  // Init Clock & weather/map refresh
  startTime();
  setInterval("startTime()", 1000);
  getWeather();
  setInterval("getWeather()", 900000);
}); // End DocReady

// Clock
function startTime() {

  // Compose the string for display
  var currentTimeString = moment().format('h:mm A');

  // Update the time display
  $('.time').html(currentTimeString);

  var dayOfWeek = moment().format('dddd');
  var mmddyy = moment().format("MMM Do YYYY");

  // Update date
  $('.date').html(dayOfWeek);

  // Update top date
  $('.mmddyyyy').html(mmddyy);

}

// Init Weather
function getWeather(){

  // Refresh the google map for up to date traffic data
  initializeMap();

  $.simpleWeather({
    location: config.myLocation,
    success: function(weather) {

      $('#content').show();

      $('.sunriseTime').html(weather.sunrise);
      $('.sunsetTime').html(weather.sunset);

      $('.current .weather').html(weather.currently);
      $('.future .weather').html(weather.forecast[0].text);
      $('.tempHigh').html('H: ' + weather.high + '&deg; |');
      $('.tempLow').html('L: ' + weather.low+'&deg;');
      $('.temp').html(weather.temp + '&deg;' + weather.units.temp);

      $('.humidityWind').html('Humidity: '+ weather.humidity +'% |'+' Wind: '+weather.wind.direction+' at '+weather.wind.speed+'MPH');

      // Displays the right weather icon.  We're basing this off of a font, so we need to match the error codes with the font characters (this was a pain in the ass, just saying)
      if(weather.code == '0') {
        weatherCode = ':';
      } else if(weather.code === '1') {
        weatherCode = 'Q';
      } else if(weather.code === '2') {
        weatherCode = ':';
      } else if(weather.code === '3') {
        weatherCode = 'Q';
      } else if(weather.code === '4') {
        weatherCode = 'Y';
      } else if(weather.code === '5') {
        weatherCode = 'U';
      } else if(weather.code === '6') {
        weatherCode = 'W';
      } else if(weather.code === '7') {
        weatherCode = 'W';
      } else if(weather.code === '8') {
        weatherCode = 'I';
      } else if(weather.code === '9') {
        weatherCode = 'I';
      } else if(weather.code === '10') {
        weatherCode = 'O';
      } else if(weather.code === '11') {
        weatherCode = 'K';
      } else if(weather.code === '12') {
        weatherCode = 'K';
      } else if(weather.code === '13') {
        weatherCode = 'I';
      } else if(weather.code === '14') {
        weatherCode = 'I';
      } else if(weather.code === '15') {
        weatherCode = 'I,';
      } else if(weather.code === '16') {
        weatherCode = 'I';
      } else if(weather.code === '17') {
        weatherCode = 'M';
      } else if(weather.code === '18') {
        weatherCode = 'O';
      } else if(weather.code === '19') {
        weatherCode = ',';
      } else if(weather.code === '20') {
        weatherCode = '!';
      } else if(weather.code === '21') {
        weatherCode = '…';
      } else if(weather.code === '22') {
        weatherCode = '';
      } else if(weather.code === '23') {
        weatherCode = 'E';
      } else if(weather.code === '24') {
        weatherCode = 'E';
      } else if(weather.code === '25') {
        weatherCode = '&ldquo;';
      } else if(weather.code === '26') {
        weatherCode = 'a';
      } else if(weather.code === '27') {
        weatherCode = 'e';
      } else if(weather.code === '28') {
        weatherCode = '3';
      } else if(weather.code === '29') {
        weatherCode = 'c';
      } else if(weather.code === '30') {
        weatherCode = '2';
      } else if(weather.code === '31') {
        weatherCode = '6';
      } else if(weather.code === '32') {
        weatherCode = '1';
      } else if(weather.code === '33') {
        weatherCode = '6';
      } else if(weather.code === '34') {
        weatherCode = '1';
      } else if(weather.code === '35') {
        weatherCode = 'W';
      } else if(weather.code === '36') {
        weatherCode = '&lsquo;';
      } else if(weather.code === '37') {
        weatherCode = 'Y';
      } else if(weather.code === '38') {
        weatherCode = 'x';
      } else if(weather.code === '39') {
        weatherCode = 'x';
      } else if(weather.code === '40') {
        weatherCode = 'l';
      } else if(weather.code === '41') {
        weatherCode = 'M';
      } else if(weather.code === '42') {
        weatherCode = 'l';
      } else if(weather.code === '43') {
        weatherCode = 'M';
      } else if(weather.code === '44') {
        weatherCode = '2';
      } else if(weather.code === '45') {
        weatherCode = 'Q';
      } else if(weather.code === '46') {
        weatherCode = 'I';
      } else if(weather.code === '47') {
        weatherCode = 'S';
      } else if(weather.code === '3200') {
        weatherCode = '*';
      }

      $('.weathericon').html(weatherCode);
    },
    error: function(error) {
      $(".date").html('Weather error, check your settings! ' + error);
      console.log(error);
    }
  });
}

// Init Traffic Map
function initializeMap(){
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: config.mapZoom,
    center: new google.maps.LatLng(config.mapLat, config.mapLong),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var trafficLayer = new google.maps.TrafficLayer();
  trafficLayer.setMap(map);
  google.maps.event.trigger(trafficLayer, 'resize');
}