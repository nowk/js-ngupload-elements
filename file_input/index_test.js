var assert = require("chai").assert;
var $ = require("jquery");

require("angular");
require("angular-mocks");
require(".");

describe("ngFileInput", function() {
  var doc;
  var scope;

  beforeEach(function() {
    doc = angular.element(document);
    doc.find('body').append("<input type=\"file\" id=\"fileInputID\">");
    angular.mock.module(function($provide) {
      $provide.value('$document', doc);
    });   

    angular.mock.module("ngFileInput");
    angular.mock.inject(function($rootScope) {
      scope = $rootScope.$new();
    });
  });

  it("clicking element fires file input click", inject(function($compile) {
    scope.files = {};

    var ele = $compile("<a href=\"#\" ng-file-input=\"fileInputID\" data-files=\"files\"></a>")(scope);
    var clicked = 0;
    $("#fileInputID", doc).on("click", function() {
      clicked++;
    });
    ele.triggerHandler($.Event("click"));
    assert.equal(clicked, 1);
  }));

  it("fires on file input change", inject(function($compile) {
    scope.files = {};

    var ele = $compile("<a href=\"#\" ng-file-input=\"fileInputID\" data-files=\"files\"></a>")(scope);
    var input = angular.element($("#fileInputID", doc));
    var evt = $.Event("change");
    evt.target = {
      files: [
        {name: "file.txt", size: 1234, type: "text/plain"}
      ]
    };
    input.triggerHandler(evt);
    scope.$digest();
    assert.deepEqual(scope.files, {name: "file.txt", size: 1234, type: "text/plain"});
  }));
});
