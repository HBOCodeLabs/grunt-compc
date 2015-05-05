/*
 * grunt-compc
 * https://github.com/artema/grunt-compc
 *
 * Copyright (c) 2014 Artem Abashev
 * Licensed under the MIT license.
 */

'use strict';

var childProcess = require('child_process');
var flexSdk = require('@dpwolfe/flex-sdk');
var async = require('async');
var path = require('path');

var compcOptions = require('./lib/options');

module.exports = function(grunt) {
    grunt.registerMultiTask('compc', 'A Grunt task plugin to compile Flash SWC files with the `compc` component ' +
        'compiler from the Apache/Adobe Flex SDK.', function() {
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

            if (options.flexPath) {
                commandLine.push('-compiler.library-path=' + options.flexPath);
            }

            if (options.externalLibraryPaths && options.externalLibraryPaths.length > 0) {
                commandLine.push('-compiler.external-library-path=' + options.externalLibraryPaths[0]);
                var pathsToAppend = options.externalLibraryPaths.slice(1);
                pathsToAppend.forEach(function (lib) {
                    commandLine.push('-compiler.external-library-path+=' + lib);
                });
            }

            if (options.defines && typeof options.defines === 'object') {
                for (var key in options.defines) {
                    if (options.defines.hasOwnProperty(key)) {
                        commandLine.push('-define=' + key + "," + options.defines[key]);
                    }
                }
            }

            if (files.src && files.src.length > 0) {
                if (options.useIncludeClasses) {
                    commandLine.push('-include-classes');
                    files.src.forEach(function (file) {
                        commandLine.push(fileToClass(options["source-path"], file));
                    });
                } else {
                    commandLine.push('-include-sources');
                    commandLine.push.apply(commandLine, files.src);
                }
            }

            grunt.verbose.writeln('compc path: ' + binary);
            grunt.verbose.writeln('options: ' + JSON.stringify(commandLine));

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

    var sepRegExp = new RegExp("\\" + path.sep, "g");
    function fileToClass(sourcePath, file) {
        var ext = path.extname(file);
        var className = path.relative(sourcePath, file);
        className = className.replace(new RegExp("\\" + ext + "$", "i"), "");
        className = className.replace(sepRegExp, ".");
        return className;
    }
};
