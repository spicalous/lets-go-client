import * as PIXI from "pixi.js";
import io from "socket.io-client";
import throttle from "lodash/throttle";

const MAX_FPS = 1000 / 60;

const socket = io(`${window.location.hostname}:3000`);
const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight
});
const graphics = new PIXI.Graphics();
app.stage.addChild(graphics);

socket.on('pointer location', function(locationsById) {

  graphics.clear();
  graphics.beginFill(0xFF3300);

  for (let id in locationsById) {
    let locations = locationsById[id];
    for (let i = 0; i < locations.length; i++) {
      const { x, y } = locations[i];
      graphics.drawCircle(x, y, 5);
    }
  }

  graphics.endFill();
});

function resize() {
  app.renderer.resize(window.innerWidth, window.innerHeight);
}

function emitPointerLocation(event) {
  const { x, y } = event;

  event.preventDefault();
  socket.emit('pointer location', [{ x, y }]);
}

function emitTouchLocation(event) {
  const locations = [];

  for (let i = 0; i < event.touches.length; i++) {
    const { pageX: x, pageY: y } = event.touches[i];
    locations.push({ x, y });
  }

  event.preventDefault();
  socket.emit('pointer location', locations);
}

const throttledEmitPointerLocation = throttle(emitPointerLocation, MAX_FPS);
const throttledEmitTouchLocation = throttle(emitTouchLocation, MAX_FPS);

app.view.addEventListener("resize", resize, false);
app.view.addEventListener("pointermove", throttledEmitPointerLocation, false);
app.view.addEventListener("touchmove", throttledEmitTouchLocation, false);

document.body.appendChild(app.view);
