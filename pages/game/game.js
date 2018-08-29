import "promise-polyfill/src/polyfill";
import io from "socket.io-client";
import { extract } from "../../src/util/query-param";
import { onDOMReady } from "../../src/util/dom-ready";
import PopUp from "../../src/ui/components/pop-up";
import LobbyModel from "./module/lobby/lobby-model";
import LobbyController from "./module/lobby/lobby-controller";
import LobbyRenderer from "./module/lobby/lobby-renderer";
import ModuleFactory from "../../src/module/factory";

const gameId = extract("id", window.location.search);
const username = window.localStorage.getItem("username");
const lobbyFactory = new ModuleFactory(LobbyModel, LobbyController, LobbyRenderer);

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

    const lobby = lobbyFactory.build(document.body, socket);

    socket.on("game start", () => {
      lobby.destroy();
      window.console.log("mini game time");
    });
  });
}