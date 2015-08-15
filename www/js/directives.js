angular.module('pinkTeam.directives', [])

.directive('autoFocus', function() {
  return {
    restrict: 'A',
    require: '^^ionNavView',
    link: function(scope, element, attrs, ctrl) {
    	scope.wasFocused = false;
      ctrl.scope.$on('$ionicView.afterEnter', function() {
      	if (scope.wasFocused) {
      		return;
      	}

        element[0].focus();
        scope.wasFocused = true;
      });
    }
  };
});
