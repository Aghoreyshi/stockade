'use strict';

/* Services */


// Demonstrate how to register services

// In this case it is a simple value service.
var vault_services = angular.module('vault.services', []);

vault_services.value('version', '0.1');

vault_services.factory('Data', function() {
    return {message: "I'm a service message that can be shared between controllers."}
})
