class ErrorScreen {

  constructor(socket) {
    const errorContainer = document.createElement('div');
    const errorMessage = document.createElement('div');
    const homeBtn = document.createElement('button');

    errorContainer.className = 'error-container';
    errorMessage.className = 'error-message';
    errorMessage.innerHTML = message;
    homeBtn.setAttribute('type', 'button');
    homeBtn.addEventListener('click', () => window.location = `${window.location.origin}`);
    homeBtn.innerHTML = 'BACK';

    errorContainer.append(errorMessage);
    errorContainer.append(homeBtn);

    document.body.append(errorContainer);
  }

}

export default ErrorScreen;