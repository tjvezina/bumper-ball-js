import InputManager from '../framework/input-manager.js';
import { VIEW_WIDTH } from '../sketch.js';
import Actor from './actor.js';
export const PADDLE_WIDTH = 200;
export const PADDLE_HEIGHT = 31;
const PADDLE_POP_HEIGHT = 20;
export default class Paddle extends Actor {
    constructor(x, y) {
        super(x, y);
        this.normalPosY = y;
        InputManager.addListener(this);
    }
    static preload() {
        loadImage('./assets/paddle.png', result => { this.img = result; });
    }
    dispose() {
        InputManager.removeListener(this);
    }
    get isBouncing() { return this.pos.y !== this.normalPosY; }
    update() {
        const { pos, normalPosY } = this;
        pos.x = InputManager.mousePos.x - PADDLE_WIDTH / 2;
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
    mousePressed() {
        if (!this.isBouncing) {
            this.pos.y -= PADDLE_POP_HEIGHT;
        }
    }
    draw() {
        image(Paddle.img, this.pos.x, this.pos.y, PADDLE_WIDTH, PADDLE_HEIGHT);
    }
}
//# sourceMappingURL=paddle.js.map