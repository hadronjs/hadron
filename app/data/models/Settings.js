var crypto = require('crypto'),
  minimodel = require('minimodel');

var Settings = minimodel.Model.extend({ 
  id: {
    type: String,
    default: "MainSettings",
    set: function(val) {
      this.setRaw("MainSettings");
    }
  },
  adminUser: {
    id: {
      type: String,
      default: "1",
      set: function(val) {
        this.setRaw("1");
      }
    },
    username: {
      type: String,
      required: true
    },
    hashed_password: {
      type: String,
      required: true,
      includeInJson: false,
      includeInObject: false
    },
    password: {
      type: minimodel.Types.Virtual,
      set: function(val) {
        if(val) {
          this.model.setRaw("adminUser.hashed_password", crypto.createHash('sha512').update(val).digest('hex'));
        }
      }
    }
  },
  website: {
    title: {
      type: String,
      required: true
    },

    headline: String
  },
  social: {
    twitter: {
      username: String,
      showShareButton: Boolean
    },
    linkedin: {
      username: String,
      showShareButton: Boolean
    },
    github: {
      username: String
    },
    google: {
      username: String,
      showShareButton: Boolean
    },
    facebook: {
      showShareButton: Boolean
    }
  },
  menu: [{
    label: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    },
    iconClass: String
  }]
});

Settings.prototype.verifyPassword = function(pwd) {
  return crypto.createHash('sha512').update(pwd).digest('hex') === this.adminUser.hashed_password;
};

module.exports = Settings;
module.exports.__module = {
  type: 'object'
};
