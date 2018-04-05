
// use when testing phone gap as will not get fired in browser
document.addEventListener("deviceready", onDeviceReady, false);
function setup() {
  navigator.notification.alert(
    'You are the winner!', // message
    alertDismissed, // callback
    'Game Over', // title
    'Done' // buttonName
  );
};

$(document).ready(function (e) {
  function showView(currentView) {
    $('.view').hide();
    $(currentView).show();
  }

  $('a').click("touchstart", function (e) {
    e.preventDefault();
    var currentView = $(this).attr('href');
    showView(currentView);
  });

});

function onDeviceReady(){
  console.log("device ready");
  document.addEventListener('pause', on_Pause, false);
  document.addEventListener('menubutton', on_Pause, false);
  document.addEventListener('backbutton', on_Pause, false);
  document.addEventListener('searchbutton', on_Pause, false);
  document.addEventListener('online', on_Pause, false);
  document.addEventListener('offline', on_Pause, false);

  if(window.navigator.online){
    $('body').addclass('online');

  }

  else{
    console.log('offline');
    $('body').addclass('offline');

  }
}
