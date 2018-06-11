import * as PIXI from "pixi.js";
import throttle from "lodash/throttle";
import MiniGame from "../src/ui/mini-game";

const MAX_FPS = 1000 / 60;

class CursorTracker extends MiniGame {

  /**
   * @override
   */
  initDOM(container) {
    super.initDOM(container);
    this._app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight
    });

    this._graphics = new PIXI.Graphics();
    this._app.stage.addChild(this._graphics);

    this._container.appendChild(this._app.view);
  }

  /**
   * @override
   */
  startListening(socket) {
    super.startListening(socket);
    this._throttledEmitPointerLocation = throttle(this._emitPointerLocation.bind(this), MAX_FPS);
    this._throttledEmitTouchLocation = throttle(this._emitTouchLocation.bind(this), MAX_FPS);

    this._app.view.addEventListener('pointermove', this._throttledEmitPointerLocation, false);
    this._app.view.addEventListener('pointerleave', this._emitPointerLeave.bind(this), false);
    this._app.view.addEventListener('touchstart', this._emitTouchLocation.bind(this), false);
    this._app.view.addEventListener('touchmove', this._throttledEmitTouchLocation, false);
    this._app.view.addEventListener('touchend', this._emitTouchLocation.bind(this), false);

    this._socket.on('pointer location', this._plotLocations.bind(this));
  }

  _plotLocations(locationsById) {
    this._graphics.clear();
    this._graphics.beginFill(0xFF3300);

    for (let id in locationsById) {
      let locations = locationsById[id];
      for (let i = 0; i < locations.length; i++) {
        const { x, y } = locations[i];
        this._graphics.drawCircle(x, y, 5);
      }
    }

    this._graphics.endFill();
  }

  _onResize() {
    super._onResize();
    this._app.renderer.resize(window.innerWidth, window.innerHeight);
  }

  _emitPointerLocation(event) {
    const { x, y } = event;
    event.preventDefault();
    this._socket.emit('pointer location', [{ x, y }]);
  }

  _emitPointerLeave(event) {
    event.preventDefault();
    this._socket.emit('pointer location', []);
  }

  _emitTouchLocation(event) {
    const locations = [];

    for (let i = 0; i < event.touches.length; i++) {
      const { pageX: x, pageY: y } = event.touches[i];
      locations.push({ x, y });
    }

    event.preventDefault();
    this._socket.emit('pointer location', locations);
  }

}

export default CursorTracker;