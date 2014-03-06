var delega = require('delega');


var __module = {
  args: ['data/models/Page', 'data/repositories/pageRepository', 
    'data/repositories/friendlyUrlRepository']
};

function PageService(Page, pageRepository, friendlyUrlRepository) {
  this.Page = Page;
  this.pageRepository = pageRepository;
  this.friendlyUrlRepository = friendlyUrlRepository;
}
  
delega.delegateToProperty(PageService, 'pageRepository', [
  'retrieve',
  'findAll',
  'retrieveByFriendlyUrl'
]);


PageService.prototype.save = function(page) {
  var self = this;

  //clean the previous friendly url
  return self.friendlyUrlRepository.delete(page.friendlyUrl).then(function() {
    return self.pageRepository.save(page).then(function(page) {
      //save the new friendly url
      return self.friendlyUrlRepository.save({
        id: page.friendlyUrl,
        url: "/pages/"+page.id
      }).then(function() {
        return page;
      });
    });
  });
};


PageService.prototype.delete = function(pageId) {
  var self = this;

  return self.pageRepository.retrieve(pageId).then(function(page) {
    if(page) {
      return self.friendlyUrlRepository.delete(page.friendlyUrl).then(function() {
        return self.pageRepository.delete(pageId);
      });
    }
  });
};

module.exports = PageService;
module.exports.__module = __module;
