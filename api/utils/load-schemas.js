'use strict';

import {ResourceHistorySchema} from './resource_history';
import {SchemaHelper} from '../../lib/schema-helper';

let schemaHelper = new SchemaHelper();

schemaHelper.processSchemas();

export default schemaHelper;