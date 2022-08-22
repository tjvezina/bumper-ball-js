import Actor from './actor.js';

export const PEG_RADIUS = 32;

export default class Peg extends Actor {
  static imgList: p5.Image[] = [];

  static preload(): void {
    loadImage('./assets/peg.png', result => { this.imgList[0] = result; });
    loadImage('./assets/peg-cracked-1.png', result => { this.imgList[1] = result; });
    loadImage('./assets/peg-cracked-2.png', result => { this.imgList[2] = result; });
  }

  col = color(255);
  type: number;
  health: number;

  constructor(x: number, y: number, type: number) {
    super(x, y);
    this.type = type;
    this.health = type + 1;

    this.col = [
      color(255, 255, 51),
      color(204, 127, 25),
      color(153, 25, 25),
    ][type];
  }

  draw(): void {
    if (!this.isActive) {
      return;
    }

    push();
    {
      imageMode(CENTER);
      tint(this.col);
      image(Peg.imgList[(this.type+1) - this.health], this.pos.x, this.pos.y, PEG_RADIUS*2, PEG_RADIUS*2);
    }
    pop();
  }

  doDamage(): void {
    this.isActive = (--this.health > 0);
  }
}
