'use strict';

/* Controllers */

angular.module('hadronAdmin.controllers', [
    'ui.router', 'hadronAdmin.utils', 'ui.bootstrap', 'ui.bootstrap.tooltip',
    'ui.bootstrap.collapse', 'ui.bootstrap.datepicker', 'ui.validate'
  ])
  
  .run(['$rootScope', '$state', '$stateParams', 'navbarCollapseSvc', 
    function($rootScope, $state, $stateParams, navbarCollapseSvc) {
      $rootScope.$on('$stateChangeSuccess', function() {
        navbarCollapseSvc.set(true);
      });
    }
  ])

  .factory('navbarCollapseSvc', function() {
    var self = {
      isCollapsed: true,
      set: function(collapsed) {
        self.isCollapsed = collapsed;
      },
      toggle: function() {
        self.isCollapsed = !self.isCollapsed;
      },
      get: function() {
        return self.isCollapsed;
      }
    };
    return self;
  })
  
  .config(function($stateProvider, $urlRouterProvider) {
    // For any unmatched url, redirect to /
    $urlRouterProvider
      .when('/', '/posts/list')
      .otherwise("/");

    $stateProvider
//      .state('home', {
//        url: "/",
//        templateUrl: "templates/admin/home"
//      })
      .state('listPosts', {
        url: "/posts/list",
        templateUrl: "templates/admin/listPosts",
        title: "List posts",
        controller: 'listPostsCtrl'
      })
      .state('createPost', {
        url: "/posts/create",
        templateUrl: "templates/admin/savePost",
        controller: 'savePostCtrl',
        title: "Create post",
        resolve: {
          post: function() {
            return null;
          }
        }
      })
      .state('editPost', {
        url: "/posts/edit/:id",
        templateUrl: "templates/admin/savePost",
        controller: 'savePostCtrl',
        title: "Edit post",
        resolve: {
         post: ['$http', '$stateParams', function($http, $stateParams){
            return $http.get('api/posts/'+$stateParams.id).then(function(data) {
              return data.data;
            });
         }]
        }
      })
      .state('editSettings', {
        url: "/settings/edit",
        templateUrl: "templates/admin/saveSettings",
        controller: 'saveSettingsCtrl',
        title: "Edit settings",
        resolve: {
          settings: ['$http', function($http){
            return $http.get('api/settings').then(function(data) {
              return data.data;
            });
         }]
        }
      });
  })

  .controller('NavbarCtrl', ['$scope', 'navbarCollapseSvc', function($scope, navbarCollapseSvc) {
    $scope.isCollapsed = function() {
      return navbarCollapseSvc.isCollapsed;
    };
    $scope.toggleCollapsed = function() {
      return navbarCollapseSvc.toggle();
    };
  }])
  
  .controller('HomeCtrl', [function() {

  }])

  .controller('listPostsCtrl', ['$scope', '$http', 'notifyUser', function($scope, $http, notifyUser) {
    $http.get('api/posts').success(function(data) {
      $scope.posts = data.values;
    });

    $scope['delete'] = function(idx) {
      var post = $scope.posts[idx];

      $http['delete']('api/posts/'+$scope.posts[idx].id, post).success(function() {
        $scope.posts.splice(idx, 1);
        notifyUser({text: "Post deleted", type:'success'});
      });
    };
  }])

  .controller('savePostCtrl', [
    '$scope', '$http', '$location', '$stateParams', '$state', 'notifyUser', '$window', '$q', 'post',
    '$timeout',
    function($scope, $http, $location, $stateParams, $state, notifyUser, $window, $q, post, $timeout) {
      $scope.post = post || {};
      $scope.post.createdDate = $scope.post.createdDate || new Date();

      $scope.openDatePicker = function() {
        $timeout(function() {
          $scope.datePickerOpened = true;
        });
      };
      
      
      $scope.$watch('post.title', function(newVal, oldVal) {
        oldVal = oldVal || "";
        newVal = newVal || "";
        if(!$scope.post)
          return;

        //Change only if user didn't modify it already
        if(!$scope.post.friendlyUrl || slugg(oldVal) === $scope.post.friendlyUrl) {
          $scope.post.friendlyUrl = slugg(newVal);
        }
      });

      $scope.saveAndPreview = function(post, invalid) {
        this.save(post, invalid).success(function(data) {
          $window.open('/posts/'+data.id, "_blank");
        });
      };

      $scope.save = function(post, invalid) {
        $scope.submitted = true;
        if(invalid) {
          notifyUser({text: "Please review the data in the form", type:'error'});
          return $q.reject();
        }

        if(post.id) {
          return $http.put('api/posts', post).success(function(data) {
            notifyUser({text: "Post successfully saved", type:'success'});
            return data;
          });
        } else {
          return $http.post('api/posts', post).success(function(data) {
            notifyUser({text: "Post successfully created", type:'success'});
            $location.path('/posts/edit/'+data.id);
            return data;
          });
        }
      };
    }
  ])

  .controller('saveSettingsCtrl', ['$scope', '$http', 'notifyUser', 'settings', '$q', 
    function($scope, $http, notifyUser, settings, $q) {
      shatter.contribute('saveSettingsCtrl', 'controllerImpl', arguments);
      
      $scope.settings = settings || {};

      $scope.saveWebsite = function(settings, invalid) {
        return $scope.save('website', settings, invalid);
      };

      $scope.saveSocial = function(settings, invalid) {
        return $scope.save('social', settings, invalid);
      };

      $scope.saveAdminUser = function(settings, invalid) {
        return $scope.save('adminUser', settings, invalid);
      };
      
      $scope.save = function(what, settings, invalid) {
        if(invalid) {
          notifyUser({text: "Please review the data in the form", type:'error'});
          return $q.reject();
        }
  
        var data = {};
        data[what] = settings[what];
        return $http.put('api/settings', data).success(function(data) {
          notifyUser({text: "Settings successfully saved", type:'success'});
          return data;
        });
      };
    }
  ]);
  
  