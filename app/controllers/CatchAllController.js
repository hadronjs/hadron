

var self = module.exports = {
  __module: {
    provides: {"controllers/setup": {before: '*'}},
    properties: {
      log: 'controllers/log',
      friendlyUrlService: 'services/friendlyUrlService'
    }
  },

  route: function(req, res, next) {
    self.log.trace('Checking friendly url ' + req.url);
    self.friendlyUrlService.retrieve(req.params.friendlyUrl).then(function(url) {
      if(url) {
        self.log.trace('Friendly url matched '+ req.params.friendlyUrl + '=>' + url.url);
        req.url = url.url;
      }

      next();
    }).otherwise(next);
  },
  
  
  setup: function(express) {
    express.get("/favicon.ico", function(req, res, next) {
      //TODO
      res.send(404);
    });
    express.get("/:friendlyUrl", self.route);
  }
};
