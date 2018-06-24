import SocketContainer from "./socket-container";

class MiniGame extends SocketContainer {

  /**
   * @param {Element} parent
   * @param {*} socket
   */
  constructor(parent, socket) {
    super(parent, socket);
    this._onResize = this._onResize.bind(this);
  }

  /**
   *
   */
  startListening() {
    super.startListening();
    window.addEventListener("resize", this._onResize, false);
  }

  /**
   *
   */
  start() {

  }

  /**
   *
   */
  _onResize() {

  }

  /**
   * @override
   */
  destroy() {
    window.removeEventListener("resize", this._onResize, false);
    super.destroy();
  }
}

export default MiniGame;