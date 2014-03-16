'use strict';

var grunt = require('grunt');
var os = require('os');

exports.compc = {
  setUp: function(done) {
    this.tempDir = os.tmpdir();
    done();
  },
  test_build: function(test) {
    test.expect(1);

    var result = grunt.file.exists(this.tempDir + '/test_build.swc');

    test.strictEqual(result, true, 'compiled library should exist');
      
    test.done();
  }
};
