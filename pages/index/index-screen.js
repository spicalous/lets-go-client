class IndexScreen {

  constructor() {
    this._roomContainer = document.querySelector('.room-container');
    this._createButton = document.querySelector('#btn-id-create');
    this._createButton.addEventListener('click', this._createGame.bind(this));

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
      roomListItem.addEventListener('click', this._enterGame.bind(null, gameId));
      this._roomContainer.append(roomListItem);
    });
  }

  _enterGame(gameId) {
    window.location = `${window.location}game?id=${gameId}`;
  }
}

export default IndexScreen;