'use strict';

module.exports = function(grunt) {
  require('hadron-grunt-helper').configure(grunt);
  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);


  // Project configuration.
  grunt.initConfig({
    particles: {
      install: {
        options: {
          config: {
            configDir: "${appRoot}/test/config"
          },
          runService: 'svc|sequence!install/install'
        }
      }
    },
    // Test settings
    karma: {
      unit: {
        configFile: 'test/client/config/karma.conf.js',
        singleRun: false
      }
    }
  });

  grunt.registerTask('test', [
    'karma'
  ]);
};
