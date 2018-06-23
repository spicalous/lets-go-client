class Button {

  constructor(text, { className } = { className: "btn-main" }) {
    this._button = document.createElement("button");
    this._button.setAttribute("type", "button");
    this._button.innerHTML = text;
    this._button.className = className;
  }

  /**
   * @returns {Element}
   */
  element() {
    return this._button;
  }

  /**
   *
   * @param {Function} handler
   * @param {*} [context]
   * @returns {Button}
   */
  onClick(handler, context) {
    this._handler = handler.bind(context);
    this._button.addEventListener("click", this._handler, false);
    return this;
  }

  /**
   *
   * @param {boolean} enable
   * @returns {Button}
   */
  enable(enable) {
    if (enable) {
      this._button.removeAttribute("disabled", "");
    } else {
      this._button.setAttribute("disabled", "");
    }
    return this;
  }

  destroy() {
    this._button.removeEventListener("click", this._handler, false);
    this._button.parentNode.removeChild(this._button);
    delete this._button;
  }

}

export default Button;