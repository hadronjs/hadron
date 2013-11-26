
var _ = require('lodash'),
  util = require('util');


var __module = {
  args: ['data/repositories/AbstractRepository', 'data/levelup', 'data/models/Settings']
};

module.exports = function(AbstractRepository, rootDb, Settings) {

  util.inherits(SettingsRepository, AbstractRepository);

  function SettingsRepository() {
    AbstractRepository.call(this, rootDb, 'settings', Settings, {});
  }

  SettingsRepository.prototype.retrieveSettings = function() {
    var self = this;
    if(!this._settings) {
      this._settings = self.retrieve("MainSettings");
    }
    return this._settings;
  };

  SettingsRepository.prototype.saveSettings = function(settings) {
    settings.id = "MainSettings";
    //invalidate cache
    this._settings = null;
    return this.save(settings);
  };

  return new SettingsRepository();
};
module.exports.__module = __module;