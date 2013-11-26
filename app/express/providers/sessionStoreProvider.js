


var self = module.exports = {
  __module: {
    properties: {
      express: 'npm!express',
      levelup: 'data/levelup'
    }
  },
  
  getNewSessionsStore: function() {
    var LeveldbStore = require('connect-leveldb')(self.express);
    
    return new LeveldbStore({db: self.levelup.db, prefix: "sessions\xff"});
  }
};