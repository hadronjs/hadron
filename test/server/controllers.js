var expect = require('chai').expect,
  rimraf = require('rimraf'),
  spawned = require('spawned'),
  request = require('supertest'),
  
  particles = require('particles');

describe('controllers', function() {
  var scatter = null, app = null, server = null;
  before(function(done) {
    //we clear tmp dir first
    rimraf.sync('tmp');

    spawned('node_modules/grunt-cli/bin/grunt', ['--stack', 'build'])
      .then(function() {
        return spawned('node_modules/grunt-cli/bin/grunt', ['--stack', 'install'])
      })
      .otherwise(function(execErr) {
        console.error(execErr.combined);
        console.error(execErr.stack);
      })
      .then(function() {
        return particles.run({config: {
          configDir: "${appRoot}/test/config"
        }});
      })
      .then(function(res) {
        scatter = res;
        return scatter.load("express/app");
      })
      .then(function(mod) {
        app = mod.express;
        server = mod.server;
        done();
      })
      .otherwise(done);
  });
  
  after(function() {
    //close the server socket
    server.close();
  });
  
  describe('postController', function() {
    it("should save/load a new post", function(done) {
      request(app)
        .get('/')
        .expect(200)
        .expect('Content-Type', /html/)
        .expect(/Hadron/)
        .end(function(err, res){
          done(err);
        });
    });
  });
});