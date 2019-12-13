import Game from "./game.js"

const colorScheme = {
  darkest: "#08141E",
  dark: "#0F2A3F",
  darkMedium: "#20394F",
  mediumDark: "#4E495F",
  medium: "#816271",
  mediumLight: "#997577",
  lightMedium: "#C3A38A",
  light: "#F6D6BD"
}

const font = "DPComic";
//https://lospec.com/palette-list/nyx8

let body = document.querySelector("body")
body.style.backgroundColor = colorScheme.darkMedium;
let meta = document.querySelector("#metaInf")

for(let c in colorScheme){
  let d = document.createElement("div");
  d.style.width = "64px";
  d.style.height = "64px";
  d.style.backgroundColor = colorScheme[c];
  meta.append(d)
}

let canvas = document.querySelector("#gameCanvas");
let ctx = canvas.getContext("2d");

const GAME_WIDTH = 512;
const GAME_HEIGHT = 512;
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;
let game = new Game(GAME_WIDTH, GAME_HEIGHT);
let lastTime = 0;
function gameLoop(timestamp){
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  game.update(deltaTime);
  game.draw(ctx, colorScheme, font);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
