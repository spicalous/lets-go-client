import * as PIXI from "pixi.js";

let app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight
});

function resize() {
  app.renderer.resize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", resize, false);

document.body.appendChild(app.view);