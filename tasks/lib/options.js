/*
 * grunt-compc
 * https://github.com/artema/grunt-compc
 *
 * Copyright (c) 2014 Artem Abashev
 * Licensed under the MIT license.
 */

'use strict';

module.exports = {
	getDefaultOptions: function () {
		return {
			'output': null,
			'compute-digest': false,
			'directory': false,
			'include-lookup-only': false,
			'include-classes': [],
			'include-file': [],
			'include-namespaces': [],
			'include-sources': [],
			'include-stylesheet': []
		};
	},
	
	toCommandLine: function (options) {
		return Object.keys(options).map(function(key) {
			var value = options[key];

			if (key && value != null) {
				switch (typeof value) {
					case 'boolean':
						if (value)
							return '-' + key + '=' + value;
						break;
					case 'number':
					case 'string':
						return '-' + key + '=' + value;

					default:
						if (value instanceof Array && value.length > 1) {
							return key + ' ' + value.reduce(function (res, val) {
								return '-' + res + ' ' + val;
							});
						}
						break;
			    }
			}

			return undefined;
		})
		.filter(Boolean)
		.join(' ');
	}
};
