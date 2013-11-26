

var self = module.exports = {
  isAdmin: function(req, res, next) {
    if(!req.user) {
        var err = new Error("Unauthorized");
        err.status = 401;
        return next(err);
    }
    next();
  }
};
