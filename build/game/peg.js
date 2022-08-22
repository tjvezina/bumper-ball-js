import Actor from './actor.js';
export const PEG_RADIUS = 32;
export default class Peg extends Actor {
    constructor(x, y, type) {
        super(x, y);
        this.col = color(255);
        this.type = type;
        this.health = type + 1;
        this.col = [
            color(255, 255, 51),
            color(204, 127, 25),
            color(153, 25, 25),
        ][type];
    }
    static preload() {
        loadImage('./assets/peg.png', result => { this.imgList[0] = result; });
        loadImage('./assets/peg-cracked-1.png', result => { this.imgList[1] = result; });
        loadImage('./assets/peg-cracked-2.png', result => { this.imgList[2] = result; });
    }
    draw() {
        if (!this.isActive) {
            return;
        }
        push();
        {
            imageMode(CENTER);
            tint(this.col);
            image(Peg.imgList[(this.type + 1) - this.health], this.pos.x, this.pos.y, PEG_RADIUS * 2, PEG_RADIUS * 2);
        }
        pop();
    }
    doDamage() {
        this.isActive = (--this.health > 0);
    }
}
Peg.imgList = [];
//# sourceMappingURL=peg.js.map