var path = require('path');

var self = module.exports = {
  __module: {
    provides: {"controllers/setup": {after: "*"}},
    properties: {
      log: 'controllers/log',
      postService: 'services/postService'
    }
  },
  
  
  views: function (req, res, next) {
    var viewPath = req.params[0];
    viewPath = path.join('clientTemplates', viewPath);
    //TODO
    res.render(viewPath);
  },

  index: function(req, res, next) {
    self.postService.findAllPublishedOrderByDate().then(function(posts) {
      res.render('index', {posts: posts});
    }).otherwise(next);
  },

  setup: function(express) {
    express.get(/^\/templates\/((?:[\/\w])+)/, self.views);
    express.get("/", self.index);
  }
};
