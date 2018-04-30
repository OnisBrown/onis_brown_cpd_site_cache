
// use when testing phone gap as will not get fired in browser
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){
  console.log("device ready");


  innit()
}

function innit() {
  document.addEventListener("online", ononline, false);
  document.addEventListener("offline", onoffline, false);

  if(window.navigator.online){
    $('body').addclass('online');

  }

  else{
    console.log('window navigator offline');
  }
}

$(document).ready(function (e) {
  console.log("app ready");

  function showView(currentView) {
    $('.view').hide();
    $(currentView).show();
  }

  $('a').click("touchstart", function (e) {
    e.preventDefault();
    var currentView = $(this).attr('href');
    showView(currentView);
  });

  innit();
  while(navigator.onLine){
    map_callback();
    console.log("calling...")
  }
});

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
  } else {
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
          gestureHandling: 'greedy',
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
                        "color": "#EDC9AF"
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
      }
      var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
      map.setMyLocationEnabled(true);
      // Add an overlay to the map of current lat/lng
      var marker = new google.maps.Marker({
          position: latlng,
         map: map,
      });
      console.log("map ready")
      map.setCenter(initialLocation);
  }
}

function onoffline() {
  $('body').removeClass('online');
  $('body').addclass('offline');
}

function ononline() {
  $('body').removeClass('offline');
  $('body').addclass('online');
}
