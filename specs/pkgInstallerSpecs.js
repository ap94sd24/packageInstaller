describe('Package Installer Test Suite', function() {
    
  it('Package Installer is an object', function() {
    expect(typeof PackageInstaller).toBe('function');
  });


  describe('passes with:', function() {
   	it('A single valid package', function() {
   	  var pkg = ['x:']; 
   	  expect(new PackageInstaller(pkg).build()).toEqual('x'); 
   	}); 

   	it('Packages with words and spaces', function() {
   	  var pkg = [
        'KittenService: CamelCaser', 
        'CamelCaser: '
   	  ];
   	  expect(new PackageInstaller(pkg).build()).toEqual('CamelCaser, KittenService');
   	});

   	it('Longer out of order packages', function() {
      var input = [
        'KittenService: ','Leetmeme: Cyberportal','Cyberportal: Ice','CamelCaser: KittenService',
        'Fraudstream: Leetmeme','Ice: '
      ]; 
    expect(new PackageInstaller(input).build()).toEqual('KittenService, Ice, Cyberportal, Leetmeme, CamelCaser, Fraudstream');  
    });
  });

   describe('fails with:', function() {
     it('A string', function() {
     	expect(function() {
     	  new PackageInstaller('x'); }).toThrow(); 
     });
     it('A number', function() {
     	expect(function() {
     	  new PackageInstaller('5'); }).toThrow(); 
     });
     
    it('An object', function() {
      expect(function() { new PackageInstaller({ x:'y' }); }).toThrow();
    });

    it('null package', function() {
      expect(function() {
      	new PackageInstaller(); }).toThrow(); 
    });  

    it('Contains a cycle', function() {
      expect(function() {
      	var pkgInstaller = PackageInstaller(['x:y', 'y:x']);
      	pkgInstaller.build();
      }).toThrow('contains one or more cycles'); 	
    });

    it('Contains multiple cycles', function() {
      expect(function() {
      	var pkgInstaller = PackageInstaller(['b:a', 'c:b','c:a','a:b']);
      	pkgInstaller.build();
      }).toThrow('contains one or more cycles'); 	
    });
      
  });
});