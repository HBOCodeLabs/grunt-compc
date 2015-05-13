/*
 * grunt-compc
 * https://github.com/artema/grunt-compc
 *
 * Copyright (c) 2014 Artem Abashev
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var fs = require('fs');
var temp = require('temp').track();
var classesKeyword = '#classes#';
var configTemplate = '<flex-config><include-classes>' + classesKeyword + '</include-classes></flex-config>';
var classNameKeyword = '#className#';
var classTemplate = '<class>' + classNameKeyword + '</class>';
var sepRegExp = new RegExp('\\' + path.sep, 'g');

function fileToClass(sourcePath, file) {
    var ext = path.extname(file);
    var className = path.relative(sourcePath, file);
    className = className.replace(new RegExp('\\' + ext + '$', 'i'), '');
    className = className.replace(sepRegExp, '.');
    return className;
}

module.exports = {
    includeClassesFromFiles: function (sourcePath, files) {
        var classNames = [];
        files.forEach(function (file) {
            classNames.push(fileToClass(sourcePath, file));
        });

        var classes = [];
        classNames.forEach(function (className) {
            var classEntry = classTemplate.replace(classNameKeyword, className);
            classes.push(classEntry);
        });

        var config = configTemplate.replace(classesKeyword, classes.join(''));
        var configPath = temp.openSync({ prefix: 'config.', suffix: '.xml' }).path;
        fs.writeFileSync(configPath, config);

        return configPath;
    }
};
