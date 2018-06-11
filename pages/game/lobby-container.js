import Container from "../../src/ui/container";

class LobbyContainer extends Container {

  constructor() {
    super();
    this._updatePlayers = this._updatePlayers.bind(this);
  }

  initDOM(container) {
    super.initDOM(container);
    // TODO lobby DOM
  }

  startListening(socket) {
    super.startListening(socket);
    this._socket.on('players changed', this._updatePlayers);
  }

  _updatePlayers(players) {
    console.log(players);
  }

}

export default LobbyContainer;