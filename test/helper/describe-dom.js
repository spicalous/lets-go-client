/**
 * Helper function to setup up a test container
 *
 * @param {string} name
 * @param {Function} cb
 */
export default function describeDOM(name, cb) {

  describe(name, function() {

    beforeEach(function() {
      this.testContainer = document.createElement('div');
      this.testContainer.setAttribute('id', 'test');
      document.body.append(this.testContainer);
    });

    afterEach(function() {
      document.body.removeChild(this.testContainer);
      assert.lengthOf(document.querySelectorAll('body div'), 0, 'Elements detected in document body. Check for a DOM leak?');
    });

    cb();

  });

}