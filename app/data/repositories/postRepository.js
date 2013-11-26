
var _ = require('lodash'),
  through = require('through'),
  endpoint = require('endpoint'),
  util = require('util');


var __module = {
  args: ['data/repositories/AbstractRepository', 'data/levelup', 'data/models/Post', 'utils/promises']
};

module.exports = function(AbstractRepository, rootDb, Post, promises) {

  util.inherits(PostRepository, AbstractRepository);

  function PostRepository() {
    AbstractRepository.call(this, rootDb, 'posts', Post, {
      createdDateDesc: [['createdDate', 'desc']]
    });
  }

  PostRepository.prototype.findAllOrderByDate = function() {
    return this.findBy(this.index.createdDateDesc, {start: [null], end: [undefined]});
  };

  PostRepository.prototype.findAllPublishedOrderByDate = function() {
    return this.findBy(this.index.createdDateDesc, {
      start: [null], 
      end: [undefined], 
      transform: through(
        function(item) {
          if(item.isPublished) {
            this.queue(item);
          }
        }
      )});
  };
  
  return new PostRepository();
};
module.exports.__module = __module;