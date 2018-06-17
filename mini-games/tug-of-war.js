import MiniGame from "../src/ui/mini-game";

class TugOfWar extends MiniGame {

  constructor(socket) {
    super(socket);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onUpdate = this._onUpdate.bind(this);
  }

  /**
   * @override
   */
  initDOM(container) {
    super.initDOM(container);
    this._scoreEl = document.createElement('div');
    this._container.append(this._scoreEl);
  }

  startListening() {
    super.startListening();
    window.addEventListener('keydown', this._onKeyDown, false);
  }

  start() {
    this._socket.on('game update', this._onUpdate);
  }

  _onKeyDown(event) {
    if (event.key === ' ') {
      this._socket.emit('increment');
    }
  }

  _onUpdate(state) {
    this._scoreEl.innerHTML = '';

    Object.keys(state).forEach((player) => {
      let playerEl = document.createElement('div');
      playerEl.innerHTML = `${player} has ${state[player]} points`;
      this._scoreEl.append(playerEl);
    });
  }
}

export default TugOfWar;