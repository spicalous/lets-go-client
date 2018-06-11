import Container from "../../src/ui/container";

class GameContainer extends Container {

  constructor(container, socket, gameId) {
    super(container);
    this._socket = socket;
    this._gameId = gameId;
  }

  _onDOMContentLoaded() {
    super._onDOMContentLoaded();

    this._socket.emit('join game', this._gameId, (data) => {

      if (data.error) {
        this._displayError(data.error);
      } else {
        console.log('implement game lobby', data);
      }
    });
  }

}

export default GameContainer;