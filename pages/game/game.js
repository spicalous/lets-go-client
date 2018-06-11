import 'promise-polyfill/src/polyfill';
import io from 'socket.io-client';
import { extract } from '../../src/util/query-param';
import { onDOMReady } from '../../src/util/dom-ready'
import GameContainer from './game-container';

const socket = io(`${window.location.hostname}:3000/game`);
const gameId = extract('id', window.location.search);

const gameContainer = new GameContainer(gameId);

onDOMReady(() => {
  gameContainer.initDOM(document.body);
  gameContainer.startListening(socket);
})
