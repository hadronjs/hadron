var _ = require('lodash');

var objectUtils = module.exports = {};

objectUtils.delegate = function(to, method) {
  return function() {
    return to[method].apply(to, arguments);
  };
};

objectUtils.delegateWithinContext = function(to, method) {
  return function() {
    return this[to][method].apply(this[to], arguments);
  };
};

objectUtils.createDelegateWithinContext = function(proto, to, methods) {
  _.each(methods, function(method) {
    proto[method] = objectUtils.delegateWithinContext(to, method);
  });
};

objectUtils.createDelegate = function(proto, to, methods) {
  _.each(methods, function(method) {
    proto[method] = objectUtils.delegate(to, method);
  });
};

