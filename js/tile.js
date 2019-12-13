const MAPSIZE = {
  rows: 16,
  cols: 16
}

class Tile {
  constructor(col, row, img=null, type=null){
    this.col = col;
    this.row = row;
    this.img = img;
    this.type = type;
  }
}

export default class TileMap {
  constructor(width, height, text=null){
    this.colSize = width/MAPSIZE.cols;
    this.rowSize = height/MAPSIZE.rows;
    this.tiles = []
    if(this.text){
      this.createFromText(text)
    } else {
      this.createEmpty()
    }
  }
  createEmpty(){
    for(var i=0; i<MAPSIZE.rows; i++){
      for(var j=0; j<MAPSIZE.cols; j++){
        this.tiles.push(new Tile(i, j))
      }
    }
  }
  createFromText(text){

  }
  getCoords(tile){
    let x = tile.col*this.colSize;
    let y = tile.row*this.rowSize;
    return {x: x, y: y};
  }
  getMapLoc(obj){
    let col = Math.floor(obj.x / this.colSize);
    let row = Math.floor(obj.y / this.rowSize);
    return {col: col, row: row}
  }
}
