var assert = require("chai").assert;
var $ = require("jquery");

require("angular");
require("angular-mocks");
require(".");

describe("FileHandler", function() {
  var scope;

  beforeEach(function() {
    angular.mock.module("ngFileHandler");
    angular.mock.inject(function($rootScope) {
      scope = $rootScope.$new();
    });
  });

  it("assigns to scope if object", inject(function(FileHandler) {
    scope.files = {};

    var evt = $.Event("-");
    evt.dataTransfer = {
      files: [
        {name: "file.txt"}
      ]
    };
    FileHandler(scope, null, null)(evt);
    assert.deepEqual(scope.files, {name: "file.txt"});
  }));

  it("pushes to scope if implements Array's push", inject(function(FileHandler) {
    var files = [];
    scope.files = {
      push: function(obj) {
        files.push(obj);
      }
    };

    var evt = $.Event("-");
    evt.dataTransfer = {
      files: [
        {name: "file1.txt"},
        {name: "file2.txt"}
      ]
    };
    FileHandler(scope, null, null)(evt);
    assert.deepEqual(files, [{name: "file1.txt"}, {name: "file2.txt"}]);
  }));

  it("ignores all but first file when scope is object", inject(function(FileHandler) {
    scope.files = {};

    var evt = $.Event("-");
    evt.dataTransfer = {
      files: [
        {name: "file1.txt"},
        {name: "file2.txt"}
      ]
    };
    FileHandler(scope, null, null)(evt);
    assert.deepEqual(scope.files, {name: "file1.txt"});
  }));
});

describe("FileHandlerProvider", function() {
  beforeEach(function() {
    angular.module("sandbox", ["ngFileHandler"]).config(["FileHandlerProvider", function(FileHandlerProvider) {
      FileHandlerProvider.File = File;
    }]);
    angular.mock.module("sandbox");
  });

  it("wraps the file with the configured constructor", inject(function($rootScope, FileHandler) {
    var scope = $rootScope.$new();
    scope.files = {};

    var evt = $.Event("-");
    evt.dataTransfer = {
      files: [
        {name: "file.txt"}
      ]
    };
    FileHandler(scope, null, null)(evt);
    assert.deepEqual(scope.files, new File({name: "file.txt"}));
  }));
});

function File(file) {
  this.file = file;
}
