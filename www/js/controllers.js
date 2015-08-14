angular.module('pinkTeam.controllers', ["ngCordova"])

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

  if (window.cordova) {
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
})

.controller('FeelingController', function($scope, $rootScope) {
  $scope.message = 'Thanks! One last question: How are you feeling today?';
  if ($rootScope.locationPromptMessage) {
    $scope.message = $rootScope.locationPromptMessage;
  }
})

.controller('NicknameController', function($scope, $rootScope, $location) {
  $scope.nick = {name: ''};

  document.getElementById('nameTextbox').click();

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
