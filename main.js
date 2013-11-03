// function Configuration(data) {
// }

var fs = require('fs');
var vm = require('vm');
var functions = require('useful-functions.js');
var getValueR = functions.getValueR;
var setValueR = functions.setValueR;
var extend = functions.extend;

// Private vars.
var configuration_is_loaded = false;
var configuration_data = {};
var self = {};

module.exports = self;

// Public methods.
self.loadFromFilesSync = function() {
	var sandbox = {};
	for (var i = 0, length = arguments.length; i < length; i++) {
		var file = arguments[i];
		// console.log(__dirname + ' ' + file);
		if (!fs.existsSync(file)) continue;
		var code = fs.readFileSync(file, 'utf8');
		code = 'var data = ' + code;
		vm.runInNewContext(code, sandbox);
		// if (typeof sandbox.data == "undefined") {
		// }
		extend(configuration_data, sandbox.data);
	}
	configuration_is_loaded = true;
	return self;
}

self.get = function(fields) {
	if (!configuration_is_loaded) {
		throw "Configuration data not yet loaded.";
	}
	if (typeof fields !== 'string') throw new Error('Argument #1 expects a string.'); 
	var value = getValueR(fields, configuration_data, null);
	if (value === null || typeof value != "object") {
		return value;
	}
	return extend({}, value);
}

self.set = function(fields, value) {
	if (typeof fields !== 'string') throw new Error('Argument #1 expects a string.'); 
	return setValueR(fields, configuration_data, value);
}
