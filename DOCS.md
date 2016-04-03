# JigSass Tools Color
[![NPM version][npm-image]][npm-url]  [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]   

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



**License:** MIT



[npm-image]: https://badge.fury.io/js/jigsass-tools-color.svg
[npm-url]: https://npmjs.org/package/jigsass-tools-color

[travis-image]: https://travis-ci.org/TxHawks/jigsass-tools-color.svg?branch=master
[travis-url]: https://travis-ci.org/TxHawks/jigsass-tools-color
[daviddm-image]: https://david-dm.org/TxHawks/jigsass-tools-color.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/TxHawks/jigsass-tools-color
