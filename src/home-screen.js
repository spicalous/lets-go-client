
class HomeScreen {

  constructor(socket) {
    this._socket = socket;
    this._roomContainer = document.querySelector(".room-container");
    this._createButton = document.querySelector("#btn-id-create");

    this._socket.on("game list", this._onGameList.bind(this));
    this._socket.on("game created", this._onGameCreated.bind(this));
    this._createButton.addEventListener("click", this._createGame.bind(this));

    this._socket.emit("get games list");
  }

  _createGame() {
    this._socket.emit("create game");
  }

  _onGameList(gameList) {

    gameList.forEach((game) => {
      let roomListItem = document.createElement("div");
      roomListItem.innerHTML = game.id;
      this._roomContainer.append(roomListItem);
    });
  }

  _onGameCreated(game) {
    window.location = `${window.location}game?id=${game.id}`;
  }
}

export default HomeScreen;