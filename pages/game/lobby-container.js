import Button from "../../src/ui/components/button";
import Container from "../../src/ui/container";

class LobbyContainer extends Container {

  constructor() {
    super();
    this._updatePlayers = this._updatePlayers.bind(this);
  }

  initDOM(container) {
    super.initDOM(container);
    
    this._playersEl = document.createElement('div');
    this._startBtnContainer = document.createElement('div');
    
    this._container.append(this._playersEl, this._startBtnContainer);
  }

  startListening(socket) {
    super.startListening(socket);
    this._socket.on('players changed', this._updatePlayers);
  }

  /**
   * 
   * @param {string} playerId
   * @param {Object} game
   * @param {string} game.id
   * @param {string} game.leader
   * @param {string[]} game.players
   */
  setGame(playerId, game) {
    this._playerId = playerId;
    this._updatePlayers(game.leader, game.players);
  }

  /**
   * 
   */
  _startGame() {
    alert('start!');
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

}

export default LobbyContainer;