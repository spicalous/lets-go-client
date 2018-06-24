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

    this._onChange = this._onChange.bind(this);
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
   * @param {string} message
   */
  setValidityMessage(message) {

    if (message) {
      this._input.setAttribute("invalid", "");
      this._input.setCustomValidity(message);
    } else {
      this._input.removeAttribute("invalid", "");
      this._input.setCustomValidity("");
    }
  }

  /**
   *
   * @param {Function} handler
   * @param {*} [context]
   * @returns {Button}
   */
  onChange(handler, context) {
    this._handler = handler.bind(context);
    this._input.addEventListener("input", this._onChange, false);
    return this;
  }

  /**
   * @param {InputEvent} event
   */
  _onChange(event) {
    this._handler(event.target.value);
  }

  /**
   *
   */
  destroy() {
    this._input.removeEventListener("input", this._onChange, false);
    this._input.parentNode.removeChild(this._input);
    delete this._input;
  }

}

export default Input;