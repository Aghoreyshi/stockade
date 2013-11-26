'use strict';

/* Controllers */

var vaultControllers = angular.module('vault.controllers', []);

vaultControllers.controller('ProjectsCtrl', ['$scope', '$http',
    function ProjectsCtrl($scope, $http) {
      $scope.getProjects = function() {
        $http({method: 'GET', url: '/api/v1/projects/'}).
          success(function(data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.projects = data.objects;
          }).
          error(function(data, status) {
            $scope.projects = data || status;
          });
      }

      $scope.getProjects();
      $scope.show_form = false;

      $scope.alerts = [];
      $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
      };

      $scope.toggleForm = function () {
        $scope.show_form = !$scope.show_form;
      };

      $scope.createNewProject = function () {
        $http({method: 'POST', url: '/api/v1/projects/',
          data: "{\"name\":\"" + $scope.projectName + "\",\"description\":\"" + $scope.projectDesc +"\"}",
          headers: {"Content-Type": "application/json"}}).success(function(data){
            $scope.created = true;
            $scope.toggleForm();
            $scope.projectName = "";
            $scope.projectDesc = "";
            $scope.alerts.push({msg: "Project creation was successful!", type: "success"});
            $scope.getProjects();
          }).
          error(function(data, status, headers, config) {
            $scope.created = "Failed to create! response: " + JSON.stringify(config) + "status: " + status;
            $scope.alerts.push({msg: "Project creation failed for some reason. :/", type: "danger"});
          });
      };

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
        success(function(data) {
          $scope.secrets = data.objects;
        }).
        error(function(data, status) {
          $scope.secrets = data || status;
        });

      $scope.orderProp = '-create_date';
});

