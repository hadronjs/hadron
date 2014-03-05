module.exports = function(config){
    config.set({
    basePath : '../../../',

    files : [
       'app/assets/lib/toastr/*.js',
       'app/assets/lib/slugg*.js',
      'node_modules/particles-angular/assets/lib/angular/angular.js',
      'test/client/test/lib/angular/angular-mocks.js',
      'app/assets/lib/angular-ui/*.js',
      'app/assets/js/admin/app.js',
      'app/assets/js/admin/controllers.js',
      'app/assets/js/admin/utils.js',
     
      //'test/client/test/unit/**/*.js'
      'test/client/test/unit/navBarControllerSpec.js'
    ],

    exclude : [
      
    ],


    autoWatch : true,

    frameworks: ['jasmine'],
    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers : ['Firefox'], 
    singleRun: false,
    plugins : [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'       
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

})}
