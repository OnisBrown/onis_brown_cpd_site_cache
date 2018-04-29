
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

  innit()
});

function map_callback() {
  var defaultLatLng = new google.maps.LatLng(34.0983425, -118.3267434);  // Default to Hollywood, CA when no geolocation support
  console.log("map starting")

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
          zoom: 50,
          center: latlng,
          mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
      // Add an overlay to the map of current lat/lng
      var marker = new google.maps.Marker({
          position: latlng,
          map: map,
      });
      console.log("map ready")
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
