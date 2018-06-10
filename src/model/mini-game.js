class MiniGame {

  constructor() {

  }

  /**
   * Start the mini game
   */
  start() {

  }

  /**
   * Sets the callback to be called when a winning condition is met
   *
   * @param {Function} fn
   */
  onEnd(fn) {
    this._onEnd = fn;
  }
}

export default MiniGame;