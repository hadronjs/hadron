

var self = module.exports = {
  __module: {
    provides: {
      "express/middleware/register": {
        before: ['express/middleware/router']
      }
    }
  },

  register: function(expressApp) {
    //pass the user object into the view
    expressApp.use('/', function(req, res, next) {
      expressApp.locals.req = req;
      expressApp.locals.fullUrl = req.protocol + "://" + req.get('host') + req.url;
      next();
    });
  }
};
