var map;

function initialize() {
  var mapOptions = {
    zoom: 19
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

      var geocoder = new google.maps.Geocoder();

      geocoder.geocode({
         location: pos
      }, function (results) {
         console.log(results[0].formatted_address);
          var infowindow = new google.maps.InfoWindow({
              //map: map,
              position: pos,
              content: 'Your location is ' + results[0].formatted_address
          });

          var marker = new google.maps.Marker({
              map: map,
              position: pos,
              animation: google.maps.Animation.DROP,
              icon: 'beer.png'
          });

          google.maps.event.addListener(marker, 'click', function(){
              infowindow.open(map);
          });

      });


      map.setCenter(pos);
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
}

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

//  var options = {
//    map: map,
//    position: new google.maps.LatLng(60, 105),
//    content: content
//  };

  //var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);