var delega = require('delega');


var __module = {
  args: ['data/repositories/settingsRepository']
};

module.exports = function(settingsRepository) {
  var settingsService = {};
  
  delega.delegateToObject(settingsService, settingsRepository, [
    'retrieveSettings', 'saveSettings'
  ]);
  
  return settingsService;
};
module.exports.__module = __module;