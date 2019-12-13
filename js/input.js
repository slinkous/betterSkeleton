import {GAMESTATE} from "/js/game.js";

export default class InputHandler {
  constructor(game){
    this.inputStates = {}
    document.addEventListener("keydown", event => {
      switch(event.keyCode){
        case 37:
          this.inputStates["left"] = true;
          break;
        case 38:
          this.inputStates["up"] = true;
          break;
        case 39:
          this.inputStates["right"] = true;
          break;
        case 40:
          this.inputStates["down"] = true;
          break;
        case 27:
          game.togglePause();
          break;
        case 13:
          // game.start();
          console.log(GAMESTATE)
          if(game.gamestate == GAMESTATE.MENU){
            game.start();
          }
          break;
      }
      this.inputStates[event.keyCode] = true;
    });
    document.addEventListener("keyup", event => {
      switch(event.keyCode){
        case 37:
          this.inputStates["left"] = false;
          break;
        case 38:
          this.inputStates["up"] = false;
          break;
        case 39:
          this.inputStates["right"] = false;
          break;
        case 40:
          this.inputStates["down"] = false;
          break;
      }
    });
  }
};
