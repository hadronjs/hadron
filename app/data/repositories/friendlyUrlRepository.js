
var _ = require('lodash'),
  util = require('util');

var __module = {
  args: ['data/repositories/AbstractRepository', 'data/levelup', 'data/models/FriendlyUrl']
};

module.exports = function(AbstractRepository, rootDb, FriendlyUrl) {

  util.inherits(FriendlyUrlRepository, AbstractRepository);

  function FriendlyUrlRepository() {
    AbstractRepository.call(this, rootDb, 'friendly_urls', FriendlyUrl, {});
  }
  return new FriendlyUrlRepository();
};
module.exports.__module = __module;