var gulp = require('gulp'),
  ParticlesAssetManager = require('particles-assetmanager');


var particlesAssetManager = new ParticlesAssetManager();
particlesAssetManager.addDefaultTasks(gulp);

gulp.task('install', function() {
  particlesAssetManager.run("svc!install/install");
});

gulp.task('default', ["build"]);
