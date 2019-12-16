import {GAMESTATE} from "/js/game.js";
let gamepad;
export default class InputHandler {
  constructor(game){
    this.inputStates = {}
    this.game = game
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
          this.inputStates["enter"] = true;
          if(game.gamestate == GAMESTATE.MENU){
            game.start();
          }
          break;
      }

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
        case 13:
          this.inputStates["enter"] = false;
          break;
      }
    });
    let gamePadContainer = document.querySelector('#gamePadStatesContainer');
    this.gamepad;
    window.addEventListener("gamepadconnected", function(event){
      gamepad = event.gamepad
      let index = gamepad.index;
      let id = gamepad.id;
      let nbButtons = gamepad.buttons.length;
      let nbAxes = gamepad.axes.length
      gamePadContainer.innerHTML = "Gamepad No. " + index + " with id " + id + " is connected. It has " + nbButtons + " buttons and " + nbAxes + " axes."
    })
    window.addEventListener("gamepaddisconnected", function(event){
      this.gamepad = event.gamepad;
      let index = gamepad.index;

      gamePadContainer.innerHTML = "Gamepad No. " + index + " has been disconnected.";
    })

  }
  checkAxes(){
    if(!gamepad) return;
    if(!gamepad.connected) return;
    this.inputStates.left = this.inputStates.right = this.inputStates.up = this.inputStates.down = false;
    if(gamepad.axes[0] > 0.5){
      this.inputStates.right = true;
      this.inputStates.left = false;
    }else if(gamepad.axes[0] < -0.5){
      this.inputStates.left = true;
      this.inputStates.right = false
    }
    if(gamepad.axes[1] > 0.5){
      this.inputStates.down = true;
      this.inputStates.up = false;
    }else if(gamepad.axes[1] < -0.5){
      this.inputStates.up = true;
      this.inputStates.down = false
    }
    this.inputStates.angle = Math.atan2(-gamepad.axes[1], gamepad.axes[0])*(180/Math.PI);

  }
  checkButtons(){
    if(gamepad === undefined) return;
    if(!gamepad.connected) return;
    // for(let i = 0; i < gamepad.buttons.length; i++){
      let b = gamepad.buttons;

      if(b[0].pressed){
        this.inputStates["enter"]=true;
        if(this.game.gamestate == GAMESTATE.MENU){
          this.game.start();
        }
      } else {
        this.inputStates["enter"]=true;
      }

      // let buttonText;
      // if(b.pressed){
      //   buttonText = "Button " + i + " is pressed.";
      //   if(b.value !== undefined){
      //     buttonText += " Its value is: " + b.value;
      //   }
        // gamePadContainer.innerHTML = buttonText;
        // console.log(buttonText)
      // }
    // }
  }
  update(){
    let gamepads = navigator.getGamepads();
    for(let i=0; i<gamepads.length; i++){
      if(gamepads[i] !== null){
        gamepad = gamepads[i];
      }
    }

    this.checkAxes();
    this.checkButtons();
  }
};
