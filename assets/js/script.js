
//Variables
var APIKey = "da2f510d4cc05f82ad9ae77d6a7fee57"
var searchValue = "";
var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=';

// On click fucntion for search button
$("#searchBtn").click(function(){
console.log("onclick")
Searchweather();
});

// FUNCTION
function Searchweather() {
  
  var searchValue = $("#searchInput").val();

  $.ajax({
    url: queryURL + searchValue + '&APPID=' + APIKey,
    method: "GET"
  })
  
    .then(function(response) {
  
      console.log(queryURL);
  
      console.log(response);
  
      $(".city").html("<h1>" + response.name + " Weather Details</h1>");
      $(".wind").text("Wind Speed: " + response.wind.speed);
      $(".humidity").text("Humidity: " + response.main.humidity);
      $(".temp").text("Temperature (F) " + response.main.temp);
  
    });
}




  
  var time = moment().format('LL');