import Sprite from '/js/sprite.js';

export default class Player {
  constructor(game, x=0, y=0, width=100, height=100, speed=1){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.scale = 1;
    this.direction = "right";
    this.xSpeed = 0;
    this.ySpeed = 0;
  }
  update(delta, input){
    this.move(input);
    this.sprite.update(delta);
  }
  move(input){
    this.xSpeed = 0;
    this.ySpeed = 0;

    if(input.right){
      this.direction = "right";
      this.xSpeed = this.speed;
      if(this.sprite){
        this.sprite.currentAnimation = 0;
      }
    }
    if(input.left){
      this.direction = "left";
      this.xSpeed = -this.speed;
      if(this.sprite){
        this.sprite.currentAnimation = 1;
      }
    }
    if(input.up){
      this.direction = "up";
      this.ySpeed = -this.speed;
      if(this.sprite){
        this.sprite.currentAnimation = 2;
      }
    }
    if(input.down){
      this.direction = "down";
      this.ySpeed = this.speed;
      if(this.sprite){
        this.sprite.currentAnimation = 3;
      }
    }
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }
  createSprite(spriteSheet, rows, cols, width, height){
    this.scale = this.width / width;
    this.sprite = new Sprite(spriteSheet, rows, cols, width, height);
  }
  draw(ctx, x=this.x, y=this.y){
    if(!this.sprite){
      ctx.strokeStyle = "#FF0000";
      ctx.rect(x, y, this.width, this.height)
    }else{
      if(this.xSpeed == 0 && this.ySpeed == 0){
        this.sprite.drawStill(ctx, x, y, this.scale)
      } else {
        this.sprite.animate(ctx, x, y, this.scale)
      }
    }

  }

}
