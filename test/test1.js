var configuration = require('./..');
var wru = require('wru');
var inspect = require('util').inspect;

// var setValueR = configuration.setValueR;

wru.test([
	{
		name: "configuration module (files)",
		test: function() {
			configuration.loadFromFilesSync('test/test_conf/config-defaults.js', 'test/test_conf/config.js');
			wru.assert("get value test 1", configuration.get("database") == "db");
			wru.assert("get value test 2", configuration.get("application.title") === "unknown");
			configuration.set("plugins.markdown", true);
			wru.assert("set value test 1", configuration.get("plugins.markdown", true) === true);
		}
	}
]);
