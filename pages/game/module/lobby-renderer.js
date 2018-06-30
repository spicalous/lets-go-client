import Button from "../../../src/ui/components/button";
import Renderer from "../../../src/module/renderer";

class LobbyRenderer extends Renderer {

  /**
   * @param {Element} parent
   * @param {Object} model
   * @param {Controller} controller
   */
  constructor(parent, model, controller) {
    super(parent, model, controller);

    this._playersContainer = document.createElement("div");
    this._actionContainer = document.createElement("div");

    this._playersContainer.className = "players-container";
    this._actionContainer.className = "action-container";

    this._container.append(this._playersContainer, this._actionContainer);

    this._model.on("players", this._updatePlayers, this);
  }

  /**
   * @param {Object[]} players
   * @param {string} players[].id
   * @param {string} [players[].username]
   */
  _updatePlayers(players) {
    this._playersContainer.innerHTML = "";

    players.forEach((player) => {
      let el = document.createElement("div");
      let username = player.username || "ANONYMOUS";

      el.innerHTML = this._model.leader === player.id ? `${username} *` : username;

      this._playersContainer.append(el);
    });

    if (this._model.isLeader) {
      if (!this._startBtn) {
        this._startBtn = new Button("START GAME").onClick(this._controller.startGame, this._controller);
        this._actionContainer.append(this._startBtn.element());
      }
      this._startBtn.enable(players.length > 1);
    }
  }

  /**
   * @override
   */
  destroy() {

    if (this._startBtn) {
      this._startBtn.destroy();
    }

    this._model.off(this._updatePlayers, this);
    super.destroy();
  }

}

export default LobbyRenderer;