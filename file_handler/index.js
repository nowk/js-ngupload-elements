angular.module("ngFileHandler", []).provider("FileHandler", function() {
  this.File = null;

  var self = this;
  this.$get = function() {
    return FileHandler.bind(null, self.File);
  };
});

function FileHandler(File, scope, element, attrs) {
  return function(evt) {
    evt.preventDefault();

    // dataTransfer for ondrop, target for onchange (file input)
    var files = (evt.dataTransfer || evt.target).files;
    if (files.length === 0) {
      return;
    }

    var i = 0;
    var len = files.length;
    for (; i < len; i++) {
      var file = files[i];
      if ("function" === typeof File) {
        file = new File(file);
      }

      if (isArray(scope.files)) {
        scope.files.push(file);

        continue;
      }
      scope.files = file;

      if (len > 1) {
        // TODO provide some error or notice
      }
      break; // ignore any additional files
    }
  };
}

// isArray checks if an object implements a push function
function isArray(obj) {
  return "function" === typeof obj.push;
}
