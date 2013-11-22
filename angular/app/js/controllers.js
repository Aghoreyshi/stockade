'use strict';

/* Controllers */

angular.module('vault.controllers', []).
  controller('VaultCtrl', ['$scope', '$http',
    function VaultCtrl($scope, $http) {
      $http.get('api/v1/projects/').success(function(data) {
        $scope.projects = data;
      });

      $scope.orderBy = 'name';
    },
  ]);
