/*
 * grunt-compc
 * https://github.com/artema/grunt-compc
 *
 * Copyright (c) 2014 Artem Abashev
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var os = require('os');
  var tempDir = typeof os.tmpdir === 'function' ? os.tmpdir() : os.tmpDir();
    
  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/**/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },
	
	compc: {
        options: {
        },
        default: {
            src: [],
            options: {
                'version': undefined
            }
        },
        test_build: {
            src: ['test/Test1.as'],
            dest: tempDir + '/test_build.swc',
            options: {
                'source-path': ['test'] 
            }
        }
	},

    clean: {
        options: {
            force: true  
        },
        tests: [tempDir + '/**/*.swc'],
    },
                   
    nodeunit: {
        tests: ['test/**/*_test.js']
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'compc', 'nodeunit', 'clean']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);
  grunt.registerTask('travis', ['jshint', 'test']);
};
