require("../file_handler");

var include = [
  "ngFileHandler"
];

angular.module("ngFileInput", include).directive("ngFileInput", 
  ["$document", "FileHandler", function($document, FileHandler) {

  return {
    restrict: "EA",
    scope: {
      files: "=",
    },
    link: function(scope, element, attrs) {
      var input = angular.element($document[0].getElementById(attrs.ngFileInput));

      element.on("click", function(evt) {
        evt.preventDefault();
        input[0].click();
      });

      input.on("change", FileHandler(scope, element, attrs));
    }
  };
}]);
