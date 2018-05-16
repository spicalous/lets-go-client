import io from 'socket.io-client';
import GameScreen from './game-screen';

const socket = io(`${window.location.hostname}:3000/game`);

function onDOMContentLoaded() {

  try {
    new GameScreen(socket);
  } catch (e) {
    const body = document.querySelector('body');
    const errorContainer = document.createElement('div');
    const errorMessage = document.createElement('div');
    const homeBtn = document.createElement('button');

    errorContainer.className = 'error-container';
    errorMessage.className = 'error-message';
    errorMessage.innerHTML = e.message;
    homeBtn.setAttribute('type', 'button');
    homeBtn.addEventListener('click', () => window.location = `${window.location.origin}`);
    homeBtn.innerHTML = 'BACK';

    errorContainer.append(errorMessage);
    errorContainer.append(homeBtn);

    body.append(errorContainer);
  }

  document.removeEventListener('DOMContentLoaded', onDOMContentLoaded);
}

document.addEventListener('DOMContentLoaded', onDOMContentLoaded);