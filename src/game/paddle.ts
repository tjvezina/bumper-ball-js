import InputManager from '../framework/input-manager.js';
import { VIEW_WIDTH } from '../sketch.js';
import Actor from './actor.js';

export const PADDLE_WIDTH = 200;
export const PADDLE_HEIGHT = 31;
const PADDLE_POP_HEIGHT = 20;

export default class Paddle extends Actor {
  static img: p5.Image;

  static preload(): void {
    loadImage('./assets/paddle.png', result => { this.img = result; });
  }

  normalPosY: number;

  constructor(x: number, y: number) {
    super(x, y);
    this.normalPosY = y;

    InputManager.addListener(this);
  }

  dispose(): void {
    InputManager.removeListener(this);
  }

  get isBouncing(): boolean { return this.pos.y !== this.normalPosY; }

  update(): void {
    const { pos, normalPosY } = this;

    pos.x += InputManager.mouseDelta.x;

    if (pos.y < normalPosY) {
      pos.y += 2;
      if (pos.y > normalPosY) {
        pos.y = normalPosY;
      }
    }

    if (pos.x < 0) {
      pos.x = 0;
    }
    if (pos.x > VIEW_WIDTH - PADDLE_WIDTH) {
      pos.x = VIEW_WIDTH - PADDLE_WIDTH;
    }
  }

  mousePressed(): void {
    if (!this.isBouncing) {
      this.pos.y -= PADDLE_POP_HEIGHT;
    }
  }

  draw(): void {
    image(Paddle.img, this.pos.x, this.pos.y, PADDLE_WIDTH, PADDLE_HEIGHT);
  }
}
