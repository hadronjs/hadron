

var self = module.exports = {
  __module: {
    provides: "controllers/setup",
    properties: {
      log: 'controllers/log',
      postService: 'services/postService',
      authHelper: 'controllers/helpers/authHelper'
    }
  },

  apiRetrieve: function(req, res, next) {
    self.postService.retrieve(req.params.id).then(function(post) {
      res.send(post.toJson());
    }).otherwise(next);
  },

  apiSave: function(req, res, next) {
    var post = req.body;
    self.postService.save(post).then(function(post) {
      res.send(post.toJson());
    }).otherwise(next);
  },

  apiCreate: function(req, res, next) {
    var post = req.body;
    self.postService.save(post).then(function(post) {
      res.send(post.toJson());
    }).otherwise(next);
  },

  apiDelete: function(req, res, next) {
    self.postService.delete(req.params.id).then(function() {
      res.send(204);
    }).otherwise(next);
  },
  
  apiList: function(req, res, next) {
    self.postService.findAllOrderByDate().then(function(posts) {
      res.send({values: posts.toJson()});
    }).otherwise(next);
  },
  
  view: function(req, res, next) {
    self.postService.retrieve(req.params.id).then(function(post) {
      if(!post.isPublished && !req.user) {
        return next();
      }

      res.render('posts/view', {post: post});
    }).otherwise(next);
  },
  
  
  setup: function(express) {
    express.get("/posts/:id", self.view);
    
    express.delete("/api/posts/:id", self.authHelper.isAdmin, self.apiDelete);
    express.get("/api/posts", self.authHelper.isAdmin, self.apiList);
    express.post("/api/posts", self.authHelper.isAdmin, self.apiCreate);
    express.get("/api/posts/:id", self.authHelper.isAdmin, self.apiRetrieve);
    express.put("/api/posts", self.authHelper.isAdmin, self.apiSave);
  }
};
