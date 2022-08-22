import Screen from '../framework/screen.js';
import ScreenManager from '../framework/screen-manager.js';
import Ball, { BALL_RADIUS } from '../game/ball.js';
import Paddle, { PADDLE_HEIGHT, PADDLE_WIDTH } from '../game/paddle.js';
import Peg, { PEG_RADIUS } from '../game/peg.js';
import { imgBackground, VIEW_HEIGHT, VIEW_WIDTH } from '../sketch.js';
import GameOverScreen from './game-over-screen.js';
import LevelCompleteScreen from './level-complete-screen.js';
const MAX_LIVES = 3;
const MIN_PEG_ROWS = 1;
const MAX_PEG_ROWS = 8;
const MIN_PEG_COLUMNS = 6;
const MAX_PEG_COLUMNS = 10;
const VERTICAL_SPACER = 24;
const FRICTION = 0.8;
const BOUNCE_POWER = 2.0;
const BALL_CURVE = 1000;
export default class GameScreen extends Screen {
    constructor(difficulty) {
        super();
        this.lives = MAX_LIVES;
        this.score = 0;
        this.multiplier = 0;
        this.actors = [];
        this.paddle = null;
        this.ball = null;
        this.fadeInTime = 2;
        this.pegRows = MIN_PEG_ROWS + difficulty;
        this.pegColumns = MIN_PEG_COLUMNS + floor(difficulty / 2) * 2;
        this.reset();
        this.level = [1, 4, 8, 11, 15, 18][difficulty];
    }
    reset(options) {
        if (options?.advanceLevel === true) {
            this.level++;
            if (this.pegRows < MAX_PEG_ROWS || this.pegColumns < MAX_PEG_COLUMNS) {
                this.pegColumns += 2;
                if (this.pegColumns > MAX_PEG_COLUMNS) {
                    this.pegColumns = MIN_PEG_COLUMNS;
                    this.pegRows++;
                }
            }
            ScreenManager.addScreen(new LevelCompleteScreen());
        }
        this.multiplier = 0;
        this.actors.length = 0;
        this.ball = new Ball(VIEW_WIDTH / 2, VERTICAL_SPACER / 2);
        this.paddle = new Paddle((VIEW_WIDTH - PADDLE_WIDTH) / 2, VIEW_HEIGHT - 32);
        this.actors.push(this.ball, this.paddle);
        const hPad = (VIEW_WIDTH - (PEG_RADIUS * 2 * this.pegColumns)) / (this.pegColumns + 1);
        let pegX = -PEG_RADIUS;
        let pegY = VERTICAL_SPACER * 2 + PEG_RADIUS;
        for (let r = 0; r < this.pegRows; r++) {
            for (let c = 0; c < this.pegColumns; c++) {
                pegX += (hPad + PEG_RADIUS * 2);
                if (r % 2 === 1 && c === this.pegColumns - 1)
                    continue;
                if (this.pegColumns % 2 === 0) {
                    if (r % 2 === 1 && c === this.pegColumns / 2 - 1)
                        continue;
                }
                else {
                    if (r % 2 === 0 && c === this.pegColumns / 2 - 1)
                        continue;
                }
                const type = r % 3;
                this.actors.push(new Peg(pegX, pegY, type));
            }
            pegY += (VERTICAL_SPACER + PEG_RADIUS * 2);
            if (r % 2 === 1) {
                pegX = -PEG_RADIUS;
            }
            else {
                pegX = hPad / 2;
            }
        }
    }
    update(isActive, isCovered) {
        if (this.isActive) {
            let activePegCount = 0;
            for (const actor of this.actors) {
                actor.update?.();
                if (actor !== this.ball) {
                    if (actor !== this.paddle && actor.isActive) {
                        activePegCount++;
                    }
                    this.handleCollision(this.ball, actor);
                }
            }
            if (this.ball.pos.y - BALL_RADIUS > VIEW_HEIGHT) {
                this.loseLife();
            }
            if (activePegCount === 0) {
                this.reset({ advanceLevel: true });
            }
        }
        super.update(isActive, isCovered);
    }
    draw() {
        image(imgBackground, 0, 0, VIEW_WIDTH, VIEW_HEIGHT);
        this.actors.forEach(actor => actor.draw());
        fill(0, 127, 255, 204).noStroke();
        text(`Score: ${this.score}`, 10, 10);
        text(`Level: ${this.level}`, VIEW_WIDTH / 2 - 75, 10);
        text(`Lives: ${this.lives}`, VIEW_WIDTH - 150, 10);
        if (this.multiplier > 0) {
            const offset = createVector(-5, -20);
            const scale = 1 + (this.multiplier / 6);
            push();
            {
                fill(204, 0, 0, 127);
                textSize(textSize() * scale);
                text(`${this.multiplier}`, VIEW_WIDTH / 2 + (offset.x * scale), VIEW_HEIGHT * 0.45 + (offset.y * scale));
            }
            pop();
        }
    }
    loseLife() {
        console.log('loseLife');
        this.ball.pos.x = VIEW_WIDTH / 2;
        this.ball.pos.y = VERTICAL_SPACER / 2;
        this.ball.vel.setMag(0);
        this.ball.isActive = true;
        this.lives--;
        this.multiplier = 0;
        if (this.lives === 0) {
            ScreenManager.addScreen(new GameOverScreen());
        }
    }
    handleCollision(ball, actor) {
        if (!ball.isActive || !actor.isActive)
            return;
        if (actor instanceof Paddle) {
            const paddle = actor;
            const circleDistX = abs(ball.pos.x - paddle.pos.x - PADDLE_WIDTH / 2);
            const circleDistY = abs(ball.pos.y - paddle.pos.y - PADDLE_HEIGHT / 2);
            if (circleDistX > (PADDLE_WIDTH / 2 + BALL_RADIUS) || circleDistY > (PADDLE_HEIGHT / 2 + BALL_RADIUS)) {
                return;
            }
            this.multiplier = 0;
            if (circleDistX <= PADDLE_WIDTH / 2) {
                const ratio = ((ball.pos.x - paddle.pos.x) / PADDLE_WIDTH) * 2 - 1;
                ball.vel.x = BALL_CURVE * ratio;
                ball.pos.y = paddle.pos.y - BALL_RADIUS;
                if (paddle.isBouncing) {
                    ball.vel.y *= -BOUNCE_POWER;
                }
                else {
                    ball.vel.y *= -FRICTION;
                }
                return;
            }
            const ballSpeed = ball.vel.mag();
            if (ball.pos.x < paddle.pos.x) {
                ball.vel.set(-ballSpeed, 0);
            }
            else {
                ball.vel.set(ballSpeed, 0);
            }
            ball.isActive = false;
        }
        else {
            const peg = actor;
            const delta = p5.Vector.sub(ball.pos, peg.pos);
            if (delta.mag() <= PEG_RADIUS + BALL_RADIUS) {
                ball.vel.reflect(delta.copy());
                ball.pos.set(p5.Vector.add(peg.pos, delta.copy().setMag(PEG_RADIUS + BALL_RADIUS + 0.1)));
                peg.doDamage();
                this.multiplier++;
                this.score += this.multiplier;
            }
        }
    }
}
//# sourceMappingURL=game-screen.js.map