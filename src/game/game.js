import 'promise-polyfill/src/polyfill';
import io from 'socket.io-client';
import GameScreen from './game-screen';
import ErrorScreen from './error-screen';
import { extract } from '../util/query-param';

const socket = io(`${window.location.hostname}:3000/game`);

function validGameId(id) {
  return typeof id === 'string' && id.length === 36;
}

function onDOMContentLoaded() {
  const gameId = extract('id', window.location.search);

  if (validGameId(gameId)) {

    let gameScreen = new GameScreen(socket);

    gameScreen.onError((message) => {
      new ErrorScreen(message);
    });

    gameScreen.join(gameId);

  } else {
    new ErrorScreen('INVALID GAME ID');
  }

  document.removeEventListener('DOMContentLoaded', onDOMContentLoaded);
}

document.addEventListener('DOMContentLoaded', onDOMContentLoaded);