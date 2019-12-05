import InputHandler from "./input.js"

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3
}

export default class Game {
  constructor(gameWidth, gameHeight){
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gamestate = GAMESTATE.MENU;
    this.gameObjects = [];

    new InputHandler(this);
  }

  start(){
    if(this.gamestate !== GAMESTATE.MENU) return;

    this.gamestate = GAMESTATE.RUNNING;
  }
  update(){
    if(
      this.gamestate === GAMESTATE.PAUSED ||
      this.gamestate === GAMESTATE.MENU ||
      this.gamestate === GAMESTATE.GAMEOVER
    ) return;
  }
  draw(ctx){
    if(this.gamestate === GAMESTATE.PAUSED){
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Paused", this.gameWidth/2, this.gameHeight/2);
    }
    if(this.gamestate === GAMESTATE.MENU){
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Menu", this.gameWidth/2, this.gameHeight/2);
    }
  }
  togglePause(){
    if(this.gameState == GAMESTATE.PAUSED){
      this.gamestate = GAMESTATE.RUNNING;
    } else {
      this.gamestate = GAMESTATE.PAUSED;
    }
  }
}
