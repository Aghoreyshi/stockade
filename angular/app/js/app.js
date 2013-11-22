'use strict';


// Declare app level module which depends on filters, and services
angular.module('vault', [
  'ngRoute',
  'vault.filters',
  'vault.services',
  'vault.directives',
  'vault.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/projects', {templateUrl: 'partials/projects.html', controller: 'VaultCtrl'});
  $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
  $routeProvider.otherwise({redirectTo: '/projects'});
}]);
