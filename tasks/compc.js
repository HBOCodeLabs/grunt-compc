/*
 * grunt-compc
 * https://github.com/artema/grunt-compc
 *
 * Copyright (c) 2014 Artem Abashev
 * Licensed under the MIT license.
 */

'use strict';

var childProcess = require('child_process');
var flexSdk = require('flex-sdk');

var compcOptions = require('./lib/options');

module.exports = function(grunt) {
	grunt.registerMultiTask('compc', 'A Grunt task plugin to compile Flash SWC files with the `compc` component compiler from the Apache/Adobe Flex SDK.', function() {
		var defaultOptions = compcOptions.getDefaultOptions();
		var options = this.options(defaultOptions);
	});
};
