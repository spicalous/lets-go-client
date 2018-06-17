import 'promise-polyfill/src/polyfill';
import io from 'socket.io-client';
import { extract } from '../../src/util/query-param';
import { onDOMReady } from '../../src/util/dom-ready'
import LobbyContainer from "./lobby-container";
import PopUp from "../../src/ui/components/pop-up";
import * as MiniGames from "../../mini-games/index";

const socket = io(`${window.location.hostname}:3000/game`);
const gameId = extract('id', window.location.search);

onDOMReady(() => {

  socket.emit('join game', gameId, (data) => {
    if (data.error) {
      new PopUp({
        message: data.error,
        actions: [
          {
            name: 'BACK',
            handler: () => window.location = `${window.location.origin}`,
            context: null
          }
        ]
      })
    } else {
      const lobbyContainer = new LobbyContainer(socket);
      lobbyContainer.initDOM(document.body);
      lobbyContainer.setGame(data);
      lobbyContainer.startListening();
      socket.on('game start', onGameStart.bind(null, lobbyContainer));
    }
  });

});

function onGameStart(lobbyContainer) {
    lobbyContainer.destroy();
    const miniGame = new MiniGames.TugOfWar(socket);
    miniGame.initDOM(document.body);
    miniGame.startListening();
    miniGame.start();
}
