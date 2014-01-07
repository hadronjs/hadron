
var self  = module.exports = {
  __module: {
    provides: {"controllers/setup": {}},
    properties: {
      authHelper: 'controllers/helpers/authHelper'
    }
  },

  index: function(req, res) {
    res.render('admin/index', {});
  }, 

  setup: function(express) {
    express.all("/admin*", self.authHelper.isAdmin);
    express.get("/admin", self.index);
  }
};
