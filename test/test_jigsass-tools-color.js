'use strict';

/* global assert, fs, path, Sassaby,  */

describe('jigsass-tools-color', () => {
  const file = path.resolve(__dirname, 'helpers/importer.scss');
  const sassaby = new Sassaby(file);

  describe('_jigsass-get-adjustment-level [Function]', () => {
    describe('Default steps', () => {
      it('Returns the correct adjustment level with incremental steps', () => {
        sassaby.func('_jigsass-get-adjustment-level')
          .calledWithArgs('lightness, 3')
          .equals('15%');
      });

      it('Returns a maximum of 100%', () => {
        sassaby.func('_jigsass-get-adjustment-level')
          .calledWithArgs('lightness, 20')
          .equals('100%');
      });

      it('Returns a percentage as is', () => {
        sassaby.func('_jigsass-get-adjustment-level')
          .calledWithArgs('lightness, 20%')
          .equals('20%');
      });

      it('Returns the correct adjustment level with explicit steps', () => {
        sassaby.standaloneMixin('jig-test')
          .calledWithBlock(
            '$jigsass-adjustment-steps: (default: 20% 25% 75%) !global;' +
            '.test { content: _jigsass-get-adjustment-level(lightness, 2) }'
          )
          .equals('.test{content: 25%}');
      });

      it(
        'Returns the last defined step when asking for one beyond ' +
        'what\'s defined',
        () =>
      {
        sassaby.standaloneMixin('jig-test')
          .calledWithBlock(
            '$jigsass-adjustment-steps: (default: 20% 25% 75%) !global;' +
            '.test { content: _jigsass-get-adjustment-level(lightness, 6) }'
          )
          .equals('.test{content: 75%}');
      });
    });
    describe('Specific adjustment functions', () => {
      it('Return a value specific to the requested function', () => {
        sassaby.standaloneMixin('jig-test')
          .calledWithBlock(
            '$jigsass-adjustment-steps: (default: 5%, darken: 10%) !global;' +
            '.test { content: _jigsass-get-adjustment-level(darken, 6) }'
          )
          .equals('.test{content: 60%}');
      });
    });
  });

  describe('jigsass-tint [Function]', () => {
    const sassaby = new Sassaby(file, {
      variables: {
        'jigsass-colors': "(black: #000)"
      }
    });

    it('Tints a color', () => {
      sassaby.func('jigsass-tint')
        .calledWithArgs('#000, 20%')
        .equals('#333');
    });

    it('Tints a named color', () => {

      sassaby.func('jigsass-tint')
        .calledWithArgs('black, 20%')
        .equals('#333');
    });

    it('Apply transformations before applying tint', () => {
      sassaby.func('jigsass-tint')
        .calledWithArgs('black (lighten: 1), 20%')
        .equals('#3d3d3d');
    });
  });

  describe('jigsass-shade [Function]', () => {
    const sassaby = new Sassaby(file, {
      variables: {
        'jigsass-colors': '(white: #fff)'
      }
    });

    it('shades a color', () => {
      sassaby.func('jigsass-shade')
        .calledWithArgs('#fff, 20%')
        .equals('#ccc');
    });

    it('Sahdes a named color', () => {
      sassaby.func('jigsass-shade')
        .calledWithArgs('white, 20%')
        .equals('#ccc');
    });

    it('Apply transformations before applying shade', () => {
      sassaby.func('jigsass-shade')
        .calledWithArgs('white (darken: 1), 20%')
        .equals('#c2c2c2');
    });
  });
  describe('jigsass-color [Function]', () => {
    const sassaby = new Sassaby(file, {
      variables: {
        'jigsass-colors': '(' +
          'primary: #09a5d9,' +
          'secondary: #046380,' +
          'tertiary: #9f1626,' +
          'neutral: #2d2d2d,' +
          'light-tertiary: #9f1626 (tint: 2),' +
          'text-link: secondary,' +
          'gutter-rule: secondary (tint: 3),' +
          'headline: primary (shade: 1) complement,' +
        ')'
      }
    });

    it('Returns value of a named color', () => {
      sassaby.func('jigsass-color')
        .calledWithArgs('primary')
        .equals('#09a5d9');
    });

    it('Applies on the fly adjustments', () => {
      sassaby.func('jigsass-color')
        .calledWithArgs('tertiary (tint: 2)')
        .equals('#a92d3c');
    });

    it('Applies adjustments in color functions with one arguments', () => {
      sassaby.func('jigsass-color')
        .calledWithArgs('primary complement')
        .equals('#d93d09');
    });

    it('Applies adjustments in color functions with two arguments', () => {
      sassaby.func('jigsass-color')
        .calledWithArgs('light-tertiary')
        .equals('#a92d3c');
    });

    it('Applies adjustments in color functions with three arguments', () => {
      sassaby.func('jigsass-color')
        .calledWithArgs('primary (mix: #000 10%)')
        .equals('#011116');
    });

    it('Returns value of a named color that references another color', () => {
      sassaby.func('jigsass-color')
        .calledWithArgs('text-link')
        .equals('#046380');
    });

    it('Returns value of a color that adjusts another named color', () => {
      sassaby.func('jigsass-color')
        .calledWithArgs('gutter-rule')
        .equals('#2a7a93');
    });

    it('Applies multiple adjustments', () => {
      sassaby.func('jigsass-color')
        .calledWithArgs('headline')
        .equals('#ce3a09');
    });
  });

  describe('jigsass-set-color [Mixin]', () => {
    const sassaby = new Sassaby(file, {
      variables: {
        'jigsass-colors': '(' +
          'primary: #09a5d9,' +
          'secondary: #046380,' +
          'tertiary: #9f1626,' +
          'neutral: #2d2d2d,' +
          'light-tertiary: #9f1626 (tint: 2),' +
          'text-link: secondary,' +
          'gutter-rule: secondary (tint: 3),' +
          'headline: primary (shade: 1) complement,' +
        ')'
      }
    });

    it('Sets a new color in the palette', () => {
      sassaby.includedMixin('jig-test')
      .calledWithBlock(
         '@include jigsass-set-color(new, red)' +
        'content: inspect($jigsass-colors);'
      )
      .equals(
        'content: (' +
        'primary: #09a5d9,' +
        'secondary: #046380,' +
        'tertiary: #9f1626,' +
        'neutral: #2d2d2d,' +
        'light-tertiary: #9f1626 (tint: 2),' +
        'text-link: secondary,' +
        'gutter-rule: secondary (tint: 3),' +
        'headline: primary (shade: 1) complement,' +
        'new: red)'
      );
    });

    it('Overwrites an existing color in the palette', () => {
      sassaby.includedMixin('jig-test')
      .calledWithBlock(
         '@include jigsass-set-color(primary, red)' +
        'content: inspect($jigsass-colors);'
      )
      .equals(
        'content: (' +
        'primary: red,' +
        'secondary: #046380,' +
        'tertiary: #9f1626,' +
        'neutral: #2d2d2d,' +
        'light-tertiary: #9f1626 (tint: 2),' +
        'text-link: secondary,' +
        'gutter-rule: secondary (tint: 3),' +
        'headline: primary (shade: 1) complement)'
      );
    });
  });
});
