import * as PIXI from "pixi.js";
import io from "socket.io-client";

let app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight
});

function resize() {
  app.renderer.resize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", resize, false);

document.body.appendChild(app.view);

const socketIOURL = `${window.location.hostname}:3000`
const socket = io(socketIOURL);