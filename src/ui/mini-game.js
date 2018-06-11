import Container from './container';

class MiniGame extends Container {

  constructor(socket) {
    super();
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
    super.destroy();
  }
}

export default MiniGame;