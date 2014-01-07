'use strict';

module.exports = function(grunt) {
  require('hadron-grunt-helper').configure(grunt);

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
    }
  });
};
