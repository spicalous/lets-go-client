import Button from './button';

class PopUp {

  /**
   * @param {Object} options
   * @param {string} options.message
   * @param {Object[]} options.actions
   */
  constructor(options) {
    this._popUpEl = document.createElement('div');

    this._createMessageElement(this._popUpEl, options.message);
    this._createActions(this._popUpEl, options.actions);

    document.body.append(this._popUpEl);
  }

  /**
   * @param {Element} container
   * @param {string} message
   */
  _createMessageElement(container, message) {
    let messageEl = document.createElement('div');
    messageEl.innerHTML = message;
    container.append(messageEl);
  }

  /**
   * @param {Element} container
   * @param {Object[]} actions
   */
  _createActions(container, actions) {
    let actionsEl = document.createElement('div');

    this._buttons = actions.map((action) => {
      let button = new Button(action.name);
      button.onClick(this._onDismiss.bind(this, action.handler, action.context), this);
      return button;
    });

    actionsEl.append(...this._buttons.map((button) => button.element()));
    container.append(actionsEl);
  }

  _onDismiss(handler, context) {
    handler.call(context);
    this.destroy();
  }

  destroy() {
    document.body.removeChild(this._popUpEl);
    this._buttons.forEach((button) => button.destroy());
    delete this._popUpEl;
    delete this._buttons;
  }

}

export default PopUp;