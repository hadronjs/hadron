'use strict';

module.exports = function(grunt) {
  require('hadron-grunt-helper').configure(grunt);

  // Project configuration.
  grunt.initConfig({
    particles: {
      build: {
        options: {
          config: {
            configDir: "${appRoot}/test/config"
          },
          runServices: ['svc|sequence!grunt/configure_grunt']
        }
      },
      install: {
        options: {
          config: {
            configDir: "${appRoot}/test/config"
          },
          runServices: ['svc|sequence!install/install']
        }
      }
    }
  });
};
