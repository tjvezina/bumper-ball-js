import { VIEW_WIDTH } from '../sketch.js';
import Actor from './actor.js';

export const BALL_RADIUS = 24;
const MAX_BALL_SPEED = 1000;

export default class Ball extends Actor {
  static img: p5.Image;

  static preload(): void {
    loadImage('./assets/chrome-ball.png', result => { this.img = result; });
  }

  vel = createVector(0, 0);

  update(): void {
    // TODO: Remove explicit casts when type definitions are fixed
    this.pos.add(p5.Vector.mult(this.vel, deltaTime/1000) as unknown as p5.Vector);

    this.vel.y += 10;
    this.vel.limit(MAX_BALL_SPEED);

    if (this.pos.y - BALL_RADIUS < 0) {
      this.pos.y = BALL_RADIUS;
      this.vel.y *= -1;
    }

    if (this.pos.x - BALL_RADIUS < 0) {
      this.pos.x = BALL_RADIUS;
      this.vel.x *= -1;
    }
    if (this.pos.x + BALL_RADIUS > VIEW_WIDTH) {
      this.pos.x = VIEW_WIDTH - BALL_RADIUS;
      this.vel.x *= -1;
    }
  }

  draw(): void {
    push();
    {
      imageMode(CENTER);
      image(Ball.img, this.pos.x, this.pos.y, BALL_RADIUS*2, BALL_RADIUS*2);
    }
    pop();
  }
}
