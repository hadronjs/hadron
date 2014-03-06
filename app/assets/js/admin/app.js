'use strict';


// Declare app level module which depends on filters, and services
angular.module('hadronAdmin', ['hadronAdmin.controllers','hadronAdmin.utils','ngProgress'])

  .run(['$rootScope', '$state', '$stateParams', 'ngProgress', 
    function($rootScope, $state, $stateParams, ngProgress) {
      //utility for validating forms
      $rootScope.hasError = function(fieldPath) {
        var parts = fieldPath.split(".");
        var field = this[parts[0]][parts[1]];
        var type = parts[2];
        return ((!field.$pristine || this.submitted) && field.$invalid && (!type || field.$error[type]));
      };
      
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;

      $rootScope.$on('$stateChangeStart', function() {
        ngProgress.start();
      });

      $rootScope.$on('$stateChangeSuccess', function() {
        ngProgress.complete();
      });
    }
  ]);
