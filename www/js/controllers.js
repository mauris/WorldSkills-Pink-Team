angular.module('pinkTeam.controllers', ["ngCordova"])

.controller('HomeController', function($scope, $rootScope) {
})

.controller('MatchController', function($scope, $rootScope, $filter, $timeout, $interval,  $ionicLoading, $stateParams, nearestNeighbor, users) {
  // Loading
  $scope.isLoading = $stateParams.isLoading ? true : false;
  $scope.loadingProgress = 10;

  var duration = 60;
  var loading = $interval(function() {
    $scope.loadingProgress = $scope.loadingProgress + Math.ceil(Math.random() * 3 + 1);

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
    {name: 'religion', measure: nearestNeighbor.comparisonMethods.word},
    {name: 'music', measure: nearestNeighbor.comparisonMethods.wordArray},
    {name: 'movies', measure: nearestNeighbor.comparisonMethods.wordArray},
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

  if (window.cordova && false) {
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
  }

  $scope.selectAngel = function() {
    $location.path('/patients-waiting');
  };
})

.controller('LocationPromptController', function($scope, $location, $rootScope, $cordovaGeolocation, $ionicLoading) {
  $scope.position = {
    zoom: 4,
    lat: -15.7833,
    lng: -47.8667
  };

  $scope.showLoading = function() {
    $ionicLoading.show({
      template: 'Loading...'
    });
  };

  $scope.hideLoading = function(){
    $ionicLoading.hide();
  };

  $scope.hasDoneLocationFetch = false;

  $scope.getLocation = function() {
    $scope.showLoading();
    var posOptions = {timeout: 10000, enableHighAccuracy: true};

    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
        $scope.position.zoom = 11;
        $scope.position.lat = position.coords.latitude;
        $scope.position.lng = position.coords.longitude;

        $rootScope.user.location.lat = $scope.position.lat;
        $rootScope.user.location.lng = $scope.position.lng;

        $scope.hideLoading();
      }, function(err) {
        // error
      });
  };

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
})

.controller('FeelingController', function($scope, $rootScope) {
  $scope.message = '<span>Thanks! Last question:</span> How are you feeling today?';
  if ($rootScope.locationPromptMessage) {
    $scope.message = $rootScope.locationPromptMessage;
  }
})

.controller('NicknameController', function($scope, $rootScope, $location) {
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

.controller('FighterController', function($scope, $rootScope) {
  console.log('you are superador');
  $rootScope.user.role = "fighter";
})

.controller('FighterRequestController', function($scope, $rootScope, $timeout) {
  $scope.fighter = {
    name: 'Bruno Venus'
  }

  $scope.showFighterRequest = false;

  $timeout(function(){
    $scope.$apply(function(){
      $scope.showFighterRequest = true;
    })
  }, 5000);
})

.controller('FeelingReplyController', function($scope) {
  $scope.name = "John";
})

.controller('PatientsWaitingController', function($scope, $rootScope) {

});
