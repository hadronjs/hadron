<p align="center">
<img src="https://raw.github.com/hadronjs/resources/master/hadron_full.png"/>
</p>


----
[![NPM version](https://badge.fury.io/js/hadron.png)](http://badge.fury.io/js/hadron)
[![Build Status](https://travis-ci.org/hadronjs/hadron.png)](https://travis-ci.org/hadronjs/hadron)
[![Dependency Status](https://gemnasium.com/hadronjs/hadron.png)](https://gemnasium.com/hadronjs/hadron)

----

*Hadron* is a **minimalist, extensible publishing/blogging platform** written in Node.js, best enjoyed by a Node.js developer :).

Hadron gives you the foundation to build **your very own** blog, thanks to its composable architecture.

The core is built reusing well-known and (mostly) loved javascript solutions  (Express, Gulp, LevelDB, AngularJS, etc.) with a sprinkle of [Scatter](https://github.com/mariocasciaro/scatter) IoC to give **composability** from the ground up.

#### Tech Features

* Built on top of the **Node.js** platform, with the aid of the [Scatter](https://github.com/mariocasciaro/scatter) IoC container and the [Particles](https://github.com/particles) platform.
* Uses **LevelDB** by default to store the data. No database servers to install or maintain.
* Static public frontend built with **jade**
* Admin interface built with **Angular.js**
* **Gulp**-based asset management, with dynamically generated configuration (using [`particles-assetmanager`](https://github.com/particles/particles-assetmanager))
* Supports **markdown** for posts
* Integrations with social networks built into the core
* Plugins for **Google Analytics** and **Disqus**
* Everything is extensible by default, from functionality (**plugins**) to appearence (**themes**)
* Do you need more? Just [ask](https://github.com/hadronjs/hadron/issues).

#### Stability

Hadron is currently in **experimental** stage, things may change rapidly and although reasonable efforts will be made to not break compatibility, no easy migration might be provided between releases at this very early stage.

That said, we will try to keep everybody happy, so early adopters/testers are more than welcome :).
# Screenshots

![Hadron homepage](https://raw.github.com/hadronjs/resources/master/hadron_screenshot1.jpeg)

![Hadron admin](https://raw.github.com/hadronjs/resources/master/hadron_screenshot2.jpeg)

# Quick install

* Choose a name for you blog, for this example we will call it `MYBLOG`. Replace it with your name in the commands 
  that will follow.
* Create a directory for your blog and create a new git repo
```
$ mkdir MYBLOG && cd MYBLOG
$ git init
```

* Checkout the `hadron-seed` repository
```
$ git remote add hadron-seed -m master https://github.com/hadronjs/hadron-seed.git
$ git pull -s recursive -X theirs hadron-seed master
```

* Install the dependencies, build and install the application
```
$ npm install
$ gulp install
$ gulp build
```

* [Optional] Commit the changes to your new repo
```
$ git add -A
$ git commit -m "My first Hadron blog"
```

* Fire it up
```
$ node app
```
* Play with it:
    * Access the frontend at [http://localhost:3000](http://localhost:3000)
    * The admin interface is at [http://localhost:3000/admin](http://localhost:3000/admin). Use the credentials `admin/admin` to login the first time.
    * **Don't forget to change your password if you are deploying Hadron in production!**

# In production

* Remember to install ONLY your production dependencies
```
$ rm -rf ./node_modules
$ npm install --production
```

* If you use a PaaS, or a continuous integration/deployment, do not forget to checkin your `node_modules` dir, and to run
```
$ npm rebuild
```
on the target system, to rebuild binary modules before the app starts.
* Build the app in production mode, so all the assets are concatenated and minified
```
$ gulp build --isProd
```
* Start the app in production mode, you'll get a big performance improvement
```
$ NODE_ENV=production node app.js
```

# Easy deployment on the OpenShift PaaS

You can easily deploy your Hadron blog to OpenShift and having it running on the cloud with minimal effort. Check out the [hadron-openshift-seed](https://github.com/hadronjs/hadron-openshift-seed) project.

# Update

* Backup everything, in particular the data directory and any custom plugin/theme
* Remove the old dependencies
```
$ rm -rf node_modules
```

* Pull the latest `hadron-seed` code (this will update the versions in `package.json` and default config if needed).
```
$ git pull -s recursive hadron-seed master
```

* (Optional) If you modified any file locally you might need to merge any conflict.
```
$ git mergetool
```

* (Optional) If you are using hadron-openshift you should update it too
```
$ git pull -s recursive hadron-openshif master
$ git mergetool
```

* Install and build as usual
```
$ npm install
$ gulp install
$ gulp build
```

# Plugin & Theme Development

Use this command to start Hadron in development mode, so it restarts and rebuilds automatically when an asset or server side code changes:
```
$ gulp develop
```

Please refer to the wiki: 

#### [Plugin & Theme Development](https://github.com/hadronjs/hadron/wiki/Develop)

-----
# Changelog

### 0.3.0

* Static pages
* Editable menu
* Asset manager refactored to use gulp
* Minification and concatenation of the assets in production
* Sligtly improved admin UI
* **Breaking changes**: 
    * Asset definitions must be moved from the `assetManager` to `resources` namespace.
    * To build and install Hadron `gulp` should be used in place of `grunt`
    * In the configuration the `assetManager` property is now `resources`
    * View injection tags changed to use the format `//INJECT:<type>:<namespace>`

-----

# The Philosophy

**Hadron** is an experiment.

It was built mainly for 2 reasons:

* Provide an elegant, minimalist, fully functional publishing platform (e.g. who wants to maintain a DB server for just a personal blog???).
* Provide a proof of concept to show how easy it can be to build composable architectures using [Scatter](https://github.com/mariocasciaro/scatter) IoC and the [Particles](https://github.com/particles) plaftorm.

Hadron itself is an npm packaged Scatter module (a particle), and is installed as an npm dependency from an `hadron-seed` module, this makes updating the core unbelievably easy (just `npm update`), and **allows you to build your very own version of Hadron** without affecting the core or plugins.

## Credits

* Creator/Maintainer: [Mario Casciaro](https://github.com/mariocasciaro) - Twitter [@mariocasciaro](https://twitter.com/mariocasciaro)
* Contributor: [Jason Marah](https://github.com/jasonmarah) - Twitter [@jasonmarah](https://twitter.com/jasonmarah)

## Feedback & Social

Any feedback is welcome. If you just like/dislike Hadron, if you tried it, if are using it for your blog/website, 
please let us know with a tweet mentioning [@hadronjs](https://twitter.com/hadronjs).

Also there is a Google group you can use to ask questions and discuss about Hadron. 
Visit the [Hadron Google group](http://groups.google.com/d/forum/hadronjs).
