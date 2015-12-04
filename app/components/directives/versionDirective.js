'use strict';

var version = '0.1';

angular.module('challenge2').directive('appVersion', [ function() {
  return function(scope, elm, attrs) {
    elm.text(version);
  };
}]);
