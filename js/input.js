export let inputStates = {};

export class InputHandler {
  constructor(game){
    inputStates = {}
    document.addEventListener("keydown", event => {
      switch(event.keyCode){
        case 27:
          game.togglePause();
          break;
        case 32:
          game.start();
          break;
      }
      inputStates[event.keyCode] = true;
    });
    document.addEventListener("keyup", event => {
      inputStates[event.keyCode] = false;
    });
  }
};
