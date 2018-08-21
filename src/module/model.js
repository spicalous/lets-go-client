import EventEmitter from "eventemitter3";

class Model extends EventEmitter {

  /**
   * @param {string[]} props
   */
  constructor(props) {
    super();
    let i;

    for (i = 0; i < props.length; i++) {
      this._defineObservableSetter(props[i]);
    }
  }

  /**
   * @param {string} propertyName
   */
  _defineObservableSetter(propertyName) {
    Object.defineProperty(this, propertyName, {
      enumerable: true,
      configurable: true,
      /**
       * @returns {*}
       */
      get() {
        return this[`_${propertyName}`];
      },
      /**
       * @param {*} value
       */
      set(value) {
        this[`_${propertyName}`] = value;
        this.emit(propertyName, value);
      }
    });
  }

  /**
   *
   */
  destroy() {}

}

export default Model;