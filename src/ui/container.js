class Container {

  initDOM(container) {
    this._container = container;
  }

  startListening(socket) {
    this._socket = socket;
  }    

  displayError(message) {
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
    if (this._socket) {
      this._socket.off();
      delete this._socket;
    }
    if (this._container) {
      this._container.innerHTML = '';
      delete this._container;
    }
  }
}

export default Container;