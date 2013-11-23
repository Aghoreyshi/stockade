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
          $scope.projects = data || status;
        });

      $scope.orderProp = 'name';
}]);

vaultControllers.controller('DetailCtrl',
    function DetailCtrl($scope, $routeParams, $http) {
      $scope.type = $routeParams.type;
      $scope.id = $routeParams.id;
      $http.get('/api/v1/projects/?id=' + $scope.id).success(function(data) {
        $scope.project = data.objects[0];
      });

      $http({method: 'GET', url: '/api/v1/secrets/?project__id=' + $scope.id}).
        success(function(data, status, headers, config) {
          $scope.secrets = data.objects;
        }).
        error(function(data, status, headers, config) {
          $scope.secrets = data || status;
        });

      $scope.orderProp = 'category';
});
