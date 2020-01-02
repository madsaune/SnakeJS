export default class Fruit {
  constructor(board_w, board_h, board_scale) {
    this.board_w = board_w;
    this.board_h = board_h;
    this.board_scale = board_scale;

    this.x = Math.floor(Math.random() * Math.floor(this.board_w / this.board_scale));
    this.y = Math.floor(Math.random() * Math.floor(this.board_h / this.board_scale));
  }

  update() {
    this.x = Math.floor(Math.random() * Math.floor(this.board_w / this.board_scale));
    this.y = Math.floor(Math.random() * Math.floor(this.board_h / this.board_scale));
  }

  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, 1, 1);
  }
}