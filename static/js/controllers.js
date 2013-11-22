'use strict';

/* Controllers */

var vaultControllers = angular.module('vault.controllers', []);

vaultControllers.controller('ProjectsCtrl', ['$scope', '$http',
    function ProjectsCtrl($scope, $http) {
      $http({method: 'GET', url: '/api/v1/projects/'}).
        success(function(data, status, headers, config) {
          // this callback will be called asynchronously
          // when the response is available
          $scope.projects = data.objects;
        }).
        error(function(data, status, headers, config) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          $scope.projects = data || status;
        });

      $scope.orderBy = 'name';
}]);

vaultControllers.controller('DetailCtrl', function($scope, $routeParams) {
    $scope.type = $routeParams.type;
    $scope.id = $routeParams.id;
    console.log("id" + $scope.id);
});
