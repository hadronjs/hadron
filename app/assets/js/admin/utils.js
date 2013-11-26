angular.module('hadronAdmin.utils', [])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push(['$q', 'notifyUser', function($q, notifyUser) {
      return {
        responseError: function(rejection) {
          if(rejection.status === 401) {
            notifyUser({
              text: 'You are not authenticated, please login again', 
              type: 'error', 
              timeout: 0,
              onHidden: function() {
                window.location.href = '/auth/login?redirect=/admin';
              }
            });
          } else {
            notifyUser({text: 'There was an error during the operation', type: 'error'});
          }
          return $q.reject(rejection);
        }
      }
    }])
  }])

  .factory('notifyUser', function() {
    toastr.options.timeOut = 3000;
    return function(obj) {
      if(obj.timeout !== void 0) {
        obj.timeOut = obj.timeout;
        if(obj.timeout === 0) {
          obj.extendedTimeOut = 0;
        }
      }
      toastr[obj.type](obj.text, obj.title, obj);
    }
  })

  .directive('confirmedClick', [
    function(){
      return {
        link: function (scope, element, attr) {
          var msg = attr.confirmClickText || "Are you sure?";
          var clickAction = attr.confirmedClick;
          element.bind('click',function (event) {
            if ( window.confirm(msg) ) {
              scope.$eval(clickAction)
            }
          });
        }
      };
    }]
  )

  .directive('toggleSwitchLight',
    function () {
      return {
        restrict: 'E',
        replace: true,
        transclude: false,
        template:
          '<label class="switch-light well">' +
            '<input type="checkbox" ng-model="ngModel" />'+
            '<span> {{label}}' + 
              '<span>{{textOff}}</span><span>{{textOn}}</span>'+
            '</span>' + 
            '<a class="btn btn-primary"></a>'+
          '</label>',
        scope: {
          ngModel: '=',
          textOff:'@textOff',
          textOn:'@textOn',
          label:'@label'
        }
      };
    }
  );