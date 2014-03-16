[![Build Status](https://travis-ci.org/artema/grunt-compc.png)](https://travis-ci.org/artema/grunt-compc)

# grunt-compc

>A Grunt task plugin to compile Flash SWC files with the `compc` component compiler from the Apache/Adobe Flex SDK.

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-compc --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-compc');
```

## The "compc" task

### Overview
In your project's Gruntfile, add a section named `compc` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  compc: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.separator
Type: `String`
Default value: `',  '`

A string value that is used to do something with whatever.

#### options.punctuation
Type: `String`
Default value: `'.'`

A string value that is used to do something else with whatever else.

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
	compc: {
		//Default compc options can be defined here.
		options: {
			'warnings': false
		},
		build: {
			//Files to pass with -include-sources.
			//Can be ommited and replaced with 'include-classes' option.
			src: ['src/**/*.as', 'src/**/*.mxml'], 
			
			//-output value
			dest: 'bin/build.swc',
			
			//All options will be passed as-is and decorated with a leading dash (-).
			//Array values will be passed as separate arguments and should be used for
			//any unsafe values such as file system paths.
			options: {
				'source-path': ['src'],
				
				//Inline options can be declared this way:
				'load-config+=cfg.xml': undefined
				'define=CONFIG::debugging,true': undefined 
			}
		}
	}
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
 - 0.9.0: Initial release on 2014-03-16.
