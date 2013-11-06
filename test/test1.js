var configuration = require('./..');
var wru = require('wru');
var inspect = require('util').inspect;

// var setValueR = configuration.setValueR;

wru.test([
	{
		name: "configuration module (files)",
		test: function() {
			var conf = configuration.loadFromFilesSync('test_conf/config-defaults.js', 'test_conf/config.js');
			wru.assert("get value test 1", configuration.get("database") == "db");
			wru.assert("get value test 2", configuration.get("application.title") === "unknown");
			configuration.set("plugins.markdown", true);
			wru.assert("set value test 1", configuration.get("plugins.markdown", true) === true);

			var app = configuration.get('application');
			app.title = "value2";
			wru.assert("protect internal value test", app.title != configuration.get('application.title'));

			wru.assert("conf == configuration", conf == configuration);
		}
	},
	{
		name: "configuration module (files array)",
		test: function() {
			var conf = configuration.loadFromFilesSync(['test_conf/config-defaults.js', 'test_conf/config.js']);
			wru.assert("get value test 1", configuration.get("database") == "db");
			wru.assert("get value test 2", configuration.get("application.title") === "unknown");
			configuration.set("plugins.markdown", true);
			wru.assert("set value test 1", configuration.get("plugins.markdown", true) === true);

			var app = configuration.get('application');
			app.title = "value2";
			wru.assert("protect internal value test", app.title != configuration.get('application.title'));

			wru.assert("conf == configuration", conf == configuration);
		}
	}, {
		name: "plain object",
		test: function() {
			var conf = configuration.loadFromData({
				application: {
					title: "A"
				}
			});
			wru.assert("application.title", conf.get("application.title") == "A");
		}
	}
]);
