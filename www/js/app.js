// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('pinkTeam', [
  'ionic',
  'pinkTeam.controllers',
  'pinkTeam.services',
  'pinkTeam.filters',
  'ngMap',
  'ngCordova'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // Each tab has its own nav history stack:

  .state('home', {
    url: '/home',
    templateUrl: 'templates/home.html',
    controller: 'HomeController'
  })

  .state('match', {
    url: '/match?isLoading',
    templateUrl: 'templates/match.html',
    controller: 'MatchController'
  })

  .state('user', {
    url: '/user/:id',
    templateUrl: 'templates/user.html',
    controller: 'UserController'
  })

  .state('location-prompt', {
    url: '/location-prompt',
    templateUrl: 'templates/location-prompt.html',
    controller: 'LocationPromptController'
  })

  .state('feeling', {
    url: '/feeling',
    templateUrl: 'templates/feeling.html',
    controller: 'FeelingController'
  })

  .state('feeling-reply', {
    url: '/feeling-reply',
    templateUrl: 'templates/feeling-reply.html',
    controller: 'FeelingReplyController'
  })

  .state('patients-waiting', {
    url: '/patients-waiting',
    templateUrl: 'templates/patients-waiting.html',
    controller: 'PatientsWaitingController'
  })

  .state('nickname', {
    url: '/',
    templateUrl: 'templates/nickname.html',
    controller: 'NicknameController'
  })
  .state('role', {
    url: '/role',
    templateUrl: 'templates/role.html',
    controller: 'RoleController'
  })
  .state('angel', {
    url: '/angel',
    templateUrl: 'templates/genre.html',
    controller: 'AngelController'
  })
  .state('fighter', {
    url: '/fighter',
    templateUrl: 'templates/genre.html',
    controller: 'FighterController'
  })
  ;

  $urlRouterProvider.otherwise('/');
});
