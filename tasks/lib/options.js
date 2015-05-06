/*
 * grunt-compc
 * https://github.com/artema/grunt-compc
 *
 * Copyright (c) 2014 Artem Abashev
 * Licensed under the MIT license.
 */

'use strict';

module.exports = {
    getDefaultOptions: function () {
        return {
        };
    },

    toCommandLine: function (options) {
        return Object.keys(options)
            .reduce(function (res, key) {
                if (key === 'force' || key === 'useIncludeClasses' ||
                    key === 'externalLibraryPaths' || key === 'defines' ||
                    key === 'flexPath' || key === 'sourcePath') {
                    return res;
                }

                var value = options[key];

                if (value !== undefined) {
                    switch (typeof value) {
                        case 'boolean':
                        case 'number':
                        case 'string':
                            res.push('-' + key + '=' + value);
                            break;

                        default:
                            if (value instanceof Array && value.length > 0) {
                                res.push('-' + key);
                                res.push.apply(res, value);
                            }
                            break;
                    }
                }
                else {
                    res.push('-' + key);
                }

                return res;
            }, []);
    }
};
