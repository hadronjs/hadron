# Synopsis

*Hadron* is a **minimalistic, extensible publishing/blogging platform** written in Node.js, best enjoyed by a Node.js developer :).

Hadron gives you the foundation to build **your very own** blog, thanks to its composable architecture.

The core is built reusing well-known and (mostly) loved javascript frameworks and libraries (Express, Grunt, LevelDB, etc.) with a sprinkle of [Scatter](https://github.com/mariocasciaro/scatter) IoC to give the application **composability** from the ground up.

[![NPM](https://nodei.co/npm-dl/hadron.png?months=1)](https://nodei.co/npm/hadron/)

[![Build Status](https://travis-ci.org/hadronjs/hadron.png)](https://travis-ci.org/hadronjs/hadron)


#### Tech Features

* Built in Javascript on **Node.js** with the aid of the [Scatter](https://github.com/mariocasciaro/scatter) IoC container and the [Particles](https://github.com/particles) platform.
* Uses **LevelDB** by default to store the data. No database servers to install or maintain.
* Static public frontend built with **jade**
* Admin interface built with **Angular.js**
* **Grunt**-based asset management, with dynamically generated configuration (using [`grunt-particles-assetmanager`](https://github.com/particles/grunt-particles-assetmanager))
* Supports **markdown** for posts
* Integrations with social networks built into the core
* Plugins for **Google Analytics** and **Disqus**
* Everything is extensible by default, from functionality (**plugins**) to appearence (**themes**)
* Do you need more? Just [ask](https://github.com/hadronjs/hadron/issues).

#### Stability

Hadron is currently in **experimental** stage, things may change rapidly and although reasonable efforts will be made to not break compatibility, no easy migration might be provided between releases at this very early stage.

That said, early adopters/testers are more than welcome :).

# Quick install

* Choose a name for you blog, for this example we will call it `myblog`. Replace it with your name in the commands that will follow.
* Create a directory for your blog
```
$ mkdir myblog
```
* Download and extract the `hadron-seed` project
```
$ wget https://github.com/hadronjs/hadron-seed/archive/master.tar.gz -O hadron-seed.tar.gz
```
* Extract it into your blog directory
```
$ tar -xzvf hadron-seed.tar.gz hadron-seed-master --strip-components=1 -C ./myblog
```
* Install the dependencies, build and install the application
```
$ cd myblog
$ npm install
$ grunt install
$ grunt build
```

* Fire it up
```
$ node app
```
* Play with it:
    * Access the frontend at [http://localhost:3000](http://localhost:3000)
    * The admin interface is at [http://localhost:3000/admin](http://localhost:3000/admin). Use the credentials `admin/admin` to login the first time.
    * **Don't forget to change your password if you are deploying Hadron in production!**


# Customization

...coming soon

# In production

* Remember to install ONLY your production dependencies
```
$ rm -rf node_modules
$ npm install --production
```
* If you use a PaaS, or a continuous integration/deployment, do not forget to checkin your `node_modules` dir, and to run
```
$ npm rebuild
```
on the target system, to rebuild binary modules before the app starts.
* Start the app in production mode, you'll get a big performance improvement
```
$ NODE_ENV=production node app.js
```

# Update

Thanks to Scatter/Particles, it should be as easy as:

* `npm update`
* `grunt install
* `grunt build`


# The Philosophy

**Hadron** is an experiment.

It was built mainly for 2 reasons:

* Provide an elegant, minimalistic, fully functional publishing platform (e.g. who wants to maintain a DB server for just a personal blog???).
* Provide a proof of concept to show how easy it can be to build composable architectures using [Scatter](https://github.com/mariocasciaro/scatter) IoC and the [Particles](https://github.com/particles) plaftorm.

Hadron itself is an npm packaged Scatter module (a particle), and is installed as an npm dependency from an `hadron-seed` module, this makes updating the core unbelievably easy (just `npm update`), and **allows you to build your very own version of Hadron** without affecting the core or plugins.

## Credits

* Creator/Maintainer: [Mario Casciaro](https://github.com/mariocasciaro) - Twitter [@mariocasciaro](https://twitter.com/mariocasciaro)
* your name here

## Feedback & Social

Any feedback is welcome. If you just like/dislike Hadron, if you tried it, if are using it for your blog/website, please let us know with a tweet mentioning [@hadronjs](https://twitter.com/hadronjs).
