import { dasherise } from '../../src/util/string';

describe('util/string', function() {

  describe('dasherise()', function() {

    it('all lowercase', function() {
      assert.strictEqual(dasherise('lowercasestring'), 'lowercasestring');
    });

    it('handles whitespace', function() {
      assert.strictEqual(dasherise('lowercase string'), 'lowercase-string');
    });

    it('class names', function() {
      assert.strictEqual(dasherise('ExampleClassName'), 'example-class-name');
    });

    it('empty string', function() {
      assert.strictEqual(dasherise(''), '');
    });

    it('keeps numbers', function() {
      assert.strictEqual(dasherise('0lowerCase'), '0lower-case');
      assert.strictEqual(dasherise('0LowerCase'), '0-lower-case');
      assert.strictEqual(dasherise('L0owerCase'), 'l0ower-case');
      assert.strictEqual(dasherise('LowerCase0'), 'lower-case0');
    });

    it('works with string that start with lowercase', function() {
      assert.strictEqual(dasherise('lowerCase'), 'lower-case');
    });

  });
});