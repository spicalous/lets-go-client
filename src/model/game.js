/**
 * Represents a game consisting of multiple players and multiple rounds
 */
class Game {

  constructor(socket, noOfRounds) {
    this._socket = socket;
    this._noOfRounds = noOfRounds;
  }

  /**
   * id's are generated on the backend but they should always be 36 characters long
   * @param {*} id
   */
  static isValid(id) {
    return typeof id === 'string' && id.length === 36;
  }

}

export default Game;