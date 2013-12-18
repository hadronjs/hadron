var uuid = require('node-uuid');

var self = module.exports = {
  __module: {
    properties: {
      promises: 'utils/promises',
      log: 'install/log',
      config: "config"
    },
    provides: 'install/install'
  },

  install: function() {   
    if(!self.config.get('server.sessionSecret')) {
      self.log.info("Generating new session secret");
      return self.promises.ninvoke(self.config, 'persistOverride', 'server.sessionSecret', uuid.v4());
    }
  }
};