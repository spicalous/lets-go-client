class Container {

  /**
   * @param {Element} parent
   */
  initDOM(parent) {
    this._container = document.createElement('div');
    this._container.className = this._name;
    parent.append(this._container);
  }

  destroy() {
    if (this._container) {
      this._container.parentElement.removeChild(this._container);
      delete this._container;
    }
  }

}

export default Container;