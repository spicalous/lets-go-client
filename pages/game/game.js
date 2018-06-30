import "promise-polyfill/src/polyfill";
import io from "socket.io-client";
import { extract } from "../../src/util/query-param";
import { onDOMReady } from "../../src/util/dom-ready";
import PopUp from "../../src/ui/components/pop-up";
import LobbyModel from "./module/lobby-model";
import LobbyController from "./module/lobby-controller";
import LobbyRenderer from "./module/lobby-renderer";

const gameId = extract("id", window.location.search);
const username = window.localStorage.getItem("username");

onDOMReady(() => {

  joinGame(gameId)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error: " + response.status);
      }
      return response.json();
    })
    .then(handleJoinGame)
    .catch((error) => {
      new PopUp({
        message: error.message,
        actions: [
          {
            name: "BACK",
            handler: () => window.location = `${window.location.origin}`,
            context: null
          }
        ]
      });
    });
});

/**
 * @param {string} id
 * @returns {Promise}
 */
function joinGame(id) {
  return fetch("api/games/join", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ id })
  });
}

/**
 * @param {Response} response
 */
function handleJoinGame(response) {

  if (response.type === "ERROR") {
    throw new Error(response.message);
  }

  const { id } = response;
  const usernameQueryParam = username ? `?username=${username}` : "";
  const socket = io(`${window.location.hostname}:3000/${id}${usernameQueryParam}`);

  socket.on("connect", () => {

    const lobby = createLobby(document.body, socket);

    socket.on("game start", () => {
      lobby.destroy();
      window.console.log("mini game time");
    });
  });
}

/**
 * @param {Element} parent
 * @param {*} socket
 * @returns {Object}
 */
function createLobby(parent, socket) {

  let lobbyModel = new LobbyModel();
  let lobbyController = new LobbyController(lobbyModel, socket);
  let lobbyRenderer = new LobbyRenderer(parent, lobbyModel, lobbyController);

  createLobby.destroy = () => {
    lobbyRenderer.destroy();
    lobbyController.destroy();
    lobbyModel.destroy();
  };

  return createLobby;
}