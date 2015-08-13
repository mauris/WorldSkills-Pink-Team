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
  $scope.showConfirmation = false;
  (function(google, gmaps){
    var map, marker;
    var geocoder = new gmaps.Geocoder();
    var mapOptions = {
      center: new gmaps.LatLng(-22.3224217,-53.438013),
      zoom: 3,
      streetViewControl: false,
      mapTypeControl: false,
      zoomControl: false,
      draggable: false
    };

    var getArea = function(latLng, components){
        var streetNumber, route, postalCode, area;
        for (var i in components) {
            var component = components[i];
            if (!area && component.types.indexOf("administrative_area_level_1") > -1) {
                area = component.long_name;
            }
        }

        return area;
    }

    function initialize() {
        map = new gmaps.Map(document.getElementById("map-canvas"), mapOptions);

        gmaps.event.addListener(map, 'mousedown', function(event) {
          geocoder.geocode({'location': event.latLng}, function(results, status){
            if (status == gmaps.GeocoderStatus.OK && results[0]) {
              var neighbourhood = getArea(event.latLng, results[0].address_components);
              $scope.$apply(function(){
                $scope.showConfirmation = true;
              });
              document.getElementById('location-prompt-area').innerHTML = neighbourhood;
            }
          });
        });
    }
    gmaps.event.addDomListener(window, 'load', initialize);
  })(google, google.maps);
})

.controller('FeelingController', function($scope) {

})

.controller('FeelingReplyController', function($scope) {
  $scope.name = "John";
});
