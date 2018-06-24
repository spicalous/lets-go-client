import { dasherise } from "../util/string";

class Container {

  /**
   * @param {Element} parent
   */
  constructor(parent) {
    this._container = document.createElement("div");
    this._container.className = dasherise(this.constructor.name);
    parent.append(this._container);
  }

  /**
   *
   */
  destroy() {
    this._container.parentElement.removeChild(this._container);
    delete this._container;
  }

}

export default Container;