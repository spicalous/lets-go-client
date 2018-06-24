import MiniGame from "../src/ui/mini-game";

class TugOfWar extends MiniGame {

  constructor(parent, socket) {
    super(parent, socket);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onUpdate = this._onUpdate.bind(this);

    this._scoreEl = document.createElement('div');
    this._displayEl = document.createElement('div');
    this._container.append(this._scoreEl, this._displayEl);
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
    this._displayEl.innerHTML = '';

    let players = Object.keys(state);
    let visualScore = {};
    let total = 0;

    players.forEach((player) => {

      let playerEl = document.createElement('div');
      playerEl.innerHTML = `${player} has ${state[player]} points`;
      this._scoreEl.append(playerEl);

      visualScore[player] = document.createElement('div');
      this._displayEl.append(visualScore[player]);

      total = total + state[player];
    });

    let colours = ['red', 'blue'];

    players.forEach((player, i) => {
      visualScore[player].style = `display: inline-block; height: 300px; width: ${(state[player]/total)*100}%; background-color: ${colours[i]}`;
    });

  }
}

export default TugOfWar;