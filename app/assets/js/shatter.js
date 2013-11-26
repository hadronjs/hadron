

(function(global) {
  function Shatter() {
    this.contributions = {};
  }

  Shatter.prototype.use = function(contributionContext, contributionName, contribution) {
    if(!this.contributions[contributionContext]) {
      this.contributions[contributionContext] = {};
    }
    
    if(!this.contributions[contributionContext][contributionName]) {
      this.contributions[contributionContext][contributionName] = [];
    }

    this.contributions[contributionContext][contributionName].push(contribution);
  };

  
  Shatter.prototype.getContributions = function(contributionContext, contributionName) {
    return this.contributions[contributionContext] && this.contributions[contributionContext][contributionName];
  };
  
  
  Shatter.prototype.contribute = function(contributionContext, contributionName, args) {
    var contributions = this.getContributions(contributionContext, contributionName);
    var res = [];
    if(contributions) {
      contributions.forEach(function(contrib) {
        res.push(contrib.apply(null, args));
      });
    }
    return res;
  };
  

  Shatter.prototype.contributeChain = function(contributionContext, contributionName, arg) {
    var contributions = this.getContributions(contributionContext, contributionName);
    var ret = arg;
    if(contributions) {
      contributions.forEach(function(contrib) {
        ret = contrib.apply(null, ret);
      });
    }
    return ret;
  };

  // ??
  //Shatter.prototype.contributeAsync = function(contributionContext, contributionName, arg) {
  //};
  
  global.shatter = new Shatter();
})(window);


