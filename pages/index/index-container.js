import Button from "../../src/ui/components/button";
import Container from "../../src/ui/container";

class IndexContainer extends Container {

  initDOM(parent) {
    super.initDOM(parent);
    let inputContainer = document.createElement('div');
    let actionContainer = document.createElement('div');
    let roomContainer = document.createElement('div');

    inputContainer.className = 'input-container';
    actionContainer.className = 'action-container';
    roomContainer.className = 'room-container';

    this._createInput(inputContainer);
    this._createActions(actionContainer);
    this._createRoomList(roomContainer);

    this._container.append(inputContainer, actionContainer, roomContainer);

    fetch('api/games')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to fetch games');
        }
        return response.json();
      })
      .then(this._handleGamesList.bind(this))
      .catch((error) => {
        console.log(error.message);
      });
  }

  _createInput(container) {
    let label = document.createElement('label');
    let input = document.createElement('input');

    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'ANONYMOUS');

    label.append(input);
    container.append(label);
  }

  _createActions(container) {
    let orEl = document.createElement('div');
    let joinGameEl = document.createElement('div');

    orEl.innerHTML = 'OR';
    joinGameEl.innerHTML = 'JOIN EXISTING GAME';

    this._createButton = new Button('CREATE GAME');
    this._createButton.onClick(this._createGame, this);

    container.append(this._createButton.element(), orEl, joinGameEl);
  }

  _createRoomList(container) {
    this._roomList = document.createElement("div");
    this._roomList.className = "room-list"

    container.append(this._roomList);
  }

  _createGame() {
    fetch('api/games/create', { method: 'POST' })
      .then((response) => response.json())
      .then((game) => this._enterGame(game.id));
  }

  _handleGamesList(gameIds) {

    gameIds.forEach((gameId) => {
      let roomListItem = document.createElement('div');
      roomListItem.innerHTML = gameId;
      roomListItem.className = 'room-item';
      roomListItem.addEventListener('click', this._enterGame.bind(this, gameId, false));
      this._roomList.append(roomListItem);
    });
  }

  _enterGame(gameId) {
    window.location = `${window.location}game?id=${gameId}`;
  }

  destroy() {
    // TODO remove room list event handlers
    this._createButton.destroy();
    super.destroy();
  }

}

export default IndexContainer;