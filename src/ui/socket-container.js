import Container from "./container";

class SocketContainer extends Container {

  constructor(socket) {
    super();
    this._socket = socket;
  }

  startListening() {

  }

  destroy() {
    this._socket.off();
    delete this._socket;
    super.destroy();
  }

}

export default SocketContainer;