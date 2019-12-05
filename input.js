export default class InputHandler {
  constructor(game){
    document.addEventListener("keydown", event => {
      switch(event.keyCode){
        case 27:
          game.togglePause();
          break;

        case 32:
          game.start();
          break;
      }
    });
  }
};
