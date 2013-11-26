var objectUtils = require('../utils/objects');


var __module = {
  args: ['data/repositories/friendlyUrlRepository']
};

module.exports = function(friendlyUrlRepository) {
  var friendlyUrlService = {};
  
  objectUtils.createDelegate(friendlyUrlService, friendlyUrlRepository, [
    'retrieve', 'delete'
  ]);
  
  return friendlyUrlService;
};
module.exports.__module = __module;