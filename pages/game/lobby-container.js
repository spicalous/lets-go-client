import Button from "../../src/ui/components/button";
import SocketContainer from "../../src/ui/socket-container";

class LobbyContainer extends SocketContainer {

  constructor(socket) {
    super(socket);
    this._playerId = socket.id;
    this._updatePlayers = this._updatePlayers.bind(this);
  }

  initDOM(container) {
    super.initDOM(container);
    
    this._playersEl = document.createElement('div');
    this._startBtnContainer = document.createElement('div');
    
    this._container.append(this._playersEl, this._startBtnContainer);
  }

  startListening() {
    this._socket.on('players changed', this._updatePlayers);
  }

  /**
   * 
   * @param {Function} onStart
   * @param {Object} game
   * @param {string} game.id
   * @param {string} game.leader
   * @param {string[]} game.players
   */
  setGame(game) {
    this._updatePlayers(game.leader, game.players);
  }

  /**
   * 
   */
  _startGame() {
    this._socket.emit('start game');
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

    if (leader === this._playerId) {
      if (!this._startBtn) {
        this._startBtn = new Button('START GAME').onClick(this._startGame, this);
        this._startBtnContainer.append(this._startBtn.element());
      } 
      this._startBtn.enable(players.length > 1)
    }
  }

  destroy() {
    if (this._startBtn) {
      this._startBtn.destroy();
    }
    super.destroy();
  }

}

export default LobbyContainer;