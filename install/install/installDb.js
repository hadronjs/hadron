var fs = require('fs'),
  path = require('path');

var self = module.exports = {
  __module: {
    properties: {
      postService: 'services/postService',
      pageService: 'services/pageService',
      settingsService: 'services/settingsService',
      promises: 'utils/promises',
      log: 'install/log',
      config: "config"
    },
    provides: 'install/install'
  },

  install: function() {   
    return self.promises.all(
      self.populateSettings(),
      self.populatePosts(),
      self.populatePages()
    );
  },
  

  populateSettings: function() {
    return self.settingsService.retrieveSettings()
      .then(function(settings) {
        var newSettings = {};
        if(!settings || !settings.adminUser) {
          self.log.info("Updating adminUser");
          newSettings.adminUser = {
            id: "1",
            username: "admin",
            password: "admin"
          };
        }

        if(!settings || !settings.website) {
          self.log.info("Updating website");
          newSettings.website = {
            title: "Hadron",
            headline: "A Node.js blogging platform for Node.js developers"
          };
        }

        if(!settings || !settings.menu) {
          self.log.info("Updating  menu");
          newSettings.menu = [
            {
              label: "Home",
              link: "/",
              iconClass: "fa fa-home"
            },
            {
              label: "About",
              link: "/about-hadron",
              iconClass: "fa fa-info-circle"
            }
          ];
        }

        return self.settingsService.saveSettings(newSettings);
      });
  },

  populatePosts: function() {
    return self.postService.findAll()
      .then(function(posts) {
        if(posts && posts.length) {
          return;
        }
        
        self.log.info("Populating posts");
        return self.postService.save({
          title: 'This is the "Hello World" of Hadron.',
          content: fs.readFileSync(path.join(__dirname, "helloWorld.md"), {encoding: "utf-8"}),
          friendlyUrl: "hello-world",
          lead: "This is Hadron.",
          contentType: 'markdown',
          isPublished: true
        });
      });
  },

  populatePages: function() {
    return self.pageService.findAll()
      .then(function(pages) {
        if(pages && pages.length) {
          return;
        }

        self.log.info("Populating pages");
        return self.pageService.save({
          title: 'About Hadron',
          content: fs.readFileSync(path.join(__dirname, "../../README.md"), {encoding: "utf-8"}),
          friendlyUrl: "about-hadron",
          contentType: 'markdown',
          isPublished: true
        });
      });
  }
};