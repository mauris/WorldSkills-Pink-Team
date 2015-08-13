angular.module('pinkTeam.controllers', [])

.controller('HomeController', function($scope, $rootScope) {
})

.controller('MatchController', function($scope, $rootScope, $filter, nearestNeighbor, users) {
  $rootScope.user = {
    name: 'Joana',
    birthday: '30/05/1900',
    gender: 'female',
    location: {lat:-23.52677, lng:-46.664291},
    status: 'married',
    typeOfIssue: 'Cervical',
    treatment: 'Surgery',
    numberOfChildren: 1,
    role: 'fighter'
  };

  var query = $rootScope.user;

  var fields = [
    {name: 'gender', measure: nearestNeighbor.comparisonMethods.word},
    {name: 'status', measure: nearestNeighbor.comparisonMethods.word},
    {name: 'typeOfIssue', measure: nearestNeighbor.comparisonMethods.word},
    {name: 'treatment', measure: nearestNeighbor.comparisonMethods.word},
    {name: 'numberOfChildren', measure: nearestNeighbor.comparisonMethods.number, max: 100},
    {name: 'state', measure: nearestNeighbor.comparisonMethods.word},
  ];

  nearestNeighbor.findMostSimilar(query, users, fields, function(nearest) {
    $scope.filteredUsers = nearest;
    console.log( nearest );
  });
})

.controller('UserController', function($scope, $rootScope, $stateParams, users) {
  $scope.user = users.filter(function(obj) {
    return +$stateParams.id === +obj.id;
  })[0];
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
  })(google, google.maps);
})

.controller('FeelingController', function($scope) {

})

.controller('FeelingReplyController', function($scope) {
  $scope.name = "John";
});
