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

  /**
   * 
   * @param {Object} game
   * @param {string} game.id
   * * @param {string} game.leader
   * @param {string[]} game.players
   */
  setGame(game) {
    this._updatePlayers(game.leader, game.players);
  }

  /**
   * 
   * @param {string} leader 
   * @param {string[]} players 
   */
  _updatePlayers(leader, players) {
    this._playersEl.innerHTML = '';
    players.forEach((player) => {
      let el = document.createElement('div');
      el.innerHTML = leader === player ? `${player} *` : player;
      this._playersEl.append(el);
    });
  }

}

export default LobbyContainer;