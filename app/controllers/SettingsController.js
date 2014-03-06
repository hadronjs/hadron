

var self = module.exports = {
  __module: {
    provides: 'controllers/setup',
    properties: {
      log: 'controllers/log',
      _settingsService: 'services/settingsService',
      authHelper: 'controllers/helpers/authHelper'
    }
  },

  apiRetrieve: function(req, res, next) {
    self._settingsService.retrieveSettings().then(function(settings) {
      res.send(settings.toJson());
    }).otherwise(next);
  },
 
  apiSave: function(req, res, next) {
    var settings = req.body;
    self._settingsService.saveSettings(settings).then(function(settings) {
      res.send(settings.toJson());
    }).otherwise(next);
  },
  
  setup: function(express) {
    express.all("/api/settings*", self.authHelper.isAdmin);

    express.get("/api/settings", self.apiRetrieve);
    express.put("/api/settings", self.apiSave);
  }
};
