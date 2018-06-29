class Controller {

  /**
   * @param {Object} model
   */
  constructor(model) {
    this._model = model;
  }

  /**
   *
   */
  destroy() {
    delete this._model;
  }

}

export default Controller;