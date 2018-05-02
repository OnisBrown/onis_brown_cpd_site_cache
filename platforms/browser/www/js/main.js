// use when testing phone gap as will not get fired in browser
$(document).ready(function (e) {

  window.isphone = false;
    if(document.URL.indexOf("http://") === -1 && document.URL.indexOf("https://") === -1) {
      window.isphone = true;
    }

    if( window.isphone ) {
        document.addEventListener("deviceready", onDeviceReady, false);
    } else {
        onDeviceReady();
    }
});


function onDeviceReady(){
  if (cordova.platformId == 'android') { //set the colour of the status bar for android
    StatusBar.backgroundColorByHexString("#40E0D0");
  }
  console.log("app ready");
}

var Relic_pointer = {
	Cur_pos: {
		lat: 0,
		long: 0,
	},

	Goal_pos: {
		lat: 51.5074,
		long: 0.1278,
	},

	Goal_bearing: 0
};

function showView(currentView) {
  $('.view').hide();
  $(currentView).show();
}

$('a').click("touchstart", function (e) {

  e.preventDefault();
  var currentView = $(this).attr('href');
	console.log(currentView)

	watch_pos = navigator.geolocation.watchPosition(onSuccess, onError, {maximumAge: 1000, enableHighAccuracy:true, timeout: 3000});
	console.log("loaded position watch");

	if (currentView != "#Tracking"){
		navigator.geolocation.clearWatch(watch_pos);
		console.log("clearing position watch")
	}

  showView(currentView);
	console.log("changed page");
});

function onSuccess(pos){
	Relic_pointer.Cur_pos.lat = pos.coords.latitude;
	Relic_pointer.Cur_pos.long =	pos.coords.longitude;
	Relic_pointer.Goal_bearing = pos.coords.heading;
	D = dist();
	document.getElementById("miles").innerHTML = D + " metres";
}

function onError(){
	console.log("couldn't get position data");
}

function map_callback() {
  var defaultLatLng = new google.maps.LatLng(34.0983425, -118.3267434);  // Default to Hollywood, CA when no geolocation support
  console.log("map starting");
  if ( navigator.geolocation ) {

			function success(pos) {
          // Location found, show map with these coordinates
          drawMap(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      }

      function fail(error) {
          drawMap(defaultLatLng);  // Failed to find location, show default map
          console.log(error)
      }
      // Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
      navigator.geolocation.getCurrentPosition(success, fail, {maximumAge: 500000, enableHighAccuracy:true, timeout: 6000});
  }
	else {
      drawMap(defaultLatLng);  // No geolocation support, show default map
  }

  function drawMap(latlng) {
      var myOptions = {
          zoom: 20,
          streetViewControl: false,
          maxZoom: 20,
          minZoom: 18,
          center: latlng,
          zoomControl: false,
          mapTypeControl: false,
          compass: true,
          tilt: 45,
          fullscreenControl: false,
          gestureHandling: 'none',
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          styles: [ //style options for the map
            {
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    },
                    {
                        "color": "#f49f53"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#f7e7ca"
                    },
                    {
                        "lightness": -7
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#050200"
                    },
                    {
                        "lightness": -7
                    }
                ]
            },
            {
                "featureType": "road",
                "stylers": [
                    {
                        "color": "#813033"
                    },
                    {
                        "lightness": 43
                    }
                ]
            },
            {
                "featureType": "poi.business",
                "stylers": [
                    {
                      "visibility": "off"
                    },
                    {
                        "color": "#645c20"
                    },
                    {
                        "lightness": 38
                    }
                ]
            },
            {
                "featureType": "water",
                "stylers": [
                    {
                        "color": "#1994bf"
                    },
                    {
                        "saturation": -69
                    },
                    {
                        "gamma": 0.99
                    },
                    {
                        "lightness": 43
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#f19f53"
                    },
                    {
                        "weight": 1.3
                    },
                    {
                        "visibility": "on"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "stylers": [
                    {
                        "color": "#cabd66"
                    },
                    {
                        "lightness": 39
                    }
                ]
            },
            {
                "featureType": "poi.school",
                "stylers": [
                    {
                      "visibility": "off"
                    },
                    {
                        "color": "#a95521"
                    },
                    {
                        "lightness": 35
                    }
                ]
            },
            {
                "featureType": "poi.medical",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#813033"
                    },
                    {
                        "lightness": 38
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "elementType": "labels"
            },
            {
                "featureType": "poi.sports_complex",
                "stylers": [
                    {
                        "color": "#9e5916"
                    },
                    {
                        "lightness": 32
                    }
                ]
            },
            {
                "featureType": "poi.government",
                "stylers": [
                    {
                      "visibility": "off"
                    },
                    {
                        "color": "#9e5916"
                    },
                    {
                        "lightness": 46
                    }
                ]
            },
            {
                "featureType": "transit.station",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "stylers": [
                    {
                        "color": "#813033"
                    },
                    {
                        "lightness": 22
                    }
                ]
            },
            {
                "featureType": "transit",
                "stylers": [
                    {
                        "lightness": 38
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#f19f53"
                    },
                    {
                        "lightness": -10
                    }
                ]
            }
          ]
      };
      var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
      // Add an overlay to the map of current lat/lng
      var marker = new google.maps.Marker({
          position: latlng,
         map: map,
      });
      console.log("map ready");
      map.setCenter(latlng);
  }
}

/* Set the width of the side navigation to 250px */
function showSide() {
    document.getElementById("mySideBar").style.width = "250px";

}

/* Set the width of the side navigation to 0 */
function hideSide() {
    document.getElementById("mySideBar").style.width = "0";
}


/* Distance calculations adapted from https://www.movable-type.co.uk/scripts/latlong.html#latlon-src  */

function toRadians(num) {
	return num * Math.PI / 180;
}

function dist(){
	var r = 6371e3; //metres
	var lat1 = toRadians(Relic_pointer.Cur_pos.lat);
	var long1 = toRadians(Relic_pointer.Cur_pos.long);
	var lat2 = toRadians(Relic_pointer.Goal_pos.lat);
	var long2 = toRadians(Relic_pointer.Goal_pos.long);
	var difflat = lat2 - lat1;
	var difflong = long2 - long1;
	var calc = Math.sin(difflat/2)* Math.sin(difflat/2) +
						Math.cos(lat1)*Math.cos(lat2)*Math.sin(difflong/2)*
						Math.sin(difflong/2);

	var calc2 = 2*Math.atan2(Math.sqrt(calc), Math.sqrt(1-calc));

	var D = r * calc2;

	return Math.round(D);
}
