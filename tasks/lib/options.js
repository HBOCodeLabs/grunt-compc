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
            //compc options
			'output': null,
			'compute-digest': undefined,
			'directory': undefined,
			'include-lookup-only': undefined,
			'include-classes': [],
			'include-file': [],
			'include-namespaces': [],
			'include-sources': [],
			'include-stylesheet': [],
            
            //mcmlc options
            'accessible': undefined,
            'actionscript-file-encoding': undefined,
            'allow-source-path-overlap': undefined,
            'as3': undefined,
            'benchmark': undefined,
            'compress': undefined,
            'context-root': undefined,
            'debug': undefined,
            'debug-password': undefined,
            'define': undefined, //ToDo handle multiple
            'dump-config': undefined,
            'es': undefined,
            'externs': [],
            'external-library-path': [],
            'fonts.advanced-anti-aliasing': undefined,
            'fonts.local-fonts-snapshot': undefined,
            'fonts.languages.language-range': undefined,
            'fonts.managers': [],
            'fonts.max-cached-fonts': undefined,
            'fonts.max-glyphs-per-face': undefined,
            'headless-server': undefined,
            'help ': undefined,
            'include-inheritance-dependencies-only': undefined,
            'include-libraries': [],
            'include-resource-bundles': [],
            'includes': [],
            'incremental': undefined,
            'keep-as3-metadata': [],
            'keep-all-type-selectors': undefined,
            'keep-generated-actionscript': undefined,
            'library-path': [],
            'license': undefined,
            'link-report': undefined,
            'load-config': undefined, //ToDo: handle +=
            'load-externs': [],
            'locale': undefined,
            'mxml.compatibility-version': undefined,
            'mxml.minimum-supported-version': undefined,
            'mxml.qualified-type-selectors': undefined,
            'namespaces.namespace': undefined, //ToDo handle multiple
            'optimize': undefined,
            'omit-trace-statements': undefined,
            'remove-unused-rsls': undefined,
            'resource-bundle-list': [],
            'show-actionscript-warnings': undefined,
            'show-binding-warnings': undefined,
            'show-invalid-css-property-warnings': undefined,
            'show-shadowed-device-font-warnings': undefined,
            'show-unused-type-selector-warnings': undefined,
            'size-report': undefined,
            'source-path': [],
            'strict': undefined,
            'target-player': undefined,
            'tools-locale': undefined,
            'version': undefined,
            'warnings': undefined
		};
	},
	
	toCommandLine: function (options) {
		return Object.keys(options).map(function(key) {
			var value = options[key];

			if (key && value !== undefined) {
				switch (typeof value) {
					case 'boolean':
						if (value)
							return '-' + key + '=' + value;
						break;
					case 'number':
					case 'string':
						return '-' + key + '=' + value;

					default:
						if (value instanceof Array && value.length > 0) {
							return '-' + key + value.reduce(function (res, val) {
								return res + ' ' + val;
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
