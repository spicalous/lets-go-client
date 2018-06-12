import Container from "../../src/ui/container";
import LobbyContainer from "./lobby-container";

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
        lobbyContainer.setGame(data);
        lobbyContainer.startListening(this._socket);
      }
    });
  }

}

export default GameContainer;