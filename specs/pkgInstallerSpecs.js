 describe('Package Installer Test Suite', function() {
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
   })
 });