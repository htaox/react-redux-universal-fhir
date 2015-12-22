'use strict';

import mongoose from 'mongoose';

export const NATIVE_TYPES = /^(uuid|uri|id|code|markdown|oid|string|time|date|dateTime|instant|integer|decimal|unsignedInt|positiveInt|base64Binary|boolean)$/i;
export const FHIR_SCHEMAS_DIR = './fhir-schema';
export const SCHEMAS_DEST = './schemas';
export const DEPENDENCIES_DEST = './dependencies';
export const EVAL_JS_TYPES = {

  "String": String,
  "Boolean": Boolean,
  "Number": Number,
  "Date": Date,
  "Array": Array,
  "Mixed": mongoose.Schema.Types.Mixed,
  "ObjectId": mongoose.Schema.Types.ObjectId
};
export const SNOMED_CT_DIR = './snomed-ct';
export const SNOMED_CT_FILE = 'sct2_Description_Snapshot-en_US1000124_20150901.txt';
