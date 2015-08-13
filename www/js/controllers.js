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
});