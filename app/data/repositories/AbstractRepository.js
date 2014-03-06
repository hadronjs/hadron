
var _ = require('lodash'),
  minimodel = require('minimodel'),
  endpoint = require('endpoint'),
  indico = require('level-indico');


var AbstractRepository = function(rootDb, bucketName, model, indices) {
  this.model = model;
  this.subName = bucketName;
  this.db = indico(rootDb.sublevel(this.subName));

  this._registerIndices(indices);
};


AbstractRepository.__module = {
  type: "object",
  properties: {
    promises: 'utils/promises'
  }
};


AbstractRepository.prototype._registerIndices = function(indices) {
  var self = this;
  self.index = {};
  _.each(indices, function(idx, name) {
    if(!_.isArray(idx)) {
      throw new Error("Index definition is not an array");
    }
    self.index[name] = self.db.indico.ensureIndex.call(self.db.indico, idx);
  });
};


AbstractRepository.prototype.beforeSave = function(entity) {
  var data = entity.toDb();
  if(_.isFunction(this._beforeSave)) {
    var res = this._beforeSave(data);
    if(res !== void 0) {
      return res;
    }
  }
  return data;
};


AbstractRepository.prototype.afterRetrieve = function(data) {
  if(_.isFunction(this._afterRetrieve)) {
    var res = this._afterRetrieve(data);
    if(res !== void 0) {
      data = res;
    }
  }

  return new this.model(data);
};


AbstractRepository.prototype.afterRetrieveList = function(entities) {
  var self = this;
  var arr = new minimodel.ModelsArray();
  _.each(entities, function(elem) {
    arr.push(self.afterRetrieve(elem));
  });
  
  return arr;
};


AbstractRepository.prototype.ensureModel = function(data) {
  if(data instanceof this.model) {
    return data;
  }

  return new this.model(data);
};


AbstractRepository.prototype.save = function(entity, options) {
  options = options || {};
  var self = this;
  var promise = AbstractRepository.promises.resolve(entity);
  
  //combine the two entities if it's an update
  if(entity.id && !options.overwrite) {
    var data = entity;
    if(entity instanceof minimodel.Model) {
      data = entity.toDb();
    }
    promise = self.retrieve(entity.id).then(function(entityFromDb) {
      if(_.isEmpty(entityFromDb)) {
        return entity;
      }

      entityFromDb.set(data);
      return entityFromDb;
    });
  }
  
  return promise.then(function(entity) {
    entity = self.ensureModel(entity);
    
    return entity.validate().then(function() {
      var data = self.beforeSave(entity);

      return AbstractRepository.promises.ninvoke(self.db, 'put', data.id, data).then(function() {
        return entity;
      });
    });
  });
};


AbstractRepository.prototype.findAll = function(options) {
  var self = this;
  var deferred = AbstractRepository.promises.defer();
  this.db.createValueStream(options).pipe(endpoint({objectMode: true}, function(err, all) {
    if(err) {
      deferred.reject(err);
    } else {
      deferred.resolve(all);
    }
  })).on('error', function(err) {
    deferred.reject(err);
  });
  
  return deferred.promise.then(function(ntts) {
    return self.afterRetrieveList(ntts);
  });
};


AbstractRepository.prototype.findBy = function(properties, options) {
  var self = this;
  if(_.isArray(properties)) {
    return AbstractRepository.promises.ninvoke(this.db.indico, 'findBy', properties, options).then(function(ntts) {
      return self.afterRetrieveList(ntts);
    });
  }
  else {
    return AbstractRepository.promises.ninvoke(properties, 'find', options).then(function(ntts) {
      return self.afterRetrieveList(ntts);
    });
  }
};


AbstractRepository.prototype.streamBy = function(properties, options) {
  return this.db.indico.streamBy(properties, options);
};

AbstractRepository.prototype.retrieve = function(id) {
  var self = this;
  return AbstractRepository.promises.ninvoke(this.db, 'get', id).then(function(ntt) {
    return self.afterRetrieve(ntt);
  }).otherwise(function(err) {
    if(err.notFound) {
      return null;
    }
    throw err;
  });
};


AbstractRepository.prototype.delete = function(id) {
  return AbstractRepository.promises.ninvoke(this.db, 'del', id);
};

module.exports = AbstractRepository;
