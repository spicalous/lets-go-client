import { extract } from "../../../src/util/query-param";

describe("util/query-param", function() {

  describe("extract()", function() {

    it("returns empty str with no value", function() {
      assert.strictEqual(extract("key"), "");
    });

    it("returns empty str when no matching key is found", function() {
      assert.strictEqual(extract("nonMatchingKey", "?key=value"), "");
    });

    it("returns key for value", function() {
      assert.strictEqual(extract("key", "?key=value"), "value");
    });

    it("returns key for value for multiple params", function() {
      assert.strictEqual(extract("keyTwo", "?keyOne=valueOne&keyTwo=valueTwo"), "valueTwo");
    });

    it("does not care if query params have question mark", function() {
      assert.strictEqual(extract("key", "key=value"), "value");
    });

  });
});