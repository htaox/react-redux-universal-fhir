var mongoose = require('mongoose');
var _ = require('underscore');
var async = require('async');

var ResourceHistorySchema = new mongoose.Schema({
  resourceType: String,
  vistaId: String,
  history: [{resourceId: mongoose.Schema.Types.ObjectId, createdAt: Date}]
});

ResourceHistorySchema.methods = {
  addVersion: function (resourceId) {
    this.history.push({resourceId: resourceId, createdAt: Date.now()});
  },

  getVersion: function (version, callback) {
    var resourceModel = mongoose.model(this.resourceType);
    resourceModel.findOne(this.getVersionId(version), function(err, instance){
      callback(err, instance);
    });
  },

  getVersionId: function (version) {
    return this.history[version-1].resourceId.toHexString();
  },

  versionCount: function () {
    return this.history.length;
  },

  lastUpdatedAt: function () {
    return _.last(this.history).createdAt;
  },

  latestVersionId: function () {
    return _.last(this.history).resourceId.toHexString();
  },

  findLatest: function(callback) {
    var resourceModel = mongoose.model(this.resourceType);
    resourceModel.findById(this.latestVersionId(), function(err, instance) {
      callback(err, instance);
    });
  }
};

ResourceHistorySchema.statics = {
  findInCacheOrLocal: function (resourceId, resourceType, cb) {
    var self = this;
    async.waterfall([
      function(callback) {
        self.findOne({vistaId: resourceId, "resourceType": resourceType}, function(err, resourceHistory) {
          callback(err, resourceHistory);
        });
      },
      function(resourceHistory, callback) {
        if (resourceHistory) {
          callback(resourceHistory);
        } else {
          self.findById(resourceId, function(err, resourceHistory) {
            callback(resourceHistory);
          });
        }
      }
    ], function(resourceHistory) {
      cb(resourceHistory);
    });
  }
};

mongoose.model('ResourceHistory', ResourceHistorySchema);