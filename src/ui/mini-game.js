class MiniGame {

  constructor(container, socket) {
    this._container = container;
    this._socket = socket;
    this._onResize = this._onResize.bind(this);
  }

  initListeners() {
    window.addEventListener('resize', this._onResize, false);
  }

  _onResize() {

  }

  destroy() {
    window.removeEventListener('resize', this._onResize, false);
    delete this._socket;
    this._container.innerHTML = '';
    delete this._container;
  }
}

export default MiniGame;