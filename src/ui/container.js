import { dasherise } from '../util/string';

class Container {

  /**
   * @param {Element} parent
   */
  initDOM(parent) {
    this._container = document.createElement('div');
    this._container.className = dasherise(this.constructor.name);
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