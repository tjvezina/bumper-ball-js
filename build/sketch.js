export const VIEW_WIDTH = 1024;
export const VIEW_HEIGHT = 768;
let viewScale = 1;
let font;
let imgChromeBall;
let imgBackground;
let imgLoading;
let imgTitle;
let imgPaddle;
let imgPeg;
let imgPegCracked1;
let imgPegCracked2;
globalThis.preload = function () {
    loadFont('./assets/pericles-regular.ttf', result => { font = result; });
    loadImage('./assets/chrome-ball.png', result => { imgChromeBall = result; });
    loadImage('./assets/dark.png', result => { imgBackground = result; });
    loadImage('./assets/loading.png', result => { imgLoading = result; });
    loadImage('./assets/menu-title.png', result => { imgTitle = result; });
    loadImage('./assets/paddle.png', result => { imgPaddle = result; });
    loadImage('./assets/peg.png', result => { imgPeg = result; });
    loadImage('./assets/peg-cracked-1.png', result => { imgPegCracked1 = result; });
    loadImage('./assets/peg-cracked-2.png', result => { imgPegCracked2 = result; });
};
globalThis.windowResized = function () {
    viewScale = (windowWidth / windowHeight < VIEW_WIDTH / VIEW_HEIGHT ? windowWidth / VIEW_WIDTH : windowHeight / VIEW_HEIGHT);
    resizeCanvas(VIEW_WIDTH * viewScale, VIEW_HEIGHT * viewScale);
};
globalThis.setup = function () {
    viewScale = (windowWidth / windowHeight < VIEW_WIDTH / VIEW_HEIGHT ? windowWidth / VIEW_WIDTH : windowHeight / VIEW_HEIGHT);
    createCanvas(VIEW_WIDTH * viewScale, VIEW_HEIGHT * viewScale);
    pixelDensity(1);
};
globalThis.draw = function () {
    background(42);
    scale(viewScale);
};
//# sourceMappingURL=sketch.js.map