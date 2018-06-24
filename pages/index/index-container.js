import Button from "../../src/ui/components/button";
import Input from "../../src/ui/components/input";
import Container from "../../src/ui/container";

class IndexContainer extends Container {

  /**
   * @param {Element} parent
   */
  constructor(parent) {
    super(parent);

    let inputContainer = document.createElement("div");
    let actionContainer = document.createElement("div");
    let roomContainer = document.createElement("div");

    inputContainer.className = "input-container";
    actionContainer.className = "action-container";
    roomContainer.className = "room-container";

    this._createInput(inputContainer);
    this._createActions(actionContainer);
    this._createRoomList(roomContainer);

    this._container.append(inputContainer, actionContainer, roomContainer);

    fetch("api/games")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to fetch games");
        }
        return response.json();
      })
      .then(this._handleGamesList.bind(this));
  }

  /**
   * @param {Element} container
   */
  _createInput(container) {
    let label = document.createElement("label");
    this._input = new Input({ placeholder: "ANONYMOUS" });

    label.append(this._input.element());
    container.append(label);
  }

  /**
   * @param {Element} container
   */
  _createActions(container) {
    let orEl = document.createElement("div");
    let joinGameEl = document.createElement("div");

    orEl.innerHTML = "OR";
    joinGameEl.innerHTML = "JOIN EXISTING GAME";

    this._createButton = new Button("CREATE GAME");
    this._createButton.onClick(this._createGame, this);

    container.append(this._createButton.element(), orEl, joinGameEl);
  }

  /**
   * @param {Element} container
   */
  _createRoomList(container) {
    this._roomList = document.createElement("div");
    this._roomList.className = "room-list";

    container.append(this._roomList);
  }

  /**
   * @param {string[]} gameIds
   */
  _handleGamesList(gameIds) {

    gameIds.forEach((gameId) => {
      let roomListItem = document.createElement("div");
      roomListItem.innerHTML = gameId;
      roomListItem.className = "room-item";
      roomListItem.addEventListener("click", this._enterGame.bind(this, gameId, false));
      this._roomList.append(roomListItem);
    });
  }

  /**
   *
   */
  _createGame() {
    fetch("api/games/create", { method: "POST" })
      .then((response) => response.json())
      .then((game) => this._enterGame(game.id));
  }

  /**
   * @param {string} gameId
   */
  _enterGame(gameId) {
    window.location = `${window.location}game?id=${gameId}`;
  }

  /**
   * @override
   */
  destroy() {
    // TODO remove room list event handlers
    this._input.destroy();
    this._createButton.destroy();
    super.destroy();
  }

}

export default IndexContainer;