/**
 * @file SCSS tests.
 * @copyright IBM Security 2020 - 2021
 */

import { compile, forEachImport } from '../../../scripts/scss/compile';

describe('SCSS', () => {
  test('Bundle', () => {
    expect(
      compile('src/globals/build/index.scss')
        .css.toString()
        .replace(/'/g, '"')
    ).toMatchSnapshot();
  });

  describe('Imports', () => {
    forEachImport(file => {
      test(file, () => {
        expect(compile(file)).not.toHaveProperty('message');
      });
    });
  });
});
