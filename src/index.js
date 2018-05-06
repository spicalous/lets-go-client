import * as PIXI from "pixi.js";
import io from "socket.io-client";
import throttle from "lodash/throttle";

const socket = io(`${window.location.hostname}:3000`);
const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight
});
const graphics = new PIXI.Graphics();
app.stage.addChild(graphics);

socket.on('pointer location', function(locations) {

  graphics.clear();
  graphics.beginFill(0xFF3300);

  for (let id in locations) {
    let { x, y } = locations[id];
    graphics.drawCircle(x, y, 5);
  }

  graphics.endFill();
});

function resize() {
  app.renderer.resize(window.innerWidth, window.innerHeight);
}

function emitPointerLocation(event) {
  const { x, y } = event;

  socket.emit('pointer location', { x, y });
}

const throttledEmitPointerLocation = throttle(emitPointerLocation, 100, { trailing: true });

window.addEventListener("resize", resize, false);
window.addEventListener("pointermove", throttledEmitPointerLocation, false);

document.body.appendChild(app.view);
