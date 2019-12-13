import {Game} from "./game.js"

const colorScheme = [
 "#08141E", //black
  "#0F2A3F", //dark
  "#20394F", //dark-medium cool
  "#4E495F", //dark-medium warm
  "#816271", //medium
  "#997577", //medium-light
  "#C3A38A", //light
  "#F6D6BD" //white
]
//https://lospec.com/palette-list/nyx8

const font = "DPComic";


let body = document.querySelector("body")
body.style.backgroundColor = colorScheme[2];
body.style.color = colorScheme[5];
body.style.font = "2em " + font;
let meta = document.querySelector("#metaInf")
let colorContainer = document.querySelector("#colorContainer")
meta.append(colorContainer)
let fc = document.querySelector("#fpsContainer");

for(let i = 0; i < colorScheme.length; i++){
  let d = document.createElement("div");
  d.style.width = "64px";
  d.style.height = "64px";
  d.style.backgroundColor = colorScheme[i];
  colorContainer.append(d)
}
meta.append(fc)

let canvas = document.querySelector("#gameCanvas");
let ctx = canvas.getContext("2d");

const GAME_WIDTH = 512;
const GAME_HEIGHT = 512;
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;
let game = new Game(GAME_WIDTH, GAME_HEIGHT);

let lastCount = 0;
let lastRedraw = 0;
let fps = 0;
let frameCount = 0;

function gameLoop(timestamp){
  measureFPS(timestamp);
  let timeSinceRedraw = timestamp - lastRedraw;
  lastRedraw = timestamp;

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  game.update(timeSinceRedraw);
  game.draw(ctx, colorScheme, font);

  requestAnimationFrame(gameLoop);

}

requestAnimationFrame(gameLoop);

function measureFPS(timestamp){
  let deltaTime = timestamp - lastCount;

  if(deltaTime >= 1000){
    fps = frameCount;
    frameCount = 0;
    lastCount = timestamp;
  }
  frameCount++
  fc.innerHTML = "FPS: " + fps
}
