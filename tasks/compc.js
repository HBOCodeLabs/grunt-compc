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
var async = require('async');

var compcOptions = require('./lib/options');

module.exports = function(grunt) {
	grunt.registerMultiTask('compc', 'A Grunt task plugin to compile Flash SWC files with the `compc` component compiler from the Apache/Adobe Flex SDK.',             function() {
        //--------------------------------------
        //  I/O
        //--------------------------------------
        
		var defaultOptions = compcOptions.getDefaultOptions();
		var options = this.options(defaultOptions);
		var binary = flexSdk.bin.compc;

        //--------------------------------------
        //  Async worker
        //--------------------------------------
        
		var worker = function(files, callback) {
            if (files.dest) {
                options['output'] = files.dest;
            }

			var commandLine = compcOptions.toCommandLine(options);

            if (files.src && files.src.length > 0) {                
                commandLine.push('-include-sources');
                commandLine.push.apply(commandLine, files.src);
                commandLine.push('--');
            }
            
			grunt.verbose.writeln('compc path: ' + binary);
			grunt.verbose.writeln('options: ' + commandLine);
		
			childProcess.execFile(binary, commandLine, function(error, stdout, stderr) {
                grunt.verbose.writeln('output: ' + stdout);
                
				if (error) {
					grunt.log.error(error.toString());
                    
                    if (options.force !== true) {
                        grunt.fail.warn('Compc task has failed.');
                    }                    
				}
                else if (files.dest) {
                    grunt.log.writeln('Build complete: ' + files.dest);
                }
                
                callback(error);
			});
		};
		
        //--------------------------------------
        //  Work queue
        //--------------------------------------
        
		var queue = async.queue(worker, 1);
        queue.drain = this.async();
        queue.push(this.files);
	});
};
