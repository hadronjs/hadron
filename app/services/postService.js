var delega = require('delega');


var __module = {
  args: ['data/models/Post', 'data/repositories/postRepository', 'data/repositories/friendlyUrlRepository']
};

function PostsService(Post, postRepository, friendlyUrlRepository) {
  this.Post = Post;
  this.postRepository = postRepository;
  this.friendlyUrlRepository = friendlyUrlRepository;
}
  
delega.delegateToProperty(PostsService, 'postRepository', [
  'retrieve',
  'findAllOrderByDate',
  'findAll',
  'findAllPublishedOrderByDate',
  'retrieveByFriendlyUrl'
]);


//PostsService.prototype.ensureModel = function(data) {
//  if(data instanceof this.Post) {
//    return data;
//  }
//
//  return new this.Post(data);
//};


PostsService.prototype.save = function(post) {
  var self = this;

  //clean the previous friendly url
  return self.friendlyUrlRepository.delete(post.friendlyUrl).then(function() {
    return self.postRepository.save(post).then(function(post) {
      //save the new friendly url
      return self.friendlyUrlRepository.save({
        id: post.friendlyUrl,
        url: "/posts/"+post.id
      }).then(function() {
        return post;
      });
    });
  });
};


PostsService.prototype.delete = function(postId) {
  var self = this;

  return self.postRepository.retrieve(postId).then(function(post) {
    if(post) {
      return self.friendlyUrlRepository.delete(post.friendlyUrl).then(function() {
        return self.postRepository.delete(postId);
      });
    }
  });
};

module.exports = PostsService;
module.exports.__module = __module;
