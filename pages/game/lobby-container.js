import Container from "../../src/ui/container";

class LobbyContainer extends Container {

  constructor() {
    super();
    this._updatePlayers = this._updatePlayers.bind(this);
  }

  initDOM(container) {
    super.initDOM(container);
    this._playersEl = document.createElement('div');
    this._container.append(this._playersEl);
  }

  startListening(socket) {
    super.startListening(socket);
    this._socket.on('players changed', this._updatePlayers);
  }

  setPlayers(players) {
    this._playersEl.innerHTML = players.join(", ");
  }

  _updatePlayers(players) {
    this._playersEl.innerHTML = players.join(", ");
  }

}

export default LobbyContainer;