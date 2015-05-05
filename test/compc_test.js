'use strict';

var path = require('path');
var fs = require('fs');

exports.compc = {
  test_build: function(test) {
    test.expect(1);

    var result = fs.existsSync(path.join('tmp', 'test_build.swc'));

    test.strictEqual(result, true, 'compiled library should exist');

    test.done();
  }
};
