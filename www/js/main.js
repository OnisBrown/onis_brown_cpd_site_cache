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
  window.addEventListener("compassneedscalibration",function(event) {
    // ask user to wave device in a figure-eight motion
       event.preventDefault();
  }, true);
  console.log("app ready");
	init();
}

var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);

//relic object
var Relic_pointer = {
	name: "",
	Cur_pos: {
		lat: 0,
		long: 0,
	},
	Goal_pos: {
		lat: 0,
		long: 0,
	},
};

var user = {
	name: "",
	relics_found: [],
}

var relic_list = [];
//setting up database
var db;
var databaseName = 'GDDB';
var databaseVersion = 1;
var openRequest = window.indexedDB.open(databaseName, databaseVersion);
openRequest.onerror = function (event) {
    console.log(openRequest.errorCode);
};
openRequest.onsuccess = function (event) {
    // Database is open and initialized - we're good to proceed.
    db = openRequest.result;
    displayData();
};

function relic(name, location, text){
	this.name = name;
	this.location = location;
	this.text = text;
}

function init(){ // populate relic list with default relics
	console.log('init called')
	var London_text = "Actually fake"
	var london_loc = {
		lat: 51.5078726,
		long: -0.0764334,
	};
	var london = new relic("Crown Jewels", london_loc , London_text);
	relic_list.push(london);

	var cathedral_text = "Cathedral stuff"
	var cathedral_loc = {
		lat: 53.2342871,
		long: -0.53603,
	};
	var cathedral = new relic("Holy Grail", cathedral_loc , cathedral_text);
	relic_list.push(cathedral);


	var marc_text = "Marc is one of the universities treasures"
	var marc_loc = {
		lat: 53.2270493,
		long: -0.5476376,
	};
	var marc = new relic("M4RC", marc_loc , marc_text);
	relic_list.push(marc);

	document.getElementById("world_count").innerHTML = relic_list.length + " relics in the world";
}

function showView(currentView) {
  $('.view').hide();
  $(currentView).show();
	console.log("changed page");
}

$('form').submit(function (evt) {
   evt.preventDefault(); //prevents the form from putting the app at start screen
});


function login(){
	var name = document.getElementById('username').value;

	if (localStorage.getItem('username') === null) { //user doesn't exist yet create new user
		user.name = name;
		user.relics_found = [];
		storage.setItem(name, JSON.stringify(user));
	}

	user = JSON.parse(storage.getItem(name));
	document.getElementById("Prof_name").innerHTML = user.name;
	document.getElementById("Prof_count").innerHTML = user.relics_found.length + " relics found";
	showView("#Profile");
}

$('a').click("touchstart", function (e) {

  e.preventDefault();
  var currentView = $(this).attr('href');
	watch_pos = navigator.geolocation.watchPosition(onLocSuccess, onError, {maximumAge: 500, enableHighAccuracy:true, timeout: 1000});
  window.addEventListener("deviceorientation",onCompSuccess, true);
	console.log("loaded position watch");

	if (currentView != "#Tracking"){
		navigator.geolocation.clearWatch(watch_pos);
    window.removeEventListener("deviceorientation",onCompSuccess);
		console.log("clearing position watch")
	}

  showView(currentView);

});

function onLocSuccess(pos){
	Relic_pointer.Cur_pos.lat = pos.coords.latitude;
	Relic_pointer.Cur_pos.long =	pos.coords.longitude;
  console.log(pos.coords.latitude + " " + pos.coords.longitude);
	document.getElementById("map_button").style.display = "none";

	D = dist();

	if(D < 200){
		document.getElementById("map_button").style.display = "block";
		if(D < 5 && $.inArray(Relic_pointer.name) == -1){
			found(Relic_pointer);
		}
	}
	if (D < 1000){
		document.getElementById("metric").innerHTML ="metres: " + D.toFixed(2);
		document.getElementById("imperial").innerHTML ="feet: " + (D*3.28084).toFixed(2);
	}
	else{
		D = D / 1000
		document.getElementById("metric").innerHTML ="km: " + D.toFixed(2);
		document.getElementById("imperial").innerHTML ="miles: " + (D/1.609344).toFixed(2);
	}

}

function onCompSuccess(event){
  B = direction();
	P = B-(360 - event.alpha); //find angle to turn to relative to user.
	document.getElementById("arrow").style.transform="rotate(" + P + "deg)"
}

function onError(e){
	console.log(e);
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
      map.setCenter( new google.maps.LatLng(Relic_pointer.Goal_pos.lat, Relic_pointer.Goal_pos.long));
  }
}

$('.pointer_button').click("touchstart", function (e) {
	console.log('trying to change pointer');
	var id;
	var name = event.target.id;
	if (name == 'uni'){
		id = 2;
	}
	else if (name == 'cathedral'){
		id = 1;
	}
	else if (name == 'london'){
		id = 0;
	}
	Relic_pointer.Goal_pos.lat = relic_list[id].location.lat;
  Relic_pointer.Goal_pos.long = relic_list[id].location.long;
  console.log('changing pointer to ' + name);
});

function found(){
	user.relics_found.push(Relic_pointer.name);
	storage.setItem(user.name, JSON.stringify(user));
	document.getElementById("Prof_count").innerHTML = user.relics_found.length + " relics found";
}

/* Set the width of the side navigation to 100% */
function showSide() {
    document.getElementById("mySideBar").style.width = "100%";
		map_callback();
}

/* Set the width of the side navigation to 0 */
function hideSide() {
    document.getElementById("mySideBar").style.width = "0";
}


/* Distance calculations adapted from https://www.movable-type.co.uk/scripts/latlong.html#latlon-src  */

function toRadians(num) {
	return num * Math.PI / 180;
}

function toDegrees(num) {
	return num *  180 / Math.PI;
}

function direction(){
	var lat1 = toRadians(Relic_pointer.Cur_pos.lat);
	var long1 = toRadians(Relic_pointer.Cur_pos.long);
	var lat2 = toRadians(Relic_pointer.Goal_pos.lat);
	var long2 = toRadians(Relic_pointer.Goal_pos.long);
	var difflong = long2 - long1;
	var y = Math.sin(difflong)*Math.cos(lat2);
	var x = Math.cos(lat1)*Math.sin(lat2) - Math.sin(lat1)*Math.cos(lat2)*Math.cos(difflong);
	var B = toDegrees(Math.atan2(y, x));
	return B
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
