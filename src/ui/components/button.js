class Button {

  constructor(text) {
    this._button = document.createElement('button');
    this._button.setAttribute('type', 'button');
    this._button.innerHTML = text;
  }

  /**
   * @returns {Element}
   */
  element() {
    return this._button;
  }

  /**
   * 
   * @param {Element} container 
   * @returns this;
   */
  appendTo(container) {
    container.append(this._button);
    return this;
  }

  /**
   * 
   * @param {Function} handler 
   * @param {*} [context]
   * @returns this;
   */
  onClick(handler, context) {
    this._handler = handler.bind(context);
    this._button.addEventListener('click', this._handler, false);
    return this;
  }

  /**
   * 
   * @param {boolean} enable 
   * @returns this;
   */
  enable(enable) {
    if (enable) {
      this._button.removeAttribute('disabled', '');  
    } else {
      this._button.setAttribute('disabled', '');
    }
    return this;
  }

  destroy() {
    this._button.removeEventListener('click', this._handler, false);
    this._button.parentNode.removeChild(this._button);
    delete this._button;
  }

}

export default Button;