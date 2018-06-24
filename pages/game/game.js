import 'promise-polyfill/src/polyfill';
import io from 'socket.io-client';
import { extract } from '../../src/util/query-param';
import { onDOMReady } from '../../src/util/dom-ready'
import LobbyContainer from "./lobby-container";
import PopUp from "../../src/ui/components/pop-up";
import * as MiniGames from "../../mini-games/index";

const gameId = extract('id', window.location.search);

onDOMReady(() => {

  joinGame(gameId)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error: ' + response.status);
      }
      return response.json();
    })
    .then(handleJoinGame)
    .catch((error) => {
      new PopUp({
        message: error.message,
        actions: [
          {
            name: 'BACK',
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
  return fetch('api/games/join', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ id: gameId })
  });
}

function handleJoinGame(response) {

  if (response.type === 'ERROR') {
    new PopUp({
      message: response.message,
      actions: [
        {
          name: 'BACK',
          handler: () => window.location = `${window.location.origin}`,
          context: null
        }
      ]
    });
  } else {
    const { id } = response;
    const socket = io(`${window.location.hostname}:3000/${id}`);

    socket.on('connect', () => {
      const lobbyContainer = new LobbyContainer(document.body, socket);
      lobbyContainer.onGameStart(onGameStart, this);
      lobbyContainer.startListening();
    });
  }
}

function onGameStart(socket, lobbyContainer) {
    lobbyContainer.destroy();
    const miniGame = new MiniGames.TugOfWar(document.body, socket);
    miniGame.startListening();
    miniGame.start();
}