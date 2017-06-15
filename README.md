# Package-Installer Coding Exercise
By: Ying (Adam) Pan

## Program Details:
 Makes use of topological sort. It takes in an array of packages then uses a dictionary to determine order through topological sort. Note: program make use of ES6 syntaxes.

 ## Exercise Information
 [Package Installer Exercise](/Coding_Exercise-San_Diego)

 ## Running Jasmine
 ```
 1) npm install

 ```
 ```
 2) npm start 
 ```
 ## To run the test through html 
 Create an instance of PackageInstaller and run build() 
 ```javascript
 var package_install = new PackageInstaller(['Foo:Bar']); 
 package_install.build(); // outputs Bar, Foo
