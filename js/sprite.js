export default class Sprite{
  constructor(spriteSheet, rows, cols, width, height, framesPerSecond = 5){
    this.spriteSheet = spriteSheet;
    this.rows = rows;
    this.cols = cols;
    this.width = width;
    this.height = height;
    this.framesPerSecond = framesPerSecond;
    this.timeSinceRedraw = 0
    this.currentAnimation = 0;
    this.currentFrame = 0;
  }
  drawStill(ctx, x, y, scale=1){
    this.currentFrame = 0;
    ctx.drawImage(this.spriteSheet, this.currentFrame*this.width, this.currentAnimation*this.height, this.width, this.height, x, y, this.width*scale, this.height*scale)
  }
  animate(ctx, x, y, scale=1){
    ctx.drawImage(this.spriteSheet, this.currentFrame*this.width, this.currentAnimation*this.height, this.width, this.height, x, y, this.width*scale, this.height*scale)
  }
  update(delta){
    this.timeSinceRedraw += delta;
    if(this.timeSinceRedraw/1000 >= 1/this.framesPerSecond){
      this.currentFrame++
      this.currentFrame %= this.cols;
      this.timeSinceRedraw = 0;
    }
  }
}
