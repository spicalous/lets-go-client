import Container from "../../src/ui/container";
import LobbyContainer from "./lobby-container";
import * as MiniGames from "../../mini-games/index";

class GameContainer extends Container {

  constructor(gameId) {
    super();
    this._gameId = gameId;
  }

  startListening(socket) {
    super.startListening(socket);
    
    this._socket.emit('join game', this._gameId, (data) => {
      if (data.error) {
        this.displayError(data.error);
      } else {
        const lobbyContainer = new LobbyContainer();
        lobbyContainer.initDOM(this._container);
        lobbyContainer.setGame(this._socket.id, data);
        lobbyContainer.startListening(this._socket);
        this._socket.on('game start', this._onGameStart.bind(this, lobbyContainer));
      }
    });
  }

  _onGameStart(lobby) {
    lobby.destroy();
    const miniGame = new MiniGames.TugOfWar();
    miniGame.initDOM(this._container);
    miniGame.startListening(this._socket);
    miniGame.start();
  }

}

export default GameContainer;