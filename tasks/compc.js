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
		var binary = flexSdk.bin.compc;
		
		var worker = function(file, callback) {
			options.output = file.dest;
			
			var commandLine = compcOptions.toCommandLine(options);

			grunt.verbose.writeln('compc path: ' + binary);
			grunt.verbose.writeln('options: ' + commandLine);
		
			childProcess.execFile(binary, commandLine, function(error, stdout, stderr) {
			
				if (error) {
					grunt.log.error(error.toString());
					grunt.verbose.writeln('stdout: ' + stdout);
					grunt.verbose.writeln('stderr: ' + stderr);
					callback(error);
					return;
				}
			
				grunt.log.writeln('Build complete.');
			});
		};
		
		var callback = function (error) {
			//...
		};
		
		for (var i = 0; i < this.files.length; i++) {
			worker(this.files[i], callback);
		}
	});
};
