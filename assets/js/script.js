//Variables
var APIKey = "da2f510d4cc05f82ad9ae77d6a7fee57"
var searchValue = "";
var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
var forcastURL = 'https://api.openweathermap.org/data/2.5/forecast?q=';
var time = moment().format('LL');




// 1. CURRENT WEATHER SEARCH


// On click fucntion for search button
$("#searchBtn").click(function () {
  console.log("onclick");

  var searchValue = $("#searchInput").val();

  Searchweather(searchValue);
  fivedayweather(searchValue);


});



// FUNCTION Searchweather = execute this function on click event of #searchBtn
function Searchweather(searchValue) {

  $.ajax({
    url: queryURL + searchValue + '&APPID=' + APIKey,
    method: "GET"
  })
    .then(function (response) {

      console.log(queryURL);

      console.log(response);


      var tempF = parseInt((response.main.temp - 273.15) * 1.8 + 32);


      $(".city").html("<h3>" + response.name + " Weather Details</h3>");
      $(".current-date").text(moment().format("dddd, MMMM Do"));
      $(".current-time").text(moment().format("h:mm:ss a"));
      $(".wind").text("Wind Speed: " + response.wind.speed);
      $(".humidity").text("Humidity: " + response.main.humidity + "%");
      $(".temp").text(`Current Temperature: ${tempF} F°`);

      var lat = response.coord.lat;
      var lon = response.coord.lon;

      getUVidx(lat, lon);


    });
}


function getUVidx(lat, lon) {
  var uvIdxUrl =
    'https://api.openweathermap.org/data/2.5/uvi?appid=da2f510d4cc05f82ad9ae77d6a7fee57' +
    '&lat=' +
    lat +
    '&lon=' +
    lon;
  $.ajax({
    url: uvIdxUrl,
    method: 'GET'
  }).then(function (response) {
    console.log("getUVidx", response.value);
    $('.UV-Index').text(' UV Index: ' + response.value);
  });
}


function fivedayweather(searchValue) {
  var forecast = {};
  $.ajax({
    url: forcastURL + searchValue + '&APPID=' + APIKey,
    method: "GET"
  })
    .then(function (response) {
      console.log(queryURL);
      if(response.cod == "200") {
        response.list.forEach(element => {
          var day = element.dt_txt.split(" ");

          if(day[1] == '12:00:00') {
            forecast[day[0]] = element;
            
            // DATE DAILY
            $('#displayDate1').text(response.list[1].dt_txt);
            $('#displayDate2').text(response.list[9].dt_txt);
            $('#displayDate3').text(response.list[17].dt_txt);
            $('#displayDate4').text(response.list[25].dt_txt);
            $('#displayDate5').text(response.list[33].dt_txt);

            // TEMP DAILY
            var tempF1 = parseInt((response.list[1].main.temp - 273.15) * 1.8 + 32);
            var tempF2 = parseInt((response.list[9].main.temp  - 273.15) * 1.8 + 32);
            var tempF3 = parseInt((response.list[17].main.temp  - 273.15) * 1.8 + 32);
            var tempF4 = parseInt((response.list[25].main.temp - 273.15) * 1.8 + 32);
            var tempF5 = parseInt((response.list[33].main.temp  - 273.15) * 1.8 + 32);
            $('#tempDaily1').text(`Temp: ${tempF1} F°`);
            $('#tempDaily2').text(`Temp: ${tempF2} F°`);
            $('#tempDaily3').text(`Temp: ${tempF3} F°`);
            $('#tempDaily4').text(`Temp: ${tempF4} F°`);
            $('#tempDaily5').text(`Temp: ${tempF5} F°`);

            // HUMIDITY DAILY
            $('#humid1').text("Humidity:" + response.list[1].main.humidity);
            $('#humid2').text("Humidity:" + response.list[9].main.humidity);
            $('#humid3').text("Humidity:" + response.list[17].main.humidity);
            $('#humid4').text("Humidity:" + response.list[25].main.humidity);
            $('#humid5').text("Humidity:" + response.list[33].main.humidity);
            
            //ICON
    
          }
        });
      }
      
      console.log(forecast);
    });
}