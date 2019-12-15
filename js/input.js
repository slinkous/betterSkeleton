import {GAMESTATE} from "/js/game.js";

export default class InputHandler {
  constructor(game){
    this.inputStates = {}
    document.addEventListener("keydown", event => {
      event.preventDefault();
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
          if(game.gamestate == GAMESTATE.MENU){
            game.start();
          }
          break;
      }
      this.inputStates[event.keyCode] = true;
    });
    document.addEventListener("keyup", event => {
      // event.preventDefault();
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
    let gamePadContainer = document.querySelector('#gamePadStatesContainer');

    window.addEventListener("gamepadconnected", function(event){
      this.gamepad = event.gamepad;
      console.log(this.gamepad)
      let index = this.gamepad.index;
      let id = this.gamepad.id;
      let nbButtons = this.gamepad.buttons.length;
      let nbAxes = this.gamepad.axes.length
      gamePadContainer.innerHTML = "Gamepad No. " + index + " with id " + id + " is connected. It has " + nbButtons + " buttons and " + nbAxes + " axes."
    })
    window.addEventListener("gamepaddisconnected", function(event){
      this.gamepad = event.gamepad;
      let index = gamepad.index;

      gamePadContainer.innerHTML = "Gamepad No. " + index + " has been disconnected.";
    })

  }
  checkAxes(){
    if(!this.gamepad) return;
    if(!this.gamepad.connected) return;
    this.inputStates.left = this.inputStates.right = this.inputStates.up = this.inputStates.down = false;
    console.log(this.gamepad.axes)
    // for(var i=0; i<gamepad.axes.length; i++){
    //   var axisValue = gamepad.axes[i];
    // }
    if(this.gamepad.axes[0] > 0.5){
      this.inputStates.right = true;
      this.inputStates.left = false;
    }else if(this.gamepad.axes[0] < -0.5){
      this.inputStates.left = true;
      this.inputStates.right = false
    }
    if(this.gamepad.axes[1] > 0.5){
      this.inputStates.down = true;
      this.inputStates.up = false;
    }else if(this.gamepad.axes[1] < -0.5){
      this.inputStates.up = true;
      this.inputStates.down = false
    }
    this.inputStates.angle = Math.atan2(-this.gamepad.axes[1], this.gamepad.axes[0])*(180/Math.PI);

  }
  update(){
    this.checkAxes();
    // console.log(this.inputStates)
  }
};
