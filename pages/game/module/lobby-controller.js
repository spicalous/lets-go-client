import Controller from "../../../src/module/controller";

class LobbyController extends Controller {

  /**
   * @param {LobbyModel} model
   * @param {*} socket
   */
  constructor(model, socket) {
    super(model);
    this._socket = socket;
    this._updatePlayers = this._updatePlayers.bind(this);

    this._socket.on("players changed", this._updatePlayers);
  }

  /**
   *
   */
  startGame() {
    this._socket.emit("start game");
  }

  /**
   * @param {string} leader
   * @param {Object[]} players
   */
  _updatePlayers(leader, players) {
    this._model.leader = leader;
    this._model.isLeader = this._socket.id === leader;
    this._model.players = players;
  }

  /**
   * @override
   */
  destroy() {
    this._socket.off("players changed", this._updatePlayers);
    super.destroy();
  }
}

export default LobbyController;