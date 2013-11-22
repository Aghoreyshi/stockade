'use strict';

/* Controllers */

angular.module('vault.controllers', []).
  controller('VaultCtrl', ['$scope', '$http',
    function VaultCtrl($scope, $http) {
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
    },
  ]);
