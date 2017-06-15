 var PackageInstaller = function (pkg) {
  'use strict'
  
   //Validates inputs of type strings array
   if (!Array.isArray(pkg)) {
     throw 'expected array of packages';
   }

   if (pkg === null || pkg === undefined) {
     throw 'package needed!'; 
   }
   pkg.forEach(function(pkg_str) {
      if (typeof pkg_str !== 'string') {
        throw 'Wrong items type..expected an array of type string'
      }
   });
    
  var _pkg = pkg;  
    
    /**
   * Function: Topologically sort parsed package objects
   * Inputs: parsed packages
   * Outputs: sorted array
   */
  var topologicalSort = function(parsePkgToObj) {
    let ordered = {};
    let output = [];
     

    Object.keys(parsePkgToObj).forEach(function(parsedPkg) {
      sortPkg(parsedPkg, []);
    });

    function sortPkg(parsedPkg, parents) {
      if (ordered[parsedPkg]) {
        return;
      }
      parents.push(parsedPkg);
      let pkg_val = parsePkgToObj[parsedPkg];
      pkg_val.forEach(function(dependency) {
        if(parents.indexOf(dependency) >= 0) {
          throw 'contains one or more cycles'; 
        }
        
        sortPkg(dependency, parents);
      });
      ordered[parsedPkg] = true;
      output.push(parsedPkg);
    }

    return output;
  }
      
  /**
   * Function: parses array into array of objects and 
   * returns comma separated strings
   */
  var parsePkgToObj = function() {
    let output = {};
    _pkg.forEach(function(pkg_str) {
      let tokens = pkg_str.split(':');
      if (tokens.length !== 2) {
        throw 'unexpected input! --> expected x:y'; 
      }
       

      let pkg_val = tokens[0].trim();
      let dependency = tokens[1].trim();

      if(pkg_val === 0) {
        throw 'unexpected package length! --> expected a package';
      }

       
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
