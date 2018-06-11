import Container from "../../src/ui/container";

class IndexContainer extends  Container {

  constructor() {
    super();
    this._createGame = this._createGame.bind(this);
  }

  initDOM(container) {
    super.initDOM(container);
    this._roomContainer = this._container.querySelector('.room-container');
    this._createButton = this._container.querySelector('#btn-id-create');
    this._createButton.addEventListener('click', this._createGame, false);

    fetch('api/games')
      .then((response) => response.json())
      .then(this._handleGamesList.bind(this));
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
      roomListItem.addEventListener('click', this._enterGame, false);
      this._roomContainer.append(roomListItem);
    });
  }

  _enterGame(gameId) {
    window.location = `${window.location}game?id=${gameId}`;
  }

  destroy() {
    // TODO remove room list event handlers
    this._createButton.removeEventListener('click', this._createGame, false);
    super.destroy();
  }

}

export default IndexContainer;