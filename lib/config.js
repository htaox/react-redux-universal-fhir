'use strict';

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
