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
import fs from 'fs';
// var eco = require('eco');
import async from 'async';
import ResponseFormatHelper from `${__dirname}/../../lib/response_format_helper`;

const Patient = mongoose.model('Patient');
const ResourceHistory = mongoose.model('ResourceHistory');

export function load (req, res, id, vid, next) {
  if (req.resourceHistory) {
    if(vid !== null){
      req.resourceHistory.getVersion(vid, (err, patient) => {
        req.patient = patient;
        next(patient);
      });
    } else {
      req.resourceHistory.findLatest((err, patient) => {
        req.patient = patient;
        next(patient);
      });
    }
  } else {
    ResourceHistory.findOne(id, (rhErr, resourceHistory) => {
      if (rhErr) {
        next(rhErr);
      }
      if(resourceHistory !== null) {
        req.resourceHistory = resourceHistory;
        req.resourceHistory.findLatest(function(err, patient) {
          req.patient = patient;
          next(patient);
        });
      }
    });
  }
}

export function show (req, res) {
  const patient = req.patient;
  const json = JSON.stringify(patient);
  res.send(json);
}

export function create (req, res) {
  let patient = new Patient(req.body);
  patient.save(function(err, savedPatient) {
    if(err) {
      res.send(500);
    } else {
      let resourceHistory = new ResourceHistory({resourceType: 'Patient'});
      resourceHistory.addVersion(savedPatient.id);
      resourceHistory.save((rhErr, savedResourceHistory) => {
        if (rhErr) {
          res.send(500);
        } else {
          res.set('Location', ("http://localhost:3000/patient/@" + resourceHistory.id));
          res.send(201);
        }
      });
    }
  });
}

export function update (req, res) {
  let patient = req.patient;
  patient = _.extend(patient, req.body);
  patient.save((err, savedpatient) => {
    if(err) {
      res.send(500);
    } else {
      let resourceHistory = req.resourceHistory;
      resourceHistory.addVersion(savedpatient);
      resourceHistory.save((rhErr, savedResourceHistory) => {
        if (rhErr) {
          res.send(500);
        } else {
          res.send(200);
        }
      });
    }
  });
}

export function destroy (req, res) {
  let patient = req.patient;
  patient.remove((err) => {
    if(err) {
      res.send(500);
    } else {
      res.send(204);
    }
  });
}

export function list (req, res) {

  let content = {
    title: "Search results for resource type Patient",
    id: "http://localhost:3000/patient",
    totalResults: 0,
    link: {
      href: "http://localhost:3000/patient",
      rel: "self"
    },
    updated: new Date(Date.now()),
    entry: []
  };

  ResourceHistory.find({resourceType:"Patient"}, (rhErr, histories) => {
    if (rhErr) {
      return next(rhErr);
    }
    let counter = 0;
    async.forEach(histories, (history, callback) => {
      counter++;
      content.totalResults = counter;
      history.findLatest((err, patient) => {
        let entrywrapper = {
          title: "Patient " + history.vistaId + " Version " + history.versionCount(),
          id: "http://localhost:3000/patient/@" + history.vistaId,
          link: {
            href: "http://localhost:3000/patient/@" + history.vistaId + "/history/@" + history.versionCount(),
            rel: "self"
          },
          updated: history.lastUpdatedAt(),
          published: new Date(Date.now()),
          content: patient
        };
        content.entry.push(entrywrapper);
        callback();
      });
    }, (err) => {
        res.send(JSON.stringify(content));
    });
  });
}