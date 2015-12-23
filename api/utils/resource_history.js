// Copyright (c) 2011+, HL7, Inc & The MITRE Corporation
// All rights reserved.
// 
// Redistribution and use in source and binary forms, with or without modification, 
// are permitted provided that the following conditions are met:
// 
//  * Redistributions of source code must retain the above copyright notice, this 
//    list of conditions and the following disclaimer.
//  * Redistributions in binary form must reproduce the above copyright notice, 
//    this list of conditions and the following disclaimer in the documentation 
//    and/or other materials provided with the distribution.
//  * Neither the name of HL7 nor the names of its contributors may be used to 
//    endorse or promote products derived from this software without specific 
//    prior written permission.
// 
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND 
// ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED 
// WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. 
// IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, 
// INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT 
// NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR 
// PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, 
// WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) 
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE 
// POSSIBILITY OF SUCH DAMAGE.

import mongoose from 'mongoose';
import _ from 'lodash';
import async from 'async';

let ResourceHistorySchema = new mongoose.Schema({
  resourceType: String,
  vistaId: String,
  history: [{resourceId: mongoose.Schema.Types.ObjectId, createdAt: Date}]
});

ResourceHistorySchema.methods = {
  addVersion: (resourceId) => {
    this.history.push({resourceId: resourceId, createdAt: Date.now()});
  },

  getVersion: (version, callback) => {
    var resourceModel = mongoose.model(this.resourceType);
    resourceModel.findOne(this.getVersionId(version), (err, instance) => {
      callback(err, instance);
    });
  },

  getVersionId: (version) => {
    return this.history[version-1].resourceId.toHexString();
  },

  versionCount: () => {
    return this.history.length;
  },

  lastUpdatedAt: () => {
    return _.last(this.history).createdAt;
  },

  latestVersionId: () => {
    return _.last(this.history).resourceId.toHexString();
  },

  findLatest: (callback) => {
    let resourceModel = mongoose.model(this.resourceType);
    resourceModel.findById(this.latestVersionId(), (err, instance) => {
      callback(err, instance);
    });
  }
};

ResourceHistorySchema.statics = {
  findInCacheOrLocal: (resourceId, resourceType, cb) => {
    let self = this;
    async.waterfall([
      (callback) => {
        self.findOne({vistaId: resourceId, "resourceType": resourceType}, (err, resourceHistory) => {
          callback(err, resourceHistory);
        });
      },
      (resourceHistory, callback) => {
        if (resourceHistory) {
          callback(resourceHistory);
        } else {
          self.findById(resourceId, (err, resourceHistory) => {
            callback(resourceHistory);
          });
        }
      }
    ], (resourceHistory) => {
      cb(resourceHistory);
    });
  }
};

// Just need to import this module at startup 
mongoose.model('ResourceHistory', ResourceHistorySchema);

export default ResourceHistorySchema;