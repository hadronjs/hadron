

var self = module.exports = {
  __module: {
    provides: "controllers/setup",
    properties: {
      log: 'controllers/log',
      pageService: 'services/pageService',
      authHelper: 'controllers/helpers/authHelper'
    }
  },

  apiRetrieve: function(req, res, next) {
    self.pageService.retrieve(req.params.id).then(function(page) {
      res.send(page.toJson());
    }).otherwise(next);
  },

  apiSave: function(req, res, next) {
    var page = req.body;
    self.pageService.save(page).then(function(page) {
      res.send(page.toJson());
    }).otherwise(next);
  },

  apiCreate: function(req, res, next) {
    var page = req.body;
    self.pageService.save(page).then(function(page) {
      res.send(page.toJson());
    }).otherwise(next);
  },

  apiDelete: function(req, res, next) {
    self.pageService.delete(req.params.id).then(function() {
      res.send(204);
    }).otherwise(next);
  },
  
  apiList: function(req, res, next) {
    self.pageService.findAll().then(function(pages) {
      res.send({values: pages.toJson()});
    }).otherwise(next);
  },
  
  view: function(req, res, next) {
    self.pageService.retrieve(req.params.id).then(function(page) {
      if(!page.isPublished && !req.user) {
        return next();
      }

      res.render('pages/view', {page: page});
    }).otherwise(next);
  },
  
  
  setup: function(express) {
    express.get("/pages/:id", self.view);
    
    express.delete("/api/pages/:id", self.authHelper.isAdmin, self.apiDelete);
    express.get("/api/pages", self.authHelper.isAdmin, self.apiList);
    express.post("/api/pages", self.authHelper.isAdmin, self.apiCreate);
    express.get("/api/pages/:id", self.authHelper.isAdmin, self.apiRetrieve);
    express.put("/api/pages", self.authHelper.isAdmin, self.apiSave);
  }
};
