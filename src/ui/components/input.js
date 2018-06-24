class Input {

  /**
   * @param {Object} [options={}]
   * @param {string} [options.className]
   * @param {string} [options.placeholder]
   */
  constructor({ className, placeholder } = {}) {
    this._input = document.createElement("input");
    this._input.setAttribute("type", "text");

    if (className) {
      this._input.className = className;
    }

    if (placeholder) {
      this._input.setAttribute("placeholder", placeholder);
    }
  }

  /**
   * @returns {Element}
   */
  element() {
    return this._input;
  }

  /**
   * @param {string} s
   */
  setValue(s) {
    this._input.value = s;
  }

  /**
   *
   * @param {Function} handler
   * @param {*} [context]
   * @returns {Button}
   */
  onChange(handler, context) {
    this._handler = handler.bind(context);
    this._input.addEventListener("input", this._handler, false);
    return this;
  }

  /**
   *
   */
  destroy() {
    this._input.removeEventListener("input", this._handler, false);
    this._input.parentNode.removeChild(this._input);
    delete this._input;
  }

}

export default Input;