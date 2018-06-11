import 'promise-polyfill/src/polyfill';
import { extract } from '../../src/util/query-param';
import io from 'socket.io-client';
import GameContainer from './game-container';

const socket = io(`${window.location.hostname}:3000/game`);
const gameId = extract('id', window.location.search);

new GameContainer(document.body, socket, gameId);