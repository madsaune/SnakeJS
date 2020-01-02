export default class Snake {
  constructor() {
    this.body = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 }
    ];
    this.color = "#000000";
    this.direction = [0, 0];
    this.points = 0;
  }

  update() {
    if (this.body.length > 1) {

      let tail = this.body.pop();

      if (this.direction[0] === 1) {
        tail.x = this.body[0].x + 1;
        tail.y = this.body[0].y;
      } else if (this.direction[1] === 1) {
        tail.x = this.body[0].x;
        tail.y = this.body[0].y + 1;
      } else if (this.direction[0] === -1) {
        tail.x = this.body[0].x - 1;
        tail.y = this.body[0].y;
      } else if (this.direction[1] === -1) {
        tail.x = this.body[0].x;
        tail.y = this.body[0].y - 1;
      }
  
      this.body.unshift(tail);
    } else {
      this.body[0].x += this.direction[0];
      this.body[0].y += this.direction[1];
    }
  }

  changeDirection(direction) {

    if (direction === 'UP') {
      if (this.getDirection() !== 'DOWN') {
        this.direction = [0, -1];
      }
    } else if (direction === 'RIGHT') {
      if (this.getDirection() !== 'LEFT') {
        this.direction = [1, 0];
      }
    } else if (direction === 'DOWN') {
      if (this.getDirection() !== 'UP') {
        this.direction = [0, 1];
      }
    } else if (direction === 'LEFT') {
      if (this.getDirection() !== 'RIGHT') {
        this.direction = [-1, 0];
      }
    } else if (direction === 'STOP') {
      this.direction = [0, 0];
    }
  }

  getDirection() {
    if (this.direction === [0, 0]) {
      return 'STOP';
    } else if (JSON.stringify(this.direction) === JSON.stringify([0, -1])) {
      return 'UP';
    } else if (JSON.stringify(this.direction) === JSON.stringify([1, 0])) {
      return 'RIGHT';
    } else if (JSON.stringify(this.direction) === JSON.stringify([0, 1])) {
      return 'DOWN';
    } else if (JSON.stringify(this.direction) === JSON.stringify([-1, 0])) {
      return 'LEFT';
    } else {
      return false;
    }
  }

  reset() {
    this.body = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 }
    ];

    this.direction = [0, 0];
    this.points = 0;
  }

  eat(fruit) {
    if (this.body[0].x === fruit.x && this.body[0].y === fruit.y) {
      let new_x, new_y;

      if (this.direction[0] === 1) {
        new_x = this.body[this.body.length -1].x + 1;
        new_y = this.body[this.body.length -1].y;
      } else if (this.direction[0] === -1) {
        new_x = this.body[this.body.length -1].x - 1;
        new_y = this.body[this.body.length -1].y;
      } else if (this.direction[1] === 1) {
        new_x = this.body[this.body.length -1].x;
        new_y = this.body[this.body.length -1].y + 1;
      } else if (this.direction[1] === -1) {
        new_x = this.body[this.body.length -1].x;
        new_y = this.body[this.body.length -1].y - 1;
      }

      this.body.push({
        x: new_x,
        y: new_y
      });

      this.points++;
      fruit.update();
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    this.body.forEach((part) => {
      ctx.fillRect(part.x, part.y, 1, 1);
    });
  }
}