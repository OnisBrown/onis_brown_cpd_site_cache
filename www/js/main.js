
// use when testing phone gap as will not get fired in browser
document.addEventListener("deviceready", onDeviceReady, false);
// function setup() {
//   navigator.notification.alert(
//     'You are the winner!', // message
//     alertDismissed, // callback
//     'Game Over', // title
//     'Done' // buttonName
//   );
// };

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

function onDeviceReady(){
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
}

function innit() {
  document.addEventListener("online", ononline, false);
  document.addEventListener("offline", onoffline, false);

  if(window.navigator.online){
    $('body').addclass('online');

  }

  else{
    console.log('offline');
    $('body').addclass('offline');

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
