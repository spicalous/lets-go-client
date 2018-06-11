import Container from "../../src/ui/container";

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
        console.log("TODO!");
      }
    });
  }

}

export default GameContainer;