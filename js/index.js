import {Game} from "./game.js"

//https://lospec.com/palette-list/nyx8
// const colorScheme = [
//  "#08141E", //black
//   "#0F2A3F", //dark
//   "#20394F", //dark-medium cool
//   "#4E495F", //dark-medium warm
//   "#816271", //medium
//   "#997577", //medium-light
//   "#C3A38A", //light
//   "#F6D6BD" //white
// ]

//https://lospec.com/palette-list/pollen8
// const colorScheme = [
//  "#73464c", //black
//   "#ab5675", //dark
//   "#34acba", //dark-medium cool
//   "#ee6a7c", //dark-medium warm
//   "#72dcbb", //medium
//   "#ffa7a5", //medium-light
//   "#ffe07e", //light
//   "#ffe7d6" //white
// ]

//https://lospec.com/palette-list/ammo-8
const colorScheme = [
 "#040c06", //black
  "#112318", //dark
  "#1e3a29", //dark-medium cool
  "#305d42", //dark-medium warm
  "#4d8061", //medium
  "#89a257", //medium-light
  "#bedc7f", //light
  "#eeffcc" //white
]


const font = "DPComic";


let body = document.querySelector("body")
body.style.backgroundColor = colorScheme[4];
body.style.color = colorScheme[1];
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
