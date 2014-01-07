var expect = require('chai').expect,
  rimraf = require('rimraf'),
  spawned = require('spawned'),
  request = require('supertest'),
  
  Particles = require('particles');

describe('controllers', function() {
  var scatter, app, server, db;
  before(function(done) {
    var particles;
    //we clear tmp dir first
    rimraf.sync('tmp');

    spawned('node_modules/grunt-cli/bin/grunt', ['--stack', 'build', '--configDir=test/config'])
      .then(function() {
        return spawned('node_modules/grunt-cli/bin/grunt', ['--stack', 'install'])
      })
      .otherwise(function(execErr) {
        console.error(execErr.combined);
        console.error(execErr.stack);
      })
      .then(function() {
        particles = new Particles({config: {
          configDir: "${appRoot}/test/config"
        }});
        return particles.run();
      })
      .then(function() {
        return particles.scatter.load(["express/app", "data/levelup"]);
      })
      .spread(function(expr, levelup) {
        app = expr.express;
        server = expr.server;
        db = levelup.db;
        done();
      })
      .otherwise(done);
  });
  
  after(function(done) {
    //close the server socket
    server.close(function() {
      db.close(done);
    });
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