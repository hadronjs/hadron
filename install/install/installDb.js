var fs = require('fs'),
  path = require('path');

var self = module.exports = {
  __module: {
    properties: {
      postService: 'services/postService',
      settingsService: 'services/settingsService',
      promises: 'utils/promises',
      dbcltService: 'services/dbctlService',
      log: 'install/log',
      config: "config"
    },
    provides: 'install/install'
  },

  install: function() {   
    return self.dbcltService.dbInstalled()
      .then(function(installed) {
        if(!installed) {
          return self.populateSettings().then(function() {
            return self.populatePosts();
          });
        }
    });
  },

  populateSettings: function() {
    self.log.info("Populating `settings`");
    return self.settingsService.saveSettings({
      adminUser: {
        id: "1",
        username: "admin",
        password: "admin"
      },

      website: {
        title: "Hadron",
        headline: "A Node.js blogging platform for Node.js developers"
      },

      menu: [{
        label: "Home",
        link: "/",
        iconClass: "fa fa-home"
      }]
    });
  },

  populatePosts: function() {
    self.log.info("Populating `posts`");
    return self.postService.save({
      title: 'This is the "Hello World" of Hadron.',
      content: fs.readFileSync(path.join(__dirname, "helloWorld.md"), {encoding: "utf-8"}),
      friendlyUrl: "hello-world",
      lead: "This is Hadron.",
      contentType: 'markdown',
      isPublished: true
    });
  }
};