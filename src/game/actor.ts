export default abstract class Actor {
  isActive = true;
  pos: p5.Vector;

  constructor();
  constructor(x: number, y: number);
  constructor(x?: number, y?: number) {
    this.pos = createVector(x ?? 0, y ?? 0);
  }

  update?(): void;
  draw?(): void;
}
