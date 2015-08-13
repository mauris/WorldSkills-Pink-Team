angular.module('starter.controllers', [])

.controller('HomeController', function($scope) {

})

.controller('MatchController', function($scope, $filter, nearestNeighbor, users) {
  console.log(users);

  var query = {
    gender: 'male',
    location: {lat:-23.52677, lng:-46.664291},
    status: 'married',
    typeOfIssue: 'Cervical',
    treatment: 'Surgery',
    numberOfChildren: 1,
    role: 'fighter'
  };

  var fields = [
    {name: 'gender', measure: nearestNeighbor.comparisonMethods.word},
    {name: 'status', measure: nearestNeighbor.comparisonMethods.word},
    {name: 'typeOfIssue', measure: nearestNeighbor.comparisonMethods.word},
    {name: 'treatment', measure: nearestNeighbor.comparisonMethods.word},
    {name: 'numberOfChildren', measure: nearestNeighbor.comparisonMethods.number, max: 100}
  ];

  nearestNeighbor.findMostSimilar(query, users, fields, function(nearest) {
    console.log('=== Query ===');
    console.log(query);

    console.log('=== Results ===');
    console.log( $filter('orderBy')(nearest, 'similarity', true) );
  });
})

.controller('LocationPromptController', function($scope) {
  (function(google, gmaps){
    var map, marker;
    var geocoder = new gmaps.Geocoder();
    var mapOptions = {
      center: new gmaps.LatLng(-22.3224217,-53.438013),
      zoom: 3,
      streetViewControl: false,
      mapTypeControl: false,
      draggable: false
    };

    function initialize() {
        map = new gmaps.Map(document.getElementById("map-canvas"), mapOptions);
    }
    gmaps.event.addDomListener(window, 'load', initialize);
  })(google, google.maps);
});
