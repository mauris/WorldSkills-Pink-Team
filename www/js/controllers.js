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

.controller('UserController', function($scope, $rootScope, $window, $stateParams, $location, $ionicPlatform, $cordovaLocalNotification, users) {
  $scope.user = users.filter(function(obj) {
    return +$stateParams.id === +obj.id;
  })[0];


  $ionicPlatform.ready(function() {
    if (!$window.cordova) {
      return;
    }

    $cordovaLocalNotification.registerPermission();
    $scope.scheduleSingleNotification = function () {
      $cordovaLocalNotification.schedule({
        id: 1,
        title: 'Title here',
        text: 'Text here'
      }).then(function (result) {
        // ...
      });
    };

    $scope.scheduleSingleNotification();
  });

  $scope.selectAngel = function() {
    $location.path('/patients-waiting');
  };
})

.controller('LocationPromptController', function($scope, $location, $rootScope, $http, $cordovaGeolocation, $ionicLoading, $ionicPopup) {
  $scope.position = {
    zoom: 4,
    lat: -15.7833,
    lng: -47.8667
  };

  $scope.isLoading = false;

  $scope.getLocation = function() {
    $scope.isLoading = true;

    var posOptions = {timeout: 10000, enableHighAccuracy: true};

    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
        $scope.position.zoom = 11;
        $scope.position.lat = position.coords.latitude;
        $scope.position.lng = position.coords.longitude;

        $rootScope.user.location.lat = $scope.position.lat;
        $rootScope.user.location.lng = $scope.position.lng;

        $scope.isLoading = false;

        $scope.showConfirm();
      }, function(err) {
        // error
      });
  };

  $scope.nextButtonClick = function() {
    if ($rootScope.user.role === 'fighter') {
      $location.path('/feeling');
    } else {
      $location.path('/fighter-request');
    }
  }

  $scope.skipButtonClick = function() {
    $rootScope.locationPromptMessage = 'That\'s okay. Last question: How are you feeling today?';
    $scope.nextButtonClick();
  };

  // A confirm dialog
  $scope.showConfirm = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'I found you!',
      template: 'Are you in São Paulo?'
    });
    confirmPopup.then(function(res) {
      if (res) {
        $scope.skipButtonClick();
      }
    });
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
    $location.path('/role');
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
