var PackageInstaller = function (pkg) {
  'use strict'

   var _pkg = pkg;   
   pkg.forEach(function(val) {
      if (typeof val !== 'string') {
        throw 'Wrong items type..expected an array of type string'
      }
   });
    

    /**
   * Topological sorting algorithm
   * @param parsed packages
   * @returns sorted array
   */
  var topologicalSort = function(parsePkgToObj) {
    var ordered = {};
    var output = [];
     

    Object.keys(parsePkgToObj).forEach(function(parsedPkg) {
      sortPkg(parsedPkg, []);
    });

    function sortPkg(parsedPkg, parents) {
      if (ordered[parsedPkg]) {
        return;
      }
      parents.push(parsedPkg);
      var pkg_val = parsePkgToObj[parsedPkg];
      pkg_val.forEach(function(dependency) {
        
        sortPkg(dependency, parents);
      });
      ordered[parsedPkg] = true;
      output.push(parsedPkg);
    }

    return output;
  }
      
  /**
   * Function parses array into array of objects and 
   * returns comma separated strings
   */
  var parsePkgToObj = function() {
    var output = {};
    _pkg.forEach(function(pkg_str) {
      var tokens = pkg_str.split(':');
       

      var pkg_val = tokens[0].trim();
      var dependency = tokens[1].trim();

       
      if (!output[pkg_val]) {
        output[pkg_val] = [];
      }
      if (dependency.length > 0  && !output[dependency]) {
        output[dependency] = [];
      }
      if (dependency.length > 0) {
        output[pkg_val].push(dependency);
      }
    });
    return output;
  }

 

  return {
    pkg: _pkg,
    build: function() {
      var parsedPkg = parsePkgToObj();
      return topologicalSort(parsedPkg).join(", ");
    }
  };
};
