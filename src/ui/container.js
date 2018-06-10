/**
 * UI container for the index and game page
 */
class Container {

  constructor() {
    this._boundOnDOMContentLoadedFn = this._onDOMContentLoaded.bind(this);
    document.addEventListener('DOMContentLoaded', this._boundOnDOMContentLoadedFn);
  }

  /**
   * Sublcasses can override this hook to operate on DOM.
   * Don't forget to call super._onDOMContentLoaded to remove the event listener!
   * @protected
   */
  _onDOMContentLoaded() {
    document.removeEventListener('DOMContentLoaded', this._boundOnDOMContentLoadedFn);
    delete this._boundOnDOMContentLoadedFn;
  }

  _displayError(message) {
    const containerEl = document.createElement('div');
    containerEl.className = 'error-container';

    const messageEl = document.createElement('div');
    messageEl.className = 'error-message';
    messageEl.innerHTML = message;

    const homeBtnEl = document.createElement('button');  
    homeBtnEl.innerHTML = 'BACK';
    homeBtnEl.setAttribute('type', 'button');
    homeBtnEl.addEventListener('click', () => window.location = `${window.location.origin}`);

    containerEl.append(messageEl);
    containerEl.append(homeBtnEl);

    document.body.append(containerEl);
  }
}

export default Container;