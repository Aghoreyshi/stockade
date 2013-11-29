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
          headers: {"Content-Type": "application/json"}}).
          success(function(){
            $scope.toggleForm();
            $scope.projectName = "";
            $scope.projectDesc = "";
            $scope.alerts.push({msg: "Project creation was successful.", type: "success"});
            $scope.getProjects();
          }).
          error(function(data, status, headers, config) {
            $scope.alerts.push({msg: "Project creation failed. :/", type: "danger"});
            /* For debugging
            $scope.alerts.push({msg: "config: " + JSON.stringify(config) +
            " response: " + JSON.stringify(data), type: "danger"});
            */
          });
      };

      $scope.deleteProject = function (project) {
        if (confirm("Are you sure you want to delete the project named " + project.name + "?")){
          $http({method: 'DELETE', url: '/api/v1/projects/' + project.id.toString()}).
            success(function(){
              $scope.alerts.push({msg: "The project has been deleted.", type: "success"});
              $scope.projects.splice($scope.projects.indexOf(project), 1);
            }).
            error(function(data, status, headers, config){
              $scope.alerts.push({msg: "Failed to delete the project.", type: "danger"});
              /* For debugging
               $scope.alerts.push({msg: "config: " + JSON.stringify(config) +
               " response: " + JSON.stringify(data), type: "danger"});
              */
            });
        }
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

