angular.module('fhirface').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('/views/conformance.html',
    "<div class=\"row\">\n" +
    "  <div class=\"col-xs-8\">\n" +
    "    <div class=\"well\">\n" +
    "      <input class=\"form-control\" ng-model=\"search.type\" placeholder=\"Select resource\"/>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "      <a href=\"#/resources/{{item.type}}\"\n" +
    "        ng-repeat=\"item in resources | filter:search\"\n" +
    "        class=\"col-xs-4\">{{item.type}}</a>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"col-xs-4\">\n" +
    "    <div class=\"well\">\n" +
    "      <h3> Service Conformance </h3>\n" +
    "      <hr/>\n" +
    "      <ul>\n" +
    "        <li ng-repeat=\"(k,v) in conformance\">\n" +
    "        <b>{{k}}</b>  {{v | json}}\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('/views/resources/document.html',
    "<div class=\"row\">\n" +
    "  <textarea style=\"min-height: 1000px;\"\n" +
    "    ui-codemirror=\"{mode: 'javascript', lineWrapping: true, lineNumbers: true, json: true}\"\n" +
    "    ng-model='bundle.content'></textarea>\n" +
    "  <div class=\"btns\">\n" +
    "    <a href=\"#/resources/Any\" class=\"btn btn-default\">Cancel</a>\n" +
    "    <button ng-click=\"save()\" class=\"btn btn-success\">Save</button>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('/views/resources/history.html',
    "<div class=\"row\">\n" +
    "  <div class=\"col-xs-8\">\n" +
    "    <h3>Entry</h3>\n" +
    "    <hr/>\n" +
    "    <div class=\"item\"\n" +
    "      ng-repeat=\"entry in entries\"\n" +
    "      ng-click=\"entry._open =! entry._open\">\n" +
    "      {{entry.published}}\n" +
    "      <span class=\"text-muted\">{{entry.link[0].href}}</span>\n" +
    "\n" +
    "      <span class=\"pull-right text-muted\">\n" +
    "        Tags:\n" +
    "        <span ng-repeat=\"tag in entry.category\" title=\"{{tag.term}}\"> {{tag.label || tag.term}}; </span>\n" +
    "      </span>\n" +
    "\n" +
    "      <i ng-hide=\"entry._open\" class=\"fa fa-chevron-down\"></i>\n" +
    "      <i ng-show=\"entry._open\" class=\"fa fa-chevron-up\"></i>\n" +
    "      <div>\n" +
    "        <pre ng-show=\"entry._open\">{{ entry.content | json }}</pre>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"col-xs-4\">\n" +
    "    <div class=\"well\">\n" +
    "      <h3>History</h3>\n" +
    "      <hr/>\n" +
    "      <ul>\n" +
    "        <li ng-repeat=\"(k,v) in history\">\n" +
    "        <b>{{k}}</b> <code>{{v | json}}</code>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "\n"
  );


  $templateCache.put('/views/resources/index.html',
    "<div class=\"srch-box\">\n" +
    "  <div ng-show = \"searchState=='addParam' || searchState=='addSortParam'\">\n" +
    "    <div class=\"ttl\">\n" +
    "      <a class=\"btn btn-default\" ng-click=\"searchState='search'\"> &lt; Back</a>\n" +
    "      <input ng-model=\"searchFilter\" placeholder=\"filter\"/>\n" +
    "    </div>\n" +
    "    <div class=\"itm\" ng-repeat=\"param in typeFilterSearchParams(searchResourceType, searchFilter)\"\n" +
    "      ng-click=\"addParam(param)\" >\n" +
    "      <b>{{param.name}}</b>\n" +
    "      <span class=\"text-muted\">({{param.type}}) {{param.documentation}}</span>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div ng-show = \"searchState=='addRef'\">\n" +
    "    <div class=\"ttl\">\n" +
    "      <a class=\"btn btn-default\" ng-click=\"searchState='search'\"> &lt; Back</a>\n" +
    "      <input placeholder=\"filter\"/>\n" +
    "    </div>\n" +
    "    <div class=\"itm\" ng-repeat=\"param in query.searchIncludes\"\n" +
    "      ng-click=\"addParam(param)\" >\n" +
    "      <ab>{{param.path}}</ab>\n" +
    "      <span class=\"text-muted\">{{param.definition.short}}</span>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div ng-show = \"searchState=='addChain'\">\n" +
    "    <div class=\"ttl\">\n" +
    "      <a class=\"btn btn-default\" ng-click=\"searchState='search'\"> &lt; Back</a>\n" +
    "      <input placeholder=\"filter\"/>\n" +
    "    </div>\n" +
    "    <div class=\"itm\" ng-repeat=\"param in query.searchChains\" >\n" +
    "      <ab>{{param | json}}</ab>\n" +
    "      <span>{{param.xpath}}</span>\n" +
    "      <span class=\"text-muted\">{{param.documentation}}</span>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div ng-show = \"searchState=='search'\"\n" +
    "    ><div class=\"prm prm-ttl\">\n" +
    "      <div class=\"lbl\"><b>Search</b></div\n" +
    "      ><button class=\"c4\" ng-click=\"searchState='addParam'\">Add Param</button\n" +
    "       </div\n" +
    "    ><div\n" +
    "      class=\"prm\" ng-repeat=\"param in query.params\" >\n" +
    "      <button class=\"rm c2\" ng-click=\"query.removeSearchParam(param)\">×</button\n" +
    "      ><span class=\"lbl\">{{param.name}}</span\n" +
    "      ><select class=\"c4\"\n" +
    "        ng-model=\"param.modifier\"\n" +
    "        ng-options=\"mod for mod in param.modifiers\"></select\n" +
    "      ><select ng-show=\"param.operations.length > 1\"\n" +
    "        class=\"c2\" ng-model=\"param.operation\"\n" +
    "        ng-options=\"op for op in param.operations\"></select\n" +
    "      ><div class=\"c2\" ng-show=\"param.operations.length == 1\"\n" +
    "        style=\"text-align: center;\"> = </div\n" +
    "      ><div class=\"or-vals\"\n" +
    "        ><div clas=\"or-val\" ng-repeat=\"v in param.values\"\n" +
    "          ><div style=\"display:inline-block;\"\n" +
    "            ng-switch=\"param.type\"\n" +
    "            ><div style=\"display: inline-block;\"\n" +
    "              ng-switch-when=\"string\"\n" +
    "              ><div\n" +
    "                ><input ng-model=\"v.value\" class=\"c16\"\n" +
    "                placeholder=\"string\"/>\n" +
    "              </div>\n" +
    "            </div\n" +
    "            ><div style=\"display: inline-block;\"\n" +
    "              ng-switch-when=\"date\"\n" +
    "              ><input ng-model=\"v.value\"\n" +
    "              class=\"c16\"\n" +
    "              placeholder=\"date\"/>\n" +
    "            </div\n" +
    "            ><div style=\"display: inline-block;\"\n" +
    "              ng-switch-when=\"token\"\n" +
    "              ><input class=\"c8\" ng-model=\"v.code\" placeholder=\"code\"/\n" +
    "              ><input class=\"c8\" ng-model=\"v.system\" placeholder=\"system\"/>\n" +
    "            </div\n" +
    "            ><div style=\"display: inline-block;\"\n" +
    "              ng-switch-when=\"number\"\n" +
    "              ><input class=\"c16\" type=\"number\" ng-model=\"v.value\" placeholder=\"number\"/>\n" +
    "            </div\n" +
    "            ><div style=\"display: inline-block;\"\n" +
    "              ng-switch-when=\"reference\"\n" +
    "              ><input class=\"c16\" ng-model=\"v.value\" placeholder=\"reference\"/>\n" +
    "            </div>\n" +
    "          </div\n" +
    "          ><button class=\"c2\"ng-show=\"$index == 0\" ng-click=\"query.addParamValue(param)\">OR</button\n" +
    "          ><button class=\"rm c2\" ng-show=\"$index > 0\" ng-click=\"query.removeParamValue(param, v)\">×</button>\n" +
    "        </div>\n" +
    "      </div\n" +
    "      ><button class=\"c2\" ng-click=\"query.cloneSearchParam(param)\">AND</button>\n" +
    "    </div>\n" +
    "    <div class=\"prm prm-ttl\">\n" +
    "      <div class=\"lbl\"><b>Sort</b></div\n" +
    "      ><button class=\"c4\" ng-click=\"searchState='addSortParam'\">Add Param</button>\n" +
    "    </div\n" +
    "    ><div class=\"prm\" ng-repeat=\"param in query.sort\">\n" +
    "      <button class=\"rm c2\" ng-click=\"query.removeSortParam(param)\">×</button\n" +
    "      ><span class=\"lbl\">{{param.name}}</span\n" +
    "      ><select ng-model=\"param.direction\" class=\"c4\">\n" +
    "        <option>asc</option>\n" +
    "        <option>desc</option>\n" +
    "      </select>\n" +
    "    </div>\n" +
    "    <div class=\"prm prm-ttl\">\n" +
    "      <div class=\"lbl\"><b>Paging</b></div>\n" +
    "    </div>\n" +
    "    <div class=\"prm\">\n" +
    "      <span class=\"llbl\">count</span\n" +
    "      ><input class=\"c4\" ng-model=\"query.count\" type=\"number\" min=\"0\" step=\"1\"/>\n" +
    "    </div>\n" +
    "    <div class=\"prm\">\n" +
    "      <span class=\"llbl\" min=\"0\" step=\"1\">offset</span\n" +
    "      ><input class=\"c4\" ng-model=\"query.offset\" type=\"number\"/>\n" +
    "    </div>\n" +
    "    <div class=\"prm prm-ttl\">\n" +
    "      <div class=\"lbl\"><b>Includes</b></div\n" +
    "      ><button class=\"c4\" ng-click=\"searchState='addRef'\">Add Ref</button>\n" +
    "    </div\n" +
    "    ><div class=\"prm\" ng-repeat=\"param in query.includes\">\n" +
    "      <button class=\"rm c2\" ng-click=\"query.removeInclude(param)\">×</button\n" +
    "      ><div class=\"c16\">{{param.path}}</div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<pre>{{query.toQueryString()}}</pre>\n" +
    "<hr/>\n" +
    "<button ng-click=\"search()\" class=\"btn btn-success\">Search</button>\n" +
    "\n" +
    "<div ng-show=\"showProfile\">\n" +
    "  <p>{{profile.description}}</p>\n" +
    "  <div ng-bind-html=\"profile.text.div\"></div>\n" +
    "  <br/>\n" +
    "  <div class=\"item\" ng-repeat=\"elem in profile.structure[0].element\">\n" +
    "    <b>{{elem.path}}</b>\n" +
    "    {{elem.definition.min}}-{{elem.definition.max}}\n" +
    "    [{{elem.definition.type | profileTypes}}]\n" +
    "    <span class=\"text-muted\">{{elem.definition.short}}</span>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<div ng-hide=\"showProfile\">\n" +
    "  <div class=\"text-muted\"\n" +
    "    ng-show=\"resources.length == 0\">\n" +
    "    Nothing to show :(\n" +
    "  </div>\n" +
    "  <a class=\"item\"\n" +
    "    ng-repeat=\"resource in resources\"\n" +
    "    href=\"{{resource | urlFor}}\">\n" +
    "    <code>{{resource.title}}</code>\n" +
    "    <code>{{resource.id | uuid}}</code>\n" +
    "    <span>LMD: {{resource.published}}</span>\n" +
    "\n" +
    "    <span class=\"pull-right text-muted\">\n" +
    "      Tags:\n" +
    "      <span ng-repeat=\"tag in resource.category\" title=\"{{tag.term}}\"> {{tag.label || tag.term}}; </span>\n" +
    "    </span>\n" +
    "  </a>\n" +
    "</div>\n"
  );


  $templateCache.put('/views/resources/new.html',
    "<div class=\"row\">\n" +
    "  <div class=\"col-xs-8\">\n" +
    "    <textarea style=\"min-height: 1000px;\"\n" +
    "      ui-codemirror=\"{mode: 'javascript', lineWrapping: true, lineNumbers: true, json: true}\"\n" +
    "      ng-model='resource.content'></textarea>\n" +
    "\n" +
    "    <div class=\"btns\">\n" +
    "      <a href=\"#/resources/{{resourceType}}\" class=\"btn btn-default\">Cancel</a>\n" +
    "      <button ng-click=\"save()\" class=\"btn btn-success\">Save</button>\n" +
    "      <button ng-click=\"validate()\" class=\"btn btn-info\">Validate</button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"col-xs-4\">\n" +
    "    <div class=\"well\">\n" +
    "      <h3>Tags <button ng-click=\"clearTags()\" class=\"btn btn-danger pull-right\">Clear</button></h3>\n" +
    "      <hr/>\n" +
    "      <div ng-repeat=\"tag in tags\">\n" +
    "        <input class=\"form-control\" ng-model=\"tag.scheme\" placeholder=\"scheme\"/>\n" +
    "        <input class=\"form-control\" ng-model=\"tag.term\" placeholder=\"term\"/>\n" +
    "        <input class=\"form-control\" ng-model=\"tag.label\" placeholder=\"label\"/>\n" +
    "        <a ng-click=\"removeTag(tag)\">remove</a>\n" +
    "        <hr/>\n" +
    "      </div>\n" +
    "      <hr/>\n" +
    "      <div class=\"btn-group\">\n" +
    "        <button class=\"btn btn-default\" ng-click=\"addTag()\">Add Tag</button>\n" +
    "        <button class=\"btn btn-default\" ng-click=\"addProfile()\">Add Profile</button>\n" +
    "        <button class=\"btn btn-default\" ng-click=\"addSecurity()\">Add Security</button>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('/views/resources/show.html',
    "<div class=\"row\">\n" +
    "  <div class=\"col-xs-8\">\n" +
    "    <h3>ID: {{resource.id}} </h3>\n" +
    "    <textarea\n" +
    "      style=\"min-height: 500px\"\n" +
    "      ui-codemirror=\"{mode: 'javascript', lineWrapping: true, lineNumbers: true, json: true}\"\n" +
    "      ng-model='resource.content'></textarea>\n" +
    "  </div>\n" +
    "  <div class=\"col-xs-4\">\n" +
    "    <div class=\"well\">\n" +
    "      <h3>Tags</h3>\n" +
    "      <hr/>\n" +
    "      <div ng-repeat=\"tag in tags\">\n" +
    "        <input class=\"form-control\" ng-model=\"tag.scheme\" placeholder=\"scheme\"/>\n" +
    "        <input class=\"form-control\" ng-model=\"tag.term\" placeholder=\"term\"/>\n" +
    "        <input class=\"form-control\" ng-model=\"tag.label\" placeholder=\"label\"/>\n" +
    "        <hr/>\n" +
    "      </div>\n" +
    "      <hr/>\n" +
    "      <div class=\"btn-group\">\n" +
    "        <button class=\"btn btn-default\" ng-click=\"addTag()\">Add Tag</button>\n" +
    "        <button class=\"btn btn-default\" ng-click=\"addProfile()\">Add Profile</button>\n" +
    "        <button class=\"btn btn-default\" ng-click=\"addSecurity()\">Add Security</button>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"btns\">\n" +
    "  <button ng-click=\"save()\" class=\"btn btn-success\">Update</button>\n" +
    "  <button ng-click=\"destroy()\" class=\"btn btn-danger\">Destroy</button>\n" +
    "  <button ng-click=\"validate()\" class=\"btn btn-info\">Validate</button>\n" +
    "  <span class=\"btns-div\"></span>\n" +
    "  <button ng-click=\"removeAllTags()\" class=\"btn btn-danger\">Remove All Tags</button>\n" +
    "  <button ng-click=\"affixResourceTags()\" class=\"btn btn-success\" >Affix Tags</button>\n" +
    "</div>\n"
  );


  $templateCache.put('/views/resources/tags.html',
    "<div class=\"row\">\n" +
    "  <h3>Tags</h3>\n" +
    "  <hr/>\n" +
    "  <div ng-repeat=\"tag in tags.category\">\n" +
    "    <pre>{{tag | json}}</pre>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('/views/resources/transaction.html',
    "<div class=\"row\">\n" +
    "  <textarea style=\"min-height: 1000px;\"\n" +
    "    ui-codemirror=\"{mode: 'javascript', lineWrapping: true, lineNumbers: true, json: true}\"\n" +
    "    ng-model='bundle.content'></textarea>\n" +
    "  <div class=\"btns\">\n" +
    "    <a href=\"#/resources/Any\" class=\"btn btn-default\">Cancel</a>\n" +
    "    <button ng-click=\"save()\" class=\"btn btn-success\">Save</button>\n" +
    "  </div>\n" +
    "</div>\n"
  );

}]);
