import chai from 'chai';
import { extract } from '../../src/util/query-param';

describe('util/query-param', () => {

  describe('extract()', () => {

    it('returns empty str with no value', () => {
      chai.assert.strictEqual(extract('key'), '');
    });

    it('returns empty str when no matching key is found', () => {
      chai.assert.strictEqual(extract('nonMatchingKey', '?key=value'), '');
    });

    it('returns key for value', () => {
      chai.assert.strictEqual(extract('key', '?key=value'), 'value');
    });

    it('returns key for value for multiple params', () => {
      chai.assert.strictEqual(extract('keyTwo', '?keyOne=valueOne&keyTwo=valueTwo'), 'valueTwo');
    });

    it('does not care if query params have question mark', () => {
      chai.assert.strictEqual(extract('key', 'key=value'), 'value');
    });

  });
});