var expect = require('chai').expect,
  rimraf = require('rimraf'),
  Particles = require('particles');

describe('services', function() {
  var scatter = null;
  var particles;
  beforeEach(function() {
    particles = new Particles({config: {
      dataDir: "${appRoot}/tmp2",
      configDir: "${appRoot}/test/config",
      "containers": {
        "default": {
          particles: ["${appRoot}/app"]
        }
      }
    }});
    
    rimraf.sync(particles.config.get('dataDir'));
    scatter = particles.scatter;
  });
  
  afterEach(function(done) {
    scatter.load("data/levelup").then(function(levelup) {
      levelup.db.close(done);
    })
  });
  
  describe('postService', function(){
    var postService = null;
    
    beforeEach(function(done) {
      scatter.load('services/postService').then(function(mod) {
        postService = mod;
        done();
      }).otherwise(done);
    });

    it("should save/load a new post", function(done) {
      postService.save({
        title: "New post"
      })
        .then(function(post) {
          expect(post).to.have.deep.property('title', "New post");
          expect(post).to.have.deep.property('id');

          return postService.retrieve(post.id);
        })
        .then(function(post) {
          expect(post).to.have.deep.property('title', "New post");
          expect(post).to.have.deep.property('id');
          done();
        })
        .otherwise(done);
    });


    it("should list posts sorted by Date desc", function(done) {
      postService.save({
        title: "New post1"
      }).then(function() {
          return postService.save({
            title: "New post2"
          })
        })
        .then(function() {
          return postService.findAllOrderByDate();
        })
        .then(function(posts) {
          expect(posts).to.have.deep.property('0.title', "New post2");
          expect(posts).to.have.deep.property('1.title', "New post1");
          done();
        })
        .otherwise(done);
    });
  });


  describe('settingsService', function(){
    var settingsService = null;

    beforeEach(function(done) {
      scatter.load('services/settingsService').then(function(mod) {
        settingsService = mod;
        done();
      }).otherwise(done);
    });

    it("should save/load settings", function(done) {
      settingsService.saveSettings({
        adminUser: {
          username: "admin",
          password: "admin"
        },
        website: {
          title: "Hadron",
          headline: "A Node.js blogging platform for Node.js developers"
        }
      }).then(function(settings) {
          expect(settings).to.have.deep.property('adminUser.username', "admin");

          return settingsService.retrieveSettings();
        })
        .then(function(settings) {
          expect(settings).to.have.deep.property('adminUser.username', "admin");
          done();
        })
        .otherwise(done);
    });
  });
});