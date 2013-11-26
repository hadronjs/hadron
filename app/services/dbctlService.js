

var self = module.exports = {
  __module: {
    properties: {
      settingsService: 'services/settingsService'
    }
  },
  
  dbInstalled: function() {
    return self.settingsService.retrieveSettings().then(function(settings) {
      return settings && settings.adminUser;
    });
  }
};