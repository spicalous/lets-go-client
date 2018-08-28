import Button from "../../../../src/ui/components/button";
import Renderer from "../../../../src/module/renderer";

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
    this._updatePlayersContainer(players);
    this._updateActionsContainer(players);
  }

  /**
   * @param {Object[]} players
   */
  _updatePlayersContainer(players) {
    this._playersContainer.innerHTML = "";

    players.forEach((player) => {
      let el = document.createElement("div");
      let username = player.username || "ANONYMOUS";

      el.innerHTML = this._model.leader === player.id ? `${username} *` : username;

      this._playersContainer.append(el);
    });
  }

  /**
   * @param {Object[]} players
   */
  _updateActionsContainer(players) {
    if (this._model.isLeader) {
      this._removeWaitingInfo();
      this._displayStartBtn();
      this._startBtn.onClick(this._controller.startGame, this._controller);
      this._startBtn.enable(players.length > 1);
    } else {
      this._removeStartBtn();
      this._displayLobbyInfo();
    }
  }

  /**
   *
   */
  _displayLobbyInfo() {
    if (!this._lobbyInfo) {
      this._lobbyInfo = document.createElement("div");
      this._lobbyInfo.className = "lobby-info";
      this._lobbyInfo.innerHTML = "Waiting for leader to start game...";
      this._actionContainer.append(this._lobbyInfo);
    }
  }

  /**
   *
   */
  _removeWaitingInfo() {
    if (this._lobbyInfo) {
      this._actionContainer.removeChild(this._lobbyInfo);
      this._lobbyInfo = null;
    }
  }

  /**
   *
   */
  _displayStartBtn() {
    if (!this._startBtn) {
      this._startBtn = new Button("START GAME");
      this._actionContainer.append(this._startBtn.element());
    }
  }

  /**
   *
   */
  _removeStartBtn() {
    if (this._startBtn) {
      this._startBtn.destroy();
      this._startBtn = null;
    }
  }

  /**
   * @override
   */
  destroy() {
    this._model.off(this._updatePlayers, this);
    this._removeStartBtn();
    this._removeWaitingInfo();
    super.destroy();
  }

}

export default LobbyRenderer;