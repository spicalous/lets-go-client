import io from "socket.io-client";

const socket = io(`${window.location.hostname}:3000`);

function onCreateGame() {
  socket.emit("create game");
}

window.onload = function() {

  const createButton = document.querySelector("#btn-id-create");

  createButton.addEventListener("click", onCreateGame);
}
