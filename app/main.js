'use strict';

angular.module('challenge2', [
  'ngRoute',
  'ngSanitize'
])
.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Pages
    .when('/', {templateUrl: 'app/partials/search.html'})
    // else 404
    .otherwise('404', {templateUrl: 'app/partials/404.html'});
}])
.controller('mainCtrl', ['$scope', '$location',
  function($scope, $location){
    $scope.getClass = function (path) {
      if ($location.path().substr(0, path.length) === path) {
        return 'active';
      } else {
        return '';
      }
    };
  }
]);