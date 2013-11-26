
var path = require('path'),
  levelup = require('levelup'),
  mkdirp = require('mkdirp'),
  fs = require('fs'),
  sublevel = require('level-sublevel');


var self = module.exports = {
  __module: {
    initialize: [[], 'initialize'],
    properties: {
      config: 'config',
      promises: 'utils/promises'
    }
  },
  db: null,

  sublevel: function(name) {
    return self.db.sublevel(name);
  },

  initialize: function(config, promises) {
    if(!self.config.get('dataDir')) {
      throw new Error("dataDir not set");  
    }
    
    //make sure it exists
    return self.promises.nfcall(mkdirp, self.config.get('dataDir'))
      .then(function() {
        self.name = path.join(self.config.get('dataDir'), 'hadron');
        
        return self.promises.nfcall(levelup, self.name, {
          valueEncoding: 'json'
        })
      })
      .then(function(db) {
        self.db = sublevel(db);
      });
  }
};