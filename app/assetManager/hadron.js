

var self = module.exports = {
  __module: {
    provides: {
      use_scripts: {},
      use_stylesheets: {},
      register_assets_dir: {},
      register_views_dir: {after: ['assetManager/particles-express']}
    },
    properties: {
      jquery: 'assetManager/jquery',
      angular: 'assetManager/angular'
    }
  },

  register_assets_dir: function() {
    return __dirname + "/../assets";
  },

  register_views_dir: function() {
    return __dirname + "/../views";
  },

  use_scripts: function() {
    return {
      admin: [
        self.jquery.exports.scripts.all,
        "js/shatter.js",

        "lib/toastr/toastr.js",

        "lib/slugg.js",

        self.angular.exports.scripts.all,
        "lib/angular-ui/angular-ui-router.js",
        "lib/angular-ui/ui-bootstrap-tpls.js",
        "lib/angular-ui/ui-validate.js",
        {cwd: __dirname + "/../assets", file: "js/**/*.js"}
      ],
      default: [
        self.jquery.exports.scripts.all
      ]
    };
  },

  use_stylesheets: function() {
    return {
      admin: [
        "lib/toggle-switch.css",
        "lib/toastr/toastr.css"
      ]
    };
  }
};