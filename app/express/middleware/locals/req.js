

var self = module.exports = {
  __module: {
    provides: {
      registerMiddleware: {
        before: ['express/middleware/router']
      }
    }
  },

  registerMiddleware: function(expressApp) {
    //pass the user object into the view
    expressApp.use('/', function(req, res, next) {
      expressApp.locals.req = req;
      next();
    });
  }
};
