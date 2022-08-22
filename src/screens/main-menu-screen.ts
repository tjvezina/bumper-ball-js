import Screen from '../framework/screen.js';
import { imgBackground, VIEW_HEIGHT, VIEW_WIDTH } from '../sketch.js';
import DifficultyScreen from './difficulty-screen.js';
import LoadingScreen from './loading-screen.js';

export default class MainMenuScreen extends Screen {
  static imgTitle: p5.Image;

  static preload(): void {
    loadImage('./assets/menu-title.png', result => { this.imgTitle = result; });
  }

  constructor() {
    super();
    this.fadeInTime = 2;
    this.fadeOutTime = 1;
  }

  keyPressed(): void {
    if (this.isActive && keyCode === ENTER) {
      LoadingScreen.load(new DifficultyScreen());
    }
  }

  draw(): void {
    const { imgTitle } = MainMenuScreen;
    const titleOffset = (-VIEW_HEIGHT / 2) * this.fadePosition;
    const alpha = 255 * (1 - this.fadePosition);

    image(imgBackground, 0, 0, VIEW_WIDTH, VIEW_HEIGHT);

    tint(255, alpha);
    image(imgTitle, (VIEW_WIDTH - imgTitle.width) / 2, (VIEW_HEIGHT - imgTitle.height) / 2 + titleOffset);
    noTint();

    fill(0, 127, 255, alpha).noStroke();
    text('Press [ENTER] to continue...', VIEW_WIDTH/2 - 200, VIEW_HEIGHT/2 + 96 - titleOffset);

    super.draw();
  }
}
