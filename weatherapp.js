var sherror = document.getElementById("error");
var city = document.getElementById("city");
var nmb = document.getElementById("nmb");
var skyinfo = document.getElementById("sky");
var windinfo = document.getElementById("wind");
var iconsrc = document.getElementById("icon");
var unit = document.getElementById("tmp").innerHTML;
var unittmp = document.getElementById("tmp");
var nmbNoChange = 0;
unittmp.style.display = "none";
iconsrc.style.display = "none";

//returns the latitude and longitude of the user's position:
navigator.geolocation.getCurrentPosition(sendPosition, showError);

function sendPosition(position) {
	var lat = position.coords.latitude;
	var lon = position.coords.longitude;  


	function getGs(data) {	
		var cityname = data.name;
		var wind = data.wind.speed;
		var temp = data.main.temp;
		$.each(data.weather, function(i, weather) {
			var sky = weather.description;
			skyinfo.textContent = sky;
			var url_icon = "http://openweathermap.org/img/w/";
			var icon = url_icon + weather.icon + '.png';
			iconsrc.setAttribute('src', icon);
			iconsrc.style.display = "block";
		})
		city.textContent = cityname;
		nmb.textContent = Math.round(temp);
		unittmp.style.display = "inline-block";
		windinfo.textContent = wind + ' mph';

	}

    //send request to Open Weather Map and get needed info
	$(document).ready(function() {
		var bggAPI = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=2e8b072435061d8e8f6cff78b7184789';

		$.ajax({
			dataType: "json",
			url: bggAPI,
			success: getGs,
			error: function(jqxhr, textStatus, error) {
              var err = textStatus + ", " + error;
              $("#error").append('Request to the server failed. Try again later!');
            }
		});
	}); 

}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            sherror.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            sherror.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            sherror.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            sherror.innerHTML = "An unknown error occurred."
            break;
    }
}

// changes to F and C when you click on the "F" or "C" 

function changeToC() {
    var nmbinner = document.getElementById("nmb").innerHTML;
    
    if (unit === ' F ') {
      var tempC = (nmbinner - 32) * 5/9;
      //tempC = Math.round(tempC);
      nmbNoChange = tempC;
      nmbinner = tempC;
      nmb.textContent = Math.round(tempC);
      unittmp.textContent = ' C ';
      unit = ' C ';
      
	} else if (unit === ' C ') {
	  var tempF = nmbNoChange * 9/5 + 32;
	  nmb.textContent = tempF;	
	  unittmp.textContent = ' F ';
	  unit = ' F ';
	  nmbinner = tempF;
	}   

}











