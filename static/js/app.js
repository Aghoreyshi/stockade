'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('vault', [
  'ngRoute',
  'vault.filters',
  'vault.services',
  'vault.directives',
  'vault.controllers',
  'ui.bootstrap'
]);
app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/projects', {templateUrl: '/static/partials/projects.html', controller: 'ProjectsCtrl'});
  $routeProvider.when('/projects/:id', {templateUrl: '/static/partials/detail.html', controller: 'DetailCtrl'});
  $routeProvider.when('/login', {templateUrl: '/static/partials/login.html', controller: 'LoginCtrl'});
  $routeProvider.otherwise({redirectTo: '/projects'});
}]);

/*
app.config(function(RestangularProvider) {

    // Now let's configure the response extractor for each request
    RestangularProvider.setResponseExtractor(function(response, operation, what, url) {
      // This is a get for a list
      var newResponse;
      if (operation === "getList") {
        // Here we're returning an Array which has one special property metadata with our extra information
        newResponse = response.data.objects;
        newResponse.metadata = response.data.meta;
      } else {
        // This is an element
        newResponse = response.data;
      }
      return newResponse;
    });
});

*/
