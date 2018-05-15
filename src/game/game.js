import io from 'socket.io-client';
import GameScreen from './game-screen';

const socket = io(`${window.location.hostname}:3000/game`);

function onDOMContentLoaded() {
  new GameScreen(socket);
  document.removeEventListener('DOMContentLoaded', onDOMContentLoaded);
}

document.addEventListener('DOMContentLoaded', onDOMContentLoaded);