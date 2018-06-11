/**
 * UI container for the index and game page
 */
class Container {

  constructor(container) {
    this._container = container;
    this._onDOMContentLoaded = this._onDOMContentLoaded.bind(this);
    document.addEventListener('DOMContentLoaded', this._onDOMContentLoaded, false);
  }

  /**
   * Subclasses can override this hook to operate on DOM.
   * Don't forget to call super._onDOMContentLoaded to remove the event listener!
   * @protected
   */
  _onDOMContentLoaded() {
    document.removeEventListener('DOMContentLoaded', this._onDOMContentLoaded, false);
  }

  _displayError(message) {
    const errorContainerEl = document.createElement('div');
    errorContainerEl.className = 'error-container';

    const messageEl = document.createElement('div');
    messageEl.className = 'error-message';
    messageEl.innerHTML = message;

    const homeBtnEl = document.createElement('button');
    homeBtnEl.innerHTML = 'BACK';
    homeBtnEl.setAttribute('type', 'button');
    homeBtnEl.addEventListener('click', () => window.location = `${window.location.origin}`);

    errorContainerEl.append(messageEl);
    errorContainerEl.append(homeBtnEl);

    this._container.append(errorContainerEl);
  }

  destroy() {
    document.removeEventListener('DOMContentLoaded', this._onDOMContentLoaded, false);
    this._container.innerHTML = '';
    delete this._container;
  }
}

export default Container;