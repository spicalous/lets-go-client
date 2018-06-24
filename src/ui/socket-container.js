import Container from "./container";

class SocketContainer extends Container {

  /**
   * @param {Element} parent
   * @param {*} socket
   */
  constructor(parent, socket) {
    super(parent);
    this._socket = socket;
  }

  /**
   *
   */
  startListening() {

  }

  /**
   * @override
   */
  destroy() {
    this._socket.off();
    delete this._socket;
    super.destroy();
  }

}

export default SocketContainer;