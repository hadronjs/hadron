

var self = module.exports = {
  __module: {
    properties: {
      _settingsService: 'services/settingsService'
    },
    provides: {
      "express/middleware/register": {
        before: ['express/middleware/router']
      }
    }
  },

  register: function(expressApp) {
    //pass the user object into the view
    expressApp.use('/', function(req, res, next) {
     self._settingsService.retrieveSettings().then(function(settings) {
        expressApp.locals.settings = settings;
        next();
      }).otherwise(next);
    });
  }
};
