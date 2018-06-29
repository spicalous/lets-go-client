import Container from "../ui/container";

class Renderer extends Container {

  /**
   * @param {Element} parent
   * @param {Object} model
   * @param {Controller} controller
   */
  constructor(parent, model, controller) {
    super(parent);
    this._model = model;
    this._controller = controller;
  }

  /**
   *
   */
  destroy() {
    delete this._model;
    delete this._controller;
    super.destroy();
  }

}

export default Renderer;