'use strict';

describe('Controller: NavBarCtrl', function () {

  // load the controller's module
 
  beforeEach(module('hadronAdmin'));
  

  var NavbarCtrl,
    scope,
    navbarCollapseSvc;
	describe('PhoneListCtrl', function(){
	  beforeEach(angular.mock.inject(function ( $rootScope, $controller) {
	    scope = $rootScope.$new();
	  	navbarCollapseSvc: {};
	    NavbarCtrl = $controller('HomeCtrl', {
	      $scope: scope,
	      navbarCollapseSvc: navbarCollapseSvc
	    });
	  }));
	  it('should have a isCollapsed function', function () {
	    expect(NavbarCtrl).toBeDefined();
	  });
	 });
 
});

