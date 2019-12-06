import {inputStates, InputHandler} from "./input.js";
import Player from "./player.js";
import Sprite from "./sprite.js"

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
    this.player = new Player(this, gameWidth/2, gameHeight/2);
    let snailImage = document.querySelector('#snailImage');
    this.player.createSprite(snailImage, 4, 4, 40, 40)

    new InputHandler(this);
  }

  start(){
    if(this.gamestate !== GAMESTATE.MENU) return;
    this.gameObjects = [this.player];
    this.gamestate = GAMESTATE.RUNNING;
  }
  update(deltaTime){
    if(
      this.gamestate === GAMESTATE.PAUSED ||
      this.gamestate === GAMESTATE.MENU ||
      this.gamestate === GAMESTATE.GAMEOVER
    ) return;

    this.gameObjects.forEach(object => {
      object.update(deltaTime, inputStates);
    });

  }
  draw(ctx){
    let bgImage = document.querySelector("#spaceBackground");
    ctx.save();
    ctx.translate(this.gameWidth/2, this.gameHeight/2);
    ctx.drawImage(bgImage, 0 -this.player.x, 0 - this.player.y, this.gameWidth, this.gameHeight)
    ctx.drawImage(bgImage, this.gameWidth -this.player.x, 0 - this.player.y, this.gameWidth, this.gameHeight)
    // this.gameObjects.forEach(object => {
    //   object.draw(ctx, object.x, object.y);
    // });
    this.player.draw(ctx, 0 - this.player.width/2, 0 - this.player.width/2);
    ctx.restore();

    console.log("x: " + this.player.x, "y: " + this.player.y)

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
