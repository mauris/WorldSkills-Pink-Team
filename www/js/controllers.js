angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, nearestNeighbor) {
  var items = [
    { name: "Bill", age: 10, pc: "Mac"},
    { name: "Bill", age: 10, pc: "Mac"},
    { name: "Bill", age: 10, pc: "Mac"},
    { name: "Bob", age: 10, pc: "Mac"},
    { name: "Bob", age: 11, pc: ""},
  ];

  var query = { name: "Bob", age: 12, pc: "Windows" };

  var fields = [
    { name: "name", measure: nearestNeighbor.comparisonMethods.word },
    { name: "age", measure: nearestNeighbor.comparisonMethods.number, max: 100 },
    { name: "pc", measure: nearestNeighbor.comparisonMethods.word }
  ];

  nearestNeighbor.findMostSimilar(query, items, fields, function(nearest) {
    console.log('=== Query ===');
    console.log(query);

    console.log('=== Results ===');
    console.log(nearest);
  });
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('LocationPromptCtrl', function($scope) {
  var map, marker;
  var geocoder = new gmaps.Geocoder();
  var mapOptions = {
    center: new gmaps.LatLng(-17.3224217,-47.438013),
    zoom: 11
  };

  function initialize() {
      map = new gmaps.Map(document.getElementById("map-canvas"), mapOptions);
  }
  gmaps.event.addDomListener(window, 'load', initialize);
});
