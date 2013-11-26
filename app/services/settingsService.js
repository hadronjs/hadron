var objectUtils = require('../utils/objects');


var __module = {
  args: ['data/repositories/settingsRepository']
};

module.exports = function(settingsRepository) {
  var settingsService = {};
  
  objectUtils.createDelegate(settingsService, settingsRepository, [
    'retrieveSettings', 'saveSettings'
  ]);
  
  return settingsService;
};
module.exports.__module = __module;