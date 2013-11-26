var minimodel = require('minimodel');

var FriendlyUrl = minimodel.Model.extend({
  id: String,
  url: String
});

module.exports = FriendlyUrl;
module.exports.__module = {
  type: 'object'
};