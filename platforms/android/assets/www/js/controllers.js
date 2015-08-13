angular.module('pinkTeam.controllers', [])

.controller('DashCtrl', function($scope, $filter, nearestNeighbor, users) {
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
});
