import Container from "../../src/ui/container";
import Game from "../../src/model/game";
import CursorTracker from "../../mini-games/cursor-tracker";

class GameContainer extends Container {

  constructor(socket, gameId) {
    super();
    this._socket = socket;
    this._gameId = gameId;
  }

  _onDOMContentLoaded() {
    super._onDOMContentLoaded();

    if (Game.isValid(this._gameId)) {

      this._socket.emit('join game', this._gameId, (error) => {

        if (error) {
          this._displayError(error);
        } else {
          let miniGame = new CursorTracker(this._socket);
          miniGame.start();
        }
      });
    } else {
      this._displayError("INVALID GAME ID");
    }
  }

}

export default GameContainer;