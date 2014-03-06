
var _ = require('lodash'),
  through = require('through'),
  endpoint = require('endpoint'),
  util = require('util');


var __module = {
  args: ['data/repositories/AbstractRepository', 'data/levelup', 'data/models/Page', 'utils/promises']
};

module.exports = function(AbstractRepository, rootDb, Page, promises) {

  util.inherits(PageRepository, AbstractRepository);

  function PageRepository() {
    AbstractRepository.call(this, rootDb, 'pages', Page, {
    });
  }
  
  return new PageRepository();
};
module.exports.__module = __module;
