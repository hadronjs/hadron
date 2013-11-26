


var self = module.exports = {
  __module: {
    properties: {
      promises: 'utils/promises',
      _settingsService: 'services/settingsService'
    }
  },
  
  authenticate: function(username, password) {
    return self._settingsService.retrieveSettings().then(function(settings) {
      if(username !== settings.adminUser.username || !settings.verifyPassword(password)) {
        return self.promises.reject({
          message: "Invalid username or password"
        });
      }
      
      return settings.adminUser;
    });
  },
  
  getUserById: function(id) {
    if(id == 1) {
      return self._settingsService.retrieveSettings().then(function(settings) {
        return settings.adminUser;
      });
    }
    
    return self.promises.reject(new Error("Only admin is available as valid user"));
  }
};