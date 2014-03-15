/*
 * grunt-compc
 * https://github.com/artema/grunt-compc
 *
 * Copyright (c) 2014 Artem Abashev
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        //'<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    clean: {
      compc: ['tmp'],
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
        set1: {
            src: ['test/fixtures/*.as'],
            dest: './tmp/result.swc',
            options: {
                'source-path': ['test/fixtures'] 
            }
        },
        set2: {
            dest: './tmp/result.swc',
            options: {
                'source-path': ['test/fixtures'],
                'include-classes': ['Test1', 'Test2']
            }
        }
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
  grunt.registerTask('test', ['clean', 'compc', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'compc:default'/*, 'test'*/]);

};
