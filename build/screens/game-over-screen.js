import Screen from '../framework/screen.js';
import { VIEW_HEIGHT, VIEW_WIDTH } from '../sketch.js';
import LoadingScreen from './loading-screen.js';
import MainMenuScreen from './main-menu-screen.js';
export default class GameOverScreen extends Screen {
    constructor() {
        super();
        this.fadeInTime = 0.5;
        this.fadeOutTime = 0.5;
        this.isPopup = true;
    }
    keyPressed() {
        if (this.isActive && keyCode === ENTER) {
            LoadingScreen.load(new MainMenuScreen());
        }
    }
    draw() {
        super.drawFadeOverlay((1 - this.fadePosition) / 2);
        push();
        {
            textSize(textSize() * 3);
            fill(0, 127, 255, 255 * (1 - this.fadePosition));
            text('GAME OVER!', VIEW_WIDTH / 2 - 256, VIEW_HEIGHT / 2 - 64);
        }
        pop();
        push();
        {
            fill(0, 127, 255, 255 * (1 - this.fadePosition));
            text('Press [ENTER] to continue...', VIEW_WIDTH / 2 - 200, VIEW_HEIGHT / 2 + 96);
        }
        pop();
    }
}
//# sourceMappingURL=game-over-screen.js.map