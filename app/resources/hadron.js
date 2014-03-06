

var self = module.exports = {
  __module: {
    provides: {
      "resources/use_scripts": {},
      "resources/use_stylesheets": {},
      "resources/register_assets_dir": {},
      "resources/register_views_dir": {after: ['./particles-express']},
      "resources/declare_angular_scripts": {}
    },
    properties: {
      jquery: 'resources/jquery',
      angular: 'resources/angular'
    }
  },
  
  declare_angular_scripts: function() {
    return {cwd: __dirname + "/../assets", file: "js/**/*.js"};
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

        "lib/toastr/toastr.js",

        "lib/slugg.js",

        self.angular.exports.scripts.all,
        "lib/angular-xeditable/js/xeditable.js",
        "lib/angular-ui/angular-ui-router.js",
        "lib/angular-ui/ui-bootstrap-tpls.js",
        "lib/angular-ui/ui-validate.js",
        "lib/ngProgress/ngProgress.js",
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
        "lib/toastr/toastr.css",
        "lib/angular-xeditable/css/xeditable.css",
        "lib/ngProgress/ngProgress.css"
      ]
    };
  }
};
