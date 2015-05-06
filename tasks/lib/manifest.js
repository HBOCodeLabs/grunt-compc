/*
 * grunt-compc
 * https://github.com/artema/grunt-compc
 *
 * Copyright (c) 2014 Artem Abashev
 * Licensed under the MIT license.
 */

'use strict';

var path = require("path");
var fs = require("fs");
var classNameKeyword = "#className#";
var componentTemplate = "<component class=\"" + classNameKeyword + "\"/>";
var componentsKeyword = "#components#";
var manifestTemplate = "<?xml version=\"1.0\"?><componentPackage>" + componentsKeyword + "</componentPackage>";
var sepRegExp = new RegExp("\\" + path.sep, "g");

function fileToClass(sourcePath, file) {
    var ext = path.extname(file);
    var className = path.relative(sourcePath, file);
    className = className.replace(new RegExp("\\" + ext + "$", "i"), "");
    className = className.replace(sepRegExp, ".");
    return className;
}

module.exports = {
    fromFiles: function (options, files) {
        var classNames = [];
        files.src.forEach(function (file) {
            classNames.push(fileToClass(options["source-path"], file));
        });

        var components = [];
        classNames.forEach(function (className) {
            var component = componentTemplate.replace(classNameKeyword, className);
            components.push(component);
        });

        var manifest = manifestTemplate.replace(componentsKeyword, components.join(""));
        var manifestPath = path.resolve('tmp', 'manifest.xml');
        fs.writeFilesync(manifestPath, manifest);

        return manifestPath;
    }
};
