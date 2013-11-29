var delega = require('delega');


var __module = {
  args: ['data/repositories/friendlyUrlRepository']
};

module.exports = function(friendlyUrlRepository) {
  var friendlyUrlService = {};
  
  delega.delegateToObject(friendlyUrlService, friendlyUrlRepository, [
    'retrieve', 'delete'
  ]);
  
  return friendlyUrlService;
};
module.exports.__module = __module;