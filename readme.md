configuration.js
----------------
Simple configuration management.

### INSTALL
`npm i configuration.js`

### USAGE
First variaint
	var config = require "configuration.js";
	config.loadFromFilesSync(file1 [, file2 [, ...]]);
Where file1, ... fileN are javascript-json files.  
Javascript-json files means json files but comments and non-quoted keys are allowed.

Second variant
	var data = {engine: "sqlite"};
	config.loadFromData(data);

### TODO
- save config file
- write usage section
