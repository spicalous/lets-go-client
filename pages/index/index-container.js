import Button from "../../src/ui/components/button";
import Container from "../../src/ui/container";

class IndexContainer extends Container {

  initDOM(parent) {
    super.initDOM(parent);
    let inputContainer = document.createElement('div');
    let actionContainer = document.createElement('div');
    this._roomContainer = document.createElement('div');

    inputContainer.className = 'input-container';
    actionContainer.className = 'action-container';
    this._roomContainer.className = 'room-container';

    this._createInput(inputContainer);
    this._createActions(actionContainer);

    this._container.append(inputContainer, actionContainer, this._roomContainer);

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

  _createInput(parent) {
    let label = document.createElement('label');
    let input = document.createElement('input');

    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'ANONYMOUS');

    label.append(input);
    parent.append(label);
  }

  _createActions(parent) {
    let orEl = document.createElement('div');
    let joinGameEl = document.createElement('div');

    orEl.innerHTML = 'OR';
    joinGameEl.innerHTML = 'JOIN EXISTING GAME';

    this._createButton = new Button('CREATE GAME');
    this._createButton.onClick(this._createGame, this);

    parent.append(this._createButton.element(), orEl, joinGameEl);
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
      this._roomContainer.append(roomListItem);
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