class Factory {

  /**
   * @param {Function} Model
   * @param {Function} Controller
   * @param {Function} Renderer
   */
  constructor(Model, Controller, Renderer) {
    this._Model = Model;
    this._Controller = Controller;
    this._Renderer = Renderer;
  }

  /**
   * @param {Element} parent
   * @param {...*} controllerArgs
   * @returns {Object}
   */
  build(parent, ...controllerArgs) {

    let model = new this._Model();
    let controller = new this._Controller(model, ...controllerArgs);
    let renderer = new this._Renderer(parent, model, controller);

    return {
      /**
       * Expose destructor
       */
      destroy: function() {
        renderer.destroy();
        controller.destroy();
        model.destroy();
      }
    };
  }

  /**
   *
   */
  destroy() {
    delete this._Model;
    delete this._Controller;
    delete this._Renderer;
  }

}

export default Factory;