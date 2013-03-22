// function Configuration(data) {
// }

var fs = require('fs');
var vm = require('vm');
var functions = require('useful-functions.js');
var getValueR = functions.getValueR;
var extend = functions.extend;

// Private vars.
var configuration_is_loaded = false;
var configuration_data = {};

// Public methods.
module.exports.loadFromFilesSync = function() {
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
}

module.exports.get = function(fields) {
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

module.exports.set = function(fields, value) {
	if (typeof fields !== 'string') throw new Error('Argument #1 expects a string.'); 
	return setValueR(fields, configuration_data, value);
}

// Helpers.

// https://github.com/jprichardson/node-field
var setValueR = function(fields, object, value) {

	if (typeof fields !== 'string') throw new Error('Argument #1 expects a string.');
	fields = fields.split(/\./);

	function levelUp (obj, field, value) {
		if (typeof obj[field] !== 'undefined') { // we care about falsey values
			if (fields.length === 0) {
				// var oldVal = obj[field];
				obj[field] = value;
				return value;
			} else {
				if (typeof obj[field] !== 'object') { // we have more fields to go, so we need to replace the current non-object
					obj[field] = {};
				}
				return levelUp(obj[field], fields.shift(), value);
			}
		} else {
			// keep going if necessary
			if (fields.length === 0) {
				obj[field] = value;
				return value;
			} else {
				// var newField = fields.shift()
				obj[field] = {}; // {newField: value}
				return levelUp(obj[field], fields.shift(), value);
			}
		}
	}

	return levelUp(object, fields.shift(), value);

};