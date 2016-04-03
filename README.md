# JigSass Tools Color
[![NPM version][npm-image]][npm-url]  [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]   

 > Helpers for using and managing color palettes

Define and access named colors in a central palette

## Installation

Using npm:

```sh
npm i -S jigsass-tools-color
```

## Usage

```scss
@import 'path/to/jigsass-tools-color/scss/index';
```

Start by defining a color palette in the `$jigsass-colors` map.

You may define adjustment on each color by specifing a color function (or functions)
directly in the map:

```scss
$jigsass-colors: (
  // Explicit colors
  black: #000,
  primary: #09a5d9,
  secondary: #046380,
  tertiary: #9f1626,
  neutral: #2d2d2d,

  // Adjustments on explicit colors
  light-tertiary: #9f1626 complement,

  // Aliases
  text-link: secondary,

  // Adjustments to existing colors
  gutter-rule: secondary (tint: 3),

  // Multiple adjustments
  headline: primary (shade: 1) complement,
///   )
```

You can now access colors, using the same [syntax] used for defining them to begin with.

```scss
.foo {
   bar: jigsass-color(black (tint: 20%)); // --> #333
}
```

For consistency, you can define per-color-function adjustment steps 
([documentation](https://txhawks.github.io/jigsass-tools-color/#variable-jigsass-adjustment-steps)):

```scss
$jigsass-adjustment-steps: (
  // Tint will be increamented by 10% at every step
  tint: 10%,
  // Lighten has predefined steps
  lighten: 2% 14% 34% 45%,
  // Used for all color function with no explicitly defined steps
  default: 5%,
);
```

And then access them in the `jigsass-color` function and `$jigsass-colors` map by 
passing a unitless number to the color functions:
```scss
.bar {
  // Tint `black` by two steps
  baz: jigsass-color(black (tint: 2));  // --> #333
}

```

See the [documentation](https://txhawks.github.io/jigsass-tools-color/) for a full
overview of JigSass Color's functionality.

## Development

It is a best practice for JigSass modules to *not* automatically generate css on `@import`, but 
rather have to user explicitly enable the generation of specific styles from the module.

Contributions in the form of pull-requests, issues, bug reports, etc. are welcome.
Please feel free to fork, hack or modify JigSass Tools Color in any way you see fit.

#### Writing documentation

Good documentation is crucial for scalability and maintainability. When contributing,
please do make sure that all Sass functionality (functions, mixins, 
variables and placeholder selectors), is well documented.

Documentation will be auto generated from inline comments using SassDoc
([Documention](http://sassdoc.com/annotations/)).

#### Running tests
`gulp lint` will, well, lint the contents scss files in the `scss` directory.

`gulp test` with run module's test using Mocha and Sassaby.

`gulp tdd` will watch both the Sass files and the test specs for changes, and will
run tests automatically upon them.

#### Writing tests

JigSass Tools Color tests are written using [Sassaby](https://github.com/ryanbahniuk/sassaby)
and Mocha. Spec files are located in the `test` directory.

Mocha allows us to place a call to `before()` in the root of any test file and it 
will be run once, before all the other tests in every `test_*.js` file. 
We can also `require()` files and assign them to the global object to make them 
available to all `test_*.js` files. 

jigsass-tools-color uses a file called `helper.js` can be used to set up mocha 
globals requires and `before()`.

In addition to Sassaby's testing functions, jigsass-tools-color makes a few Sass
functions available to the test suite, for use inside Sassaby tests:

<dl>
  <dt>jig-var-equals($value, $var) -> {boolean}<dt>
  <dd>
		Check if a variable equals a value.<br />
		<strong>$value</strong> {*}: A value to compare the value of $var to.<br />
		<strong>$var</strong> {*}: The variable to test<br />
	</dd>
  <dt>jig-var-type-is($type, $var) -> {boolean}<dt>
  <dd>
		Check if a variable is of a certain type.<br />
		<strong>$type</strong> {string}: A type to compare with the type of $var.<br />
		<strong>$var</strong> {*}: The variable to test<br />
	</dd>
  <dt>jig-map-key-equals($value, $map, $keys...) -> {boolean}<dt>
  <dd>
		Check if a map's key is assigned a cerain value.<br />
		<strong>$value</strong> {*}:  A value to compare the value of a key in $map with.<br />
		<strong>$map</strong> {map}: The map to test.<br />
		<strong>$keys... </strong> {arglist}: A recursive chain of keys.<br />
	</dd>
  <dt>jig-map-key-type-is($type, $map, keys...) -> {boolean}<dt>
  <dd>
		Check if a map's key is of a certain type<br />
		<strong>$type</strong> {string}: A type to compare with the type of $var.<br />
		<strong>$map</strong> {map}: The map to test.<br />
		<strong>$keys... </strong> {arglist}: A recursive chain of keys.<br />
	</dd>
</dl>


## File structure
```bash
┬ ./
│
├─┬ scss/ 
│ └─ index.scss # The module's importable file.
│
├── sassdoc/    # Generated documentation 
│               # of the module's sass features
└─┬─ test/
  │
  ├─┬ helpers/
  │ │
  │ ├── importer.scss       # Used for easilty importing tested scss files
  │ │
  │ └── _test_helpers.scss  # JigSass's assertion helpers,
  │                         # for use inside Sassaby tests.
  │                         
  ├── helper.js              # Used for defining global `before()`
  │                          # functions and requiring modules.
  │                         
  └── test_jigsass-tools-color  # Specs. Mocha will automatically 
                             # run all javascript files located
                             # in the `test` directory.
```

**License:** MIT



[npm-image]: https://badge.fury.io/js/jigsass-tools-color.svg
[npm-url]: https://npmjs.org/package/jigsass-tools-color

[travis-image]: https://travis-ci.org/TxHawks/jigsass-tools-color.svg?branch=master
[travis-url]: https://travis-ci.org/TxHawks/jigsass-tools-color
[daviddm-image]: https://david-dm.org/TxHawks/jigsass-tools-color.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/TxHawks/jigsass-tools-color
[syntax]: https:/www.github.com/txhawks/jigsass-tools-color/#variable-jigsass-colors
