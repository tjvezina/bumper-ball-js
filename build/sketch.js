import ScreenManager from './framework/screen-manager.js';
import Ball from './game/ball.js';
import Paddle from './game/paddle.js';
import Peg from './game/peg.js';
import LoadingScreen from './screens/loading-screen.js';
import MainMenuScreen from './screens/main-menu-screen.js';
export const VIEW_WIDTH = 1024;
export const VIEW_HEIGHT = 768;
export let viewScale = 1;
let font;
export let imgBackground;
globalThis.preload = function () {
    loadFont('./assets/pericles-regular.ttf', result => { font = result; });
    loadImage('./assets/dark.png', result => { imgBackground = result; });
    MainMenuScreen.preload();
    LoadingScreen.preload();
    Ball.preload();
    Paddle.preload();
    Peg.preload();
};
globalThis.windowResized = function () {
    viewScale = (windowWidth / windowHeight < VIEW_WIDTH / VIEW_HEIGHT ? windowWidth / VIEW_WIDTH : windowHeight / VIEW_HEIGHT);
    resizeCanvas(VIEW_WIDTH * viewScale, VIEW_HEIGHT * viewScale);
};
globalThis.setup = function () {
    viewScale = (windowWidth / windowHeight < VIEW_WIDTH / VIEW_HEIGHT ? windowWidth / VIEW_WIDTH : windowHeight / VIEW_HEIGHT);
    createCanvas(VIEW_WIDTH * viewScale, VIEW_HEIGHT * viewScale);
    pixelDensity(1);
    noCursor();
    textSize(28.5);
    textAlign(LEFT, TOP);
    textFont(font);
    ScreenManager.addScreen(new MainMenuScreen());
};
globalThis.draw = function () {
    background(0);
    scale(viewScale);
    ScreenManager.update(document.hasFocus());
    ScreenManager.draw();
};
//# sourceMappingURL=sketch.js.map