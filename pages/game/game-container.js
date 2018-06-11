import Container from "../../src/ui/container";

class GameContainer extends Container {

  constructor(socket, gameId) {
    super();
    this._socket = socket;
    this._gameId = gameId;
  }

  initDOM(container) {
    super.initDOM(container);

    this._socket.emit('join game', this._gameId, (data) => {

      if (data.error) {
        this._displayError(data.error);
      } else {
        console.log("TODO!");
      }
    });
  }

}

export default GameContainer;