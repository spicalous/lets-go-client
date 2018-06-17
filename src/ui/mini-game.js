import Container from './container';

class MiniGame extends Container {

  constructor() {
    super();
    this._onResize = this._onResize.bind(this);
  }

  startListening(socket) {
    super.startListening(socket);
    window.addEventListener('resize', this._onResize, false);
  }

  start() {

  }

  _onResize() {

  }

  destroy() {
    window.removeEventListener('resize', this._onResize, false);
    super.destroy();
  }
}

export default MiniGame;