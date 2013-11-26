

var self = module.exports = {
  __module: {
    properties: {
      _settingsService: 'services/settingsService'
    },
    provides: {
      registerMiddleware: {
        before: ['express/middleware/router']
      }
    }
  },

  registerMiddleware: function(expressApp) {
    //pass the user object into the view
    expressApp.use('/', function(req, res, next) {
     self._settingsService.retrieveSettings().then(function(settings) {
        expressApp.locals.settings = settings;
        next();
      }).otherwise(next);
    });
  }
};
