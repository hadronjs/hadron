'use strict';


// Declare app level module which depends on filters, and services
angular.module('hadronAdmin', ['hadronAdmin.controllers','hadronAdmin.utils'])

  .run(['$rootScope', '$state', '$stateParams', function($rootScope, $state, $stateParams) {
    //utility for validating forms
    $rootScope.hasError = function(fieldPath) {
      var parts = fieldPath.split(".");
      var field = this[parts[0]][parts[1]];
      var type = parts[2];
      return ((!field.$pristine || this.submitted) && field.$invalid && (!type || field.$error[type]));
    };
    
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  }]);
