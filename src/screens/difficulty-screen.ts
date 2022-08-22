import Screen from '../framework/screen.js';
import { imgBackground, VIEW_HEIGHT, VIEW_WIDTH } from '../sketch.js';
import GameScreen from './game-screen.js';
import LoadingScreen from './loading-screen.js';

export default class DifficultyScreen extends Screen {
  selectedEntry = 0;

  constructor() {
    super();
    this.fadeInTime = 1;
    this.fadeOutTime = 1;
  }

  keyPressed(): void {
    if (!this.isActive) return;

    if (keyCode === ENTER) {
      LoadingScreen.load(new GameScreen(this.selectedEntry), true);
    }

    if (keyCode === UP_ARROW) {
      --this.selectedEntry;
    }
    if (keyCode === DOWN_ARROW) {
      ++this.selectedEntry;
    }

    this.selectedEntry = constrain(this.selectedEntry, 0, 5);
  }

  draw(): void {
    const textCol = color(0, 127, 255);
    const highlightCol = color(204, 0, 0);

    image(imgBackground, 0, 0, VIEW_WIDTH, VIEW_HEIGHT);

    fill(textCol).noStroke();
    text('Select Difficulty', 380, 48);

    const position = createVector(280, 180);
    const offset = createVector(50, 80);

    for (let x = 0; x < 6; x++) {
      const entryText = [
        '[Level 1] Super Easy',
        '[Level 4] Easy',
        '[Level 8] Normal',
        '[Level 11] Hard',
        '[Level 15] Super Hard',
        '[Level 18] IMPOSSIBRU!',
      ][x];

      if (x < 5 || this.selectedEntry === 5) {
        fill(x === this.selectedEntry ? highlightCol : textCol).noStroke();
        text(entryText, position.x, position.y);
      }

      if (x === this.selectedEntry) {
        fill(highlightCol).noStroke();
        text('>>>', position.x - 50, position.y);
      }

      position.add(offset);
    }

    super.draw();
  }
}
