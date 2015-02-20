require("../file_handler");

var include = [
  "ngFileHandler"
];

angular.module("ngFileDropzone", include).directive("ngFileDropzone", 
  ["FileHandler", function(FileHandler) {

  return {
    restrict: "EA",
    scope: {
      files: "=",
    },
    link: function(scope, element, attrs) {
      // required to work with drop
      element.on("dragover", function(evt) {
        evt.preventDefault();
      });

      element.on("drop", FileHandler(scope, element, attrs));
    }
  };
}]);
