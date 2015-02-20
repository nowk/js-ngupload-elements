var assert = require("chai").assert;
var $ = require("jquery");

require("angular");
require("angular-mocks");
require(".");

describe("ngFileDropzone", function() {
  var scope;

  beforeEach(function() {
    angular.mock.module("ngFileDropzone");
    angular.mock.inject(function($rootScope) {
      scope = $rootScope.$new();
    });
  });

  it("fires on file drop", inject(function($compile) {
    scope.files = [];

    var ele = $compile("<div ng-file-dropzone data-files=\"files\"></div>")(scope);
    var evt = $.Event("drop");
    evt.dataTransfer = {
      files: [
        {name: "file1.txt", size: 1234, type: "text/plain"},
        {name: "file2.txt", size: 5678, type: "text/plain"}
      ]
    };
    ele.triggerHandler(evt);
    assert.deepEqual(scope.files, [
      {name: "file1.txt", size: 1234, type: "text/plain"},
      {name: "file2.txt", size: 5678, type: "text/plain"}
    ]);
  }));

  it("prevents default on dragover", inject(function($compile) {
    scope.files = [];

    var ele = $compile("<div ng-file-dropzone data-files=\"files\"></div>")(scope);
    var evt = $.Event("dragover");
    var prevented = false;
    evt.preventDefault = function() {
      prevented = true;
    };
    ele.triggerHandler(evt);
    assert.isTrue(prevented);
  }));
});
