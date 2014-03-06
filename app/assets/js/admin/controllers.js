'use strict';

/* Controllers */

angular.module('hadronAdmin.controllers', [
    'ui.router', 'hadronAdmin.utils', 'ui.bootstrap', 'ui.bootstrap.tooltip',
    'ui.bootstrap.collapse', 'ui.bootstrap.datepicker', 'ui.validate',
    'xeditable'
  ])
  
  .run(['$rootScope', '$state', '$stateParams', 'navbarCollapseSvc', 'editableOptions',
    function($rootScope, $state, $stateParams, navbarCollapseSvc, editableOptions) {
      $rootScope.$on('$stateChangeSuccess', function() {
        navbarCollapseSvc.set(true);
      });
      
      editableOptions.theme = 'bs3';
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
  
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    // For any unmatched url, redirect to /
    $urlRouterProvider
      .when('/', '/posts/list')
      .otherwise("/");

    var retrieveSettings = ['$http', function($http){
      return $http.get('api/settings').then(function(data) {
        return data.data;
      });
    }];
    
    $stateProvider
//      .state('home', {
//        url: "/",
//        templateUrl: "templates/admin/home"
//      })
      .state('listPosts', {
        url: "/posts/list",
        templateUrl: "templates/admin/listPosts",
        title: "Posts",
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
      .state('listPages', {
        url: "/pages/list",
        templateUrl: "templates/admin/listPages",
        title: "Pages",
        controller: 'listPagesCtrl'
      })
      .state('createPage', {
        url: "/pages/create",
        templateUrl: "templates/admin/savePage",
        controller: 'savePageCtrl',
        title: "Create page",
        resolve: {
          page: function() {
            return null;
          }
        }
      })
      .state('editPage', {
        url: "/pages/edit/:id",
        templateUrl: "templates/admin/savePage",
        controller: 'savePageCtrl',
        title: "Edit page",
        resolve: {
          page: ['$http', '$stateParams', function($http, $stateParams){
            return $http.get('api/pages/'+$stateParams.id).then(function(data) {
              return data.data;
            });
          }]
        }
      })
      .state('websiteSettings', {
        url: "/settings/website",
        templateUrl: "templates/admin/websiteSettings",
        controller: 'websiteSettingsCtrl',
        title: "Website settings",
        resolve: {
          settings: retrieveSettings
        }
      })
      .state('adminSettings', {
        url: "/settings/admin",
        templateUrl: "templates/admin/adminSettings",
        controller: 'adminSettingsCtrl',
        title: "Admin settings",
        resolve: {
          settings: retrieveSettings
        }
      })
      .state('socialSettings', {
        url: "/settings/social",
        templateUrl: "templates/admin/socialSettings",
        controller: 'socialSettingsCtrl',
        title: "Social networks settings",
        resolve: {
          settings: retrieveSettings
        }
      })
      .state('menuSettings', {
        url: "/settings/menu",
        templateUrl: "templates/admin/menuSettings",
        controller: 'menuSettingsCtrl',
        title: "Menu settings",
        resolve: {
          settings: retrieveSettings
        }
      })
  }])

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
  
  .controller('listPagesCtrl', ['$scope', '$http', 'notifyUser', function($scope, $http, notifyUser) {
    $http.get('api/pages').success(function(data) {
      $scope.pages = data.values;
    });

    $scope['delete'] = function(idx) {
      var page = $scope.pages[idx];

      $http['delete']('api/pages/'+$scope.pages[idx].id, page).success(function() {
        $scope.pages.splice(idx, 1);
        notifyUser({text: "Page deleted", type:'success'});
      });
    };
  }])
  
  .controller('savePageCtrl', [
    '$scope', '$http', '$location', '$stateParams', '$state', 'notifyUser', '$window', '$q', 'page',
    '$timeout',
    function($scope, $http, $location, $stateParams, $state, notifyUser, $window, $q, page, $timeout) {
      $scope.page = page || {};
      $scope.page.createdDate = $scope.page.createdDate || new Date();

      $scope.openDatePicker = function() {
        $timeout(function() {
          $scope.datePickerOpened = true;
        });
      };
      
      
      $scope.$watch('page.title', function(newVal, oldVal) {
        oldVal = oldVal || "";
        newVal = newVal || "";
        if(!$scope.page)
          return;

        //Change only if user didn't modify it already
        if(!$scope.page.friendlyUrl || slugg(oldVal) === $scope.page.friendlyUrl) {
          $scope.page.friendlyUrl = slugg(newVal);
        }
      });

      $scope.saveAndPreview = function(page, invalid) {
        this.save(page, invalid).success(function(data) {
          $window.open('/pages/'+data.id, "_blank");
        });
      };

      $scope.save = function(page, invalid) {
        $scope.submitted = true;
        if(invalid) {
          notifyUser({text: "Please review the data in the form", type:'error'});
          return $q.reject();
        }

        if(page.id) {
          return $http.put('api/pages', page).success(function(data) {
            notifyUser({text: "Page successfully saved", type:'success'});
            return data;
          });
        } else {
          return $http.post('api/pages', page).success(function(data) {
            notifyUser({text: "Page successfully created", type:'success'});
            $location.path('/pages/edit/'+data.id);
            return data;
          });
        }
      };
    }
  ])
  
  .controller('websiteSettingsCtrl', ['$scope', '$http', 'notifyUser', 'settings', '$q',
    function($scope, $http, notifyUser, settings, $q) {
      $scope.settings = settings || {};

      $scope.save = function(settings, invalid) {
        if(invalid) {
          notifyUser({text: "Please review the data in the form", type:'error'});
          return $q.reject();
        }

        var data = {
          website: settings.website
        };
        return $http.put('api/settings', data).success(function(data) {
          notifyUser({text: "Settings successfully saved", type:'success'});
          return data;
        });
      };
    }
  ])


  .controller('adminSettingsCtrl', ['$scope', '$http', 'notifyUser', 'settings', '$q',
    function($scope, $http, notifyUser, settings, $q) {
      $scope.settings = settings || {};

      $scope.save = function(settings, invalid) {
        if(invalid) {
          notifyUser({text: "Please review the data in the form", type:'error'});
          return $q.reject();
        }

        var data = {
          adminUser: settings.adminUser
        };
        return $http.put('api/settings', data).success(function(data) {
          notifyUser({text: "Settings successfully saved", type:'success'});
          return data;
        });
      };
    }
  ])

  .controller('socialSettingsCtrl', ['$scope', '$http', 'notifyUser', 'settings', '$q',
    function($scope, $http, notifyUser, settings, $q) {
      $scope.settings = settings || {};

      $scope.save = function(settings, invalid) {
        if(invalid) {
          notifyUser({text: "Please review the data in the form", type:'error'});
          return $q.reject();
        }

        var data = {
          social: settings.social
        };
        return $http.put('api/settings', data).success(function(data) {
          notifyUser({text: "Settings successfully saved", type:'success'});
          return data;
        });
      };
    }
  ])
  
  .controller('menuSettingsCtrl', ['$scope', '$http', 'notifyUser', 'settings', '$q',
    function($scope, $http, notifyUser, settings, $q) {
      $scope.settings = settings || {};

      $scope.newItem = function() {
        $scope.settings.menu = $scope.settings.menu || [];
        $scope.inserted = {
          label: "New item",
          link: "/",
          iconClass: "fa fa-home"
        };
        $scope.settings.menu.push($scope.inserted);
      }
      
      
      $scope.remove = function(index) {
        $scope.settings.menu.splice(index, 1);
      };
      
      $scope.moveUp = function(index) {
        if(index === 0 || $scope.settings.menu.length < 2) {
          return;
        }
        var tmp = $scope.settings.menu[index];
        $scope.settings.menu[index] = $scope.settings.menu[index - 1]
        $scope.settings.menu[index - 1] = tmp;
      };
      
      $scope.moveDown = function(index) {
        if(index === ($scope.settings.menu.length-1) || $scope.settings.menu.length < 2) {
          return;
        }
        var tmp = $scope.settings.menu[index];
        $scope.settings.menu[index] = $scope.settings.menu[index + 1]
        $scope.settings.menu[index + 1] = tmp;
      };
      
      
      $scope.save = function(settings) {
        var data = {
          menu: settings.menu
        };
        return $http.put('api/settings', data).success(function(data) {
          notifyUser({text: "Settings successfully saved", type:'success'});
          return data;
        });
      };
    }
  ]);

    
