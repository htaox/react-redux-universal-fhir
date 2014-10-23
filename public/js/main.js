(function() {
  'use strict';
  var MENU, app, cropId, cropUuid, identity, initTags, keyComparator, pretifyJson, rm,
    __slice = [].slice;

  app = angular.module('fhirface', ['ngCookies', 'ngAnimate', 'ngSanitize', 'ngRoute', 'ui.codemirror', 'ng-fhir'], function($fhirProvider, $routeProvider) {
    $fhirProvider.cors = true;
    $fhirProvider.baseUrl = 'http://localhost:3000';
    return $routeProvider.when('/', {
      templateUrl: '/views/conformance.html',
      controller: 'ConformanceCtrl'
    }).when('/conformance', {
      templateUrl: '/views/conformance.html',
      controller: 'ConformanceCtrl'
    }).when('/resources/Any', {
      templateUrl: '/views/resources/index.html',
      controller: 'IndexCtrl'
    }).when('/resources/Any/history', {
      templateUrl: '/views/resources/history.html',
      controller: 'HistoryCtrl'
    }).when('/resources/Any/tags', {
      templateUrl: '/views/resources/tags.html',
      controller: 'TagsCtrl'
    }).when('/resources/Any/transaction', {
      templateUrl: '/views/resources/transaction.html',
      controller: 'TransactionCtrl'
    }).when('/resources/Any/document', {
      templateUrl: '/views/resources/document.html',
      controller: 'DocumentCtrl'
    }).when('/resources/:resourceType', {
      templateUrl: '/views/resources/index.html',
      controller: 'ResourcesIndexCtrl'
    }).when('/resources/:resourceType/history', {
      templateUrl: '/views/resources/history.html',
      controller: 'ResourcesHistoryCtrl'
    }).when('/resources/:resourceType/tags', {
      templateUrl: '/views/resources/tags.html',
      controller: 'ResourcesTagsCtrl'
    }).when('/resources/:resourceType/new', {
      templateUrl: '/views/resources/new.html',
      controller: 'ResourcesNewCtrl'
    }).when('/resources/:resourceType/:id', {
      templateUrl: '/views/resources/show.html',
      controller: 'ResourceCtrl'
    }).when('/resources/:resourceType/:id/history', {
      templateUrl: '/views/resources/history.html',
      controller: 'ResourceHistoryCtrl'
    }).when('/resources/:resourceType/:id/tags', {
      templateUrl: '/views/resources/tags.html',
      controller: 'ResourceTagsCtrl'
    }).otherwise({
      redirectTo: '/'
    });
  });

  identity = function(x) {
    return x;
  };

  rm = function(x, xs) {
    return xs.splice(xs.indexOf(x), 1);
  };

  app.run(function($rootScope, $fhir, menu) {
    $rootScope.fhir = $fhir;
    return $rootScope.menu = menu;
  });

  cropUuid = function(id) {
    var sid;
    if (!id) {
      return "ups no uuid :(";
    }
    sid = id.substring(id.length - 6, id.length);
    return "..." + sid;
  };

  app.filter('uuid', function() {
    return cropUuid;
  });

  app.filter('urlFor', function() {
    return function(res) {
      var id, parts;
      parts = res.id.split(/\//);
      id = parts[parts.length - 1];
      return "#/resources/" + res.content.resourceType + "/" + id;
    };
  });

  cropId = function(id) {
    var arr;
    if (!id) {
      return "ups no uuid :(";
    }
    arr = id.split('/');
    return arr[arr.length - 1];
  };

  app.filter('id', function() {
    return cropId;
  });

  keyComparator = function(key) {
    return function(a, b) {
      switch (false) {
        case !(a[key] < b[key]):
          return -1;
        case !(a[key] > b[key]):
          return 1;
        default:
          return 0;
      }
    };
  };

  app.filter('profileTypes', function() {
    return function(xs) {
      return (xs || []).map(function(i) {
        if (i.code === 'ResourceReference') {
          return i.profile.split('/').pop();
        } else {
          return i.code;
        }
      }).join(', ');
    };
  });

  app.controller('ConformanceCtrl', function(menu, $scope, $fhir) {
    menu.build({}, 'conformance*');
    return $fhir.metadata(function(data) {
      $scope.resources = [
        {
          type: 'Any'
        }
      ].concat(data.rest[0].resource.sort(keyComparator('type')) || []);
      delete data.rest;
      delete data.text;
      return $scope.conformance = data;
    });
  });

  app.controller('IndexCtrl', function(menu, $fhir, $fhirParams, $fhirSearch, $scope, $routeParams) {
    var rt;
    menu.build($routeParams, 'conformance', 'index_all*', 'transaction', 'document', 'history_all', 'tags_all');
    rt = 'Alert';
    $scope.searchResourceType = rt;
    $scope.searchState = 'search';
    $scope.searchFilter = '';
    $scope.query = {
      searchParam: []
    };
    $scope.addParam = function(p) {
      if ($scope.searchState === 'addSortParam') {
        $scope.query.addSortParam(p);
      }
      if ($scope.searchState === 'addRef') {
        $scope.query.addInclude(p);
      } else {
        $scope.query.addSearchParam(p);
        $scope.searchFilter = '';
      }
      return $scope.searchState = "search";
    };
    $fhir.profile(rt, function(data) {
      $scope.profile = data;
      return $scope.query = $fhirParams(data);
    });
    $scope.typeFilterSearchParams = function(type, filter) {
      return $fhirSearch.typeFilterSearchParams(type, filter);
    };
    return $scope.search = function() {
      return $fhir.search(rt, $scope.query, function(data, s, x, config) {
        $scope.searchUri = config;
        return $scope.resources = data.entry || [];
      });
    };
  });

  app.controller('ResourcesIndexCtrl', function(menu, $fhir, $fhirParams, $fhirSearch, $scope, $routeParams) {
    var rt;
    menu.build($routeParams, 'conformance', 'index*', 'new', 'history_type', 'tags_type');
    rt = $routeParams.resourceType;
    $scope.searchResourceType = rt;
    $scope.searchState = 'search';
    $scope.searchFilter = '';
    $scope.query = {
      searchParam: []
    };
    $scope.addParam = function(p) {
      if ($scope.searchState === 'addSortParam') {
        $scope.query.addSortParam(p);
      }
      if ($scope.searchState === 'addRef') {
        $scope.query.addInclude(p);
      } else {
        $scope.query.addSearchParam(p);
        $scope.searchFilter = '';
      }
      return $scope.searchState = "search";
    };
    $fhir.profile(rt, function(data) {
      $scope.profile = data;
      return $scope.query = $fhirParams(data);
    });
    $scope.typeFilterSearchParams = function(type, filter) {
      return $fhirSearch.typeFilterSearchParams(type, filter);
    };
    return $scope.search = function() {
      return $fhir.search(rt, $scope.query, function(data, s, x, config) {
        $scope.searchUri = config;
        return $scope.resources = data.entry || [];
      });
    };
  });

  initTags = function($scope) {
    var k, mkAdder, s, schemes, _results;
    $scope.tags = [];
    schemes = {
      Security: "http://hl7.org/fhir/tag/security",
      Profile: "http://hl7.org/fhir/tag/profile",
      Tag: "http://hl7.org/fhir/tag/tag"
    };
    $scope.removeTag = function(x) {
      var tags;
      tags = $scope.tags;
      return tags.splice(tags.indexOf(x), 1);
    };
    $scope.clearTags = function() {
      return $scope.tags = [];
    };
    mkAdder = function(schem) {
      return function() {
        return $scope.tags.push({
          scheme: schem
        });
      };
    };
    _results = [];
    for (k in schemes) {
      s = schemes[k];
      _results.push($scope["add" + k] = mkAdder(s));
    }
    return _results;
  };

  app.controller('ResourcesNewCtrl', function(menu, $fhir, $scope, $routeParams, $location) {
    var rt;
    menu.build($routeParams, 'conformance', 'index', 'new*');
    $scope.resource = {};
    initTags($scope);
    rt = $routeParams.resourceType;
    $scope.save = function() {
      var tags;
      tags = $scope.tags.filter(function(i) {
        return i.term;
      });
      return $fhir.create(rt, $scope.resource.content, tags, function() {
        return $location.path("/resources/" + rt);
      });
    };
    return $scope.validate = function() {
      var res, tags;
      res = $scope.resource.content;
      tags = $scope.tags.filter(function(i) {
        return i.term;
      });
      return $fhir.validate(rt, null, null, res, tags);
    };
  });

  pretifyJson = function(str) {
    return angular.toJson(angular.fromJson(str), true);
  };

  app.controller('ResourceCtrl', function(menu, $fhir, $scope, $routeParams, $location) {
    var id, loadResource, rt;
    menu.build($routeParams, 'conformance', 'index', 'show*', 'history', 'tags');
    rt = $routeParams.resourceType;
    id = $routeParams.id;
    initTags($scope);
    loadResource = function() {
      return $fhir.read(rt, id, function(contentLoc, res, tags) {
        $scope.tags = tags;
        $scope.resource = {
          id: id,
          content: pretifyJson(res)
        };
        $scope.resourceContentLocation = contentLoc;
        if (!contentLoc) {
          throw "content location required";
        }
      });
    };
    loadResource();
    $scope.save = function() {
      var cl, res, tags;
      cl = $scope.resourceContentLocation;
      res = $scope.resource.content;
      tags = $scope.tags.filter(function(i) {
        return i.term;
      });
      return $fhir.update(rt, id, cl, res, tags, function(data, status, headers, req) {
        return $scope.resourceContentLocation = headers('content-location');
      });
    };
    $scope.destroy = function() {
      if (window.confirm("Destroy " + $scope.resource.id + "?")) {
        return $fhir["delete"](rt, id, function() {
          return $location.path("/resources/" + rt);
        });
      }
    };
    $scope.removeAllTags = function() {
      return $fhir.removeResourceTags(rt, id, function() {
        return $scope.tags = [];
      });
    };
    $scope.affixResourceTags = function() {
      return $fhir.affixResourceTags(rt, id, $scope.tags, function(tagList) {
        return $scope.tags = tagList.category;
      });
    };
    return $scope.validate = function() {
      var cl, res, tags;
      cl = $scope.resourceContentLocation;
      res = $scope.resource.content;
      tags = $scope.tags.filter(function(i) {
        return i.term;
      });
      return $fhir.validate(rt, id, cl, res, tags);
    };
  });

  app.controller('ResourceHistoryCtrl', function(menu, $fhir, $scope, $routeParams) {
    menu.build($routeParams, 'conformance', 'index', 'show', 'history*');
    return $fhir.history($routeParams.resourceType, $routeParams.id, function(data) {
      $scope.entries = data.entry;
      $scope.history = data;
      return delete $scope.history.entry;
    });
  });

  app.controller('ResourcesHistoryCtrl', function(menu, $fhir, $scope, $routeParams) {
    menu.build($routeParams, 'conformance', 'index', 'history_type*');
    return $fhir.history_type($routeParams.resourceType, function(data) {
      $scope.entries = data.entry;
      $scope.history = data;
      return delete $scope.history.entry;
    });
  });

  app.controller('HistoryCtrl', function(menu, $fhir, $scope, $routeParams) {
    menu.build($routeParams, 'conformance', 'index_all', 'history_all*');
    return $fhir.history_all(function(data) {
      $scope.entries = data.entry;
      $scope.history = data;
      return delete $scope.history.entry;
    });
  });

  app.controller('TagsCtrl', function(menu, $fhir, $scope, $routeParams) {
    menu.build($routeParams, 'conformance', 'index_all', 'tags_all*');
    return $fhir.tags_all(function(data) {
      return $scope.tags = data;
    });
  });

  app.controller('ResourcesTagsCtrl', function(menu, $fhir, $scope, $routeParams) {
    menu.build($routeParams, 'conformance', 'index', 'tags_type*');
    return $fhir.tags_type($routeParams.resourceType, function(data) {
      return $scope.tags = data;
    });
  });

  app.controller('ResourceTagsCtrl', function(menu, $fhir, $scope, $routeParams) {
    menu.build($routeParams, 'conformance', 'index', 'show', 'tags*');
    return $fhir.tags($routeParams.resourceType, $routeParams.id, function(data) {
      return $scope.tags = data;
    });
  });

  app.controller('TransactionCtrl', function(menu, $fhir, $scope, $routeParams, $location) {
    menu.build($routeParams, 'conformance', 'index_all', 'transaction*');
    $scope.bundle = {};
    return $scope.save = function() {
      return $fhir.transaction($scope.bundle.content, function() {
        return $location.path("/resources/Any");
      });
    };
  });

  app.controller('DocumentCtrl', function(menu, $fhir, $scope, $routeParams, $location) {
    menu.build($routeParams, 'conformance', 'index_all', 'document*');
    $scope.bundle = {};
    return $scope.save = function() {
      return $fhir.document($scope.bundle.content, function() {
        return $location.path("/resources/Any");
      });
    };
  });

  cropUuid = function(id) {
    var sid;
    if (!id) {
      return "ups no uuid :(";
    }
    sid = id.substring(id.length - 6, id.length);
    return "..." + sid;
  };

  MENU = {
    conformance: function(p) {
      return {
        url: '/conformance',
        label: 'Conformance'
      };
    },
    index_all: function(p) {
      return {
        url: "/resources/Any",
        label: 'Any'
      };
    },
    history_all: function(p) {
      return {
        url: "/resources/Any/history",
        label: 'History',
        icon: 'fa-history'
      };
    },
    tags_all: function(p) {
      return {
        url: "/resources/Any/tags",
        label: 'Tags',
        icon: 'fa-tags'
      };
    },
    transaction: function(p) {
      return {
        url: "/resources/Any/transaction",
        label: 'Transaction',
        icon: 'fa-th-list'
      };
    },
    document: function(p) {
      return {
        url: "/resources/Any/document",
        label: 'Document',
        icon: 'fa-book'
      };
    },
    index: function(p) {
      return {
        url: "/resources/" + p.resourceType,
        label: p.resourceType
      };
    },
    history_type: function(p) {
      return {
        url: "/resources/" + p.resourceType + "/history",
        label: 'History',
        icon: 'fa-history'
      };
    },
    tags_type: function(p) {
      return {
        url: "/resources/" + p.resourceType + "/tags",
        label: 'Tags',
        icon: 'fa-tags'
      };
    },
    show: function(p) {
      return {
        url: "/resources/" + p.resourceType + "/" + p.id,
        label: cropUuid(p.id)
      };
    },
    history: function(p) {
      return {
        url: "/resources/" + p.resourceType + "/" + p.id + "/history",
        label: 'History',
        icon: 'fa-history'
      };
    },
    tags: function(p) {
      return {
        url: "/resources/" + p.resourceType + "/" + p.id + "/tags",
        label: 'Tags',
        icon: 'fa-tags'
      };
    },
    "new": function(p) {
      return {
        url: "/resources/" + p.resourceType + "/new",
        label: "New",
        icon: "fa-plus"
      };
    }
  };

  angular.module('fhirface').provider('menu', function() {
    return {
      $get: function() {
        var menu,
          _this = this;
        menu = {
          items: [],
          build: function() {
            var items, p, state;
            p = arguments[0], items = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
            state = 'path';
            return menu.items = items.map(function(i) {
              if (i.match(/\*$/)) {
                state = 'end';
                return menu.current = angular.extend({
                  active: true
                }, MENU[i.replace(/\*$/, '')](p));
              } else if (state === 'guess') {
                return angular.extend({
                  guess: true
                }, MENU[i](p));
              } else {
                if (state === 'end') {
                  state = 'guess';
                }
                return MENU[i](p);
              }
            });
          }
        };
        return menu;
      }
    };
  });

}).call(this);
