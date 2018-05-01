import * as PIXI from "pixi.js";

let app = new PIXI.Application({
  width: 256,
  height: 256,
  antialias: true
});

document.body.appendChild(app.view);