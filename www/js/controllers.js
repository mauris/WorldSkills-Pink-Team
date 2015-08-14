angular.module('pinkTeam.controllers', [])

.controller('HomeController', function($scope, $rootScope) {
})

.controller('MatchController', function($scope, $rootScope, $filter, $timeout, $interval,  $ionicLoading, $stateParams, nearestNeighbor, users) {
  // Loading
  $scope.isLoading = $stateParams.isLoading ? true : false;
  $scope.loadingProgress = 10;

  var duration = 50;
  var loading = $interval(function() {
    $scope.loadingProgress = $scope.loadingProgress + Math.ceil(Math.random() * 5 + 2);

    if ($scope.loadingProgress >= 100) {
      $interval.cancel(loading);
      $scope.isLoading = false;
    }
  }, duration);

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

.controller('UserController', function($scope, $rootScope, $stateParams, $location, $cordovaLocalNotification, users) {
  $scope.user = users.filter(function(obj) {
    return +$stateParams.id === +obj.id;
  })[0];

  $scope.scheduleSingleNotification = function () {
    $cordovaLocalNotification.schedule({
      id: 1,
      title: 'Title here',
      text: 'Text here',
      data: {
        customProperty: 'custom value'
      }
    }).then(function (result) {
      // ...
    });
  };

  $scope.scheduleSingleNotification();

  $scope.selectAngel = function() {
    $location.path('/patients-waiting');
  };
})

.controller('LocationPromptController', function($scope, $location, $rootScope) {
  $scope.showConfirmation = false;
  $scope.showLoading = false;

  $scope.nextButtonClick = function() {
    if ($rootScope.user.role === 'fighter') {
      $location.path("/feeling");
    } else {
      $location.path("/fighter-request");
    }
  }

  $scope.skipButtonClick = function() {
    $rootScope.locationPromptMessage = 'That\'s okay. Last question: How are you feeling today?';
    $scope.nextButtonClick();
  };

  (function(google, gmaps) {
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
    $scope.$apply(function(){
      $scope.showLoading = true;
    });
      geocoder.geocode({'location': event.latLng}, function(results, status){
        if (status == gmaps.GeocoderStatus.OK && results[0]) {
          var neighbourhood = getArea(event.latLng, results[0].address_components);
          $scope.$apply(function(){
            $scope.showConfirmation = true;
            $scope.showLoading = false;
          });
          document.getElementById('location-prompt-area').innerHTML = neighbourhood;
        }
      });
    });
  })(google, google.maps);
})

.controller('FeelingController', function($scope, $rootScope) {
  $scope.message = 'Thanks! One last question: How are you feeling today?';
  if ($rootScope.locationPromptMessage) {
    $scope.message = $rootScope.locationPromptMessage;
  }
})

.controller('NicknameController', function($scope, $rootScope, $location) {
  $rootScope.user = {
    name: 'Joana',
    birthday: '30/05/1900',
    gender: 'female',
    location: {lat:-23.52677, lng:-46.664291},
    status: 'married',
    typeOfIssue: 'Cervical',
    treatment: 'Surgery',
    numberOfChildren: 1,
    state: "São Paulo",
    role: 'fighter',
    religion: "Catholic",
    music: [
      "Trance music",
      "Fall Out Boy",
      "Katy Perry",
      "David Archuleta",
      "The Fray"
    ],
    movies: [
      "Spirited Away",
      "We Were Soldiers",
      "Zombieland",
      "Empire of the Sun"
    ]
  };

  $scope.nick = {name: ''};

  $scope.submitForm = function() {
    $rootScope.user.name = $scope.nick.name;
    $location.path("/role");
  }
})

.controller('RoleController', function($scope, $rootScope) {
  $scope.nickname = $rootScope.user.name;
})

.controller('AngelController', function($scope, $rootScope) {
  console.log('you are angel');
  $rootScope.user.role = "angel";
})

.controller('FighterController', function($scope) {
  console.log('you are superador');
  $rootScope.user.role = "fighter";
})

.controller('FighterRequestController', function($scope) {
  $scope.fighter = {
    name: 'Amigo'
  }
})

.controller('FeelingReplyController', function($scope) {
  $scope.name = "John";
})

.controller('PatientsWaitingController', function($scope, $rootScope) {

});
