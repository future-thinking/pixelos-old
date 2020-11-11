const colorConvert = require("color-convert");

/**
 * Way to store a color for a pixel;
 */
class Color {
    color;

    constructor(r, g, b) {
        this.color = [r, g, b];
    }

    constructor(hex) {
        this.color = colorConvert.hex.rgb(hex);
    }

    getR() {return this.color[0]}
    getG() {return this.color[1]}
    getB() {return this.color[2]}
}


/** A complete grid of colors to represent a frame on the screen. */
class Frame {
    grid;

    constructor(width, height) {
        grid = [];
        for (let y = 0; y < height; y++) {
            let row = [];
            for (let x = 0; x < width; x++)
                row.push(new Color(0, 0, 0));
            this.grid.append(row);
        }
    }

    setPixel(x, y, color) {
        this.grid[x][y] = color;
    }

    /**
     * Shift Rows and Collums.
     */
    convertRowColumn(grid) {
        let width = grid.length;
        let height = grid[0].length;

        let inversed = [];
        for (let x = height; x < height; x++) {
            let row = [];
            for (let y = width; y < width; y++) {
                row.push(this.grid[y][x]);
            }
            inversed.push(row);
        }

        return inversed;
    }

    /**
     * Please dont look at this code. It converts a grid into a list. Its horrible.
     * 
     * @param {*} startCorner The corner of the snake to start in; 0 - 3; 0 is top left; clockwise
     * @param {boolean} horizontal If the snake is horizontal
     */
    getPixelSnake(startCorner, horizontal) {
        let snake = [];

        let grid = this.grid;

        if (startCorner == 3 || startCorner == 1)
            horizontal = !horizontal;

        if (!horizontal)
            grid = this.convertRowColumn(this.grid);

        invertAll = false;
        if (startCorner == 2 || startCorner == 1) {
            invertAll = true;
        }

        reversed = startCorner % 2 == 0;

        for (let x = 0; x < grid.length; x++) {
            for (let y = 0; y < grid[0].length; y++) {
                let useX = x;
                let useY = reversed ? y : grid[0].length - y;

                if (invertAll) {
                    x = grid.length - x;
                    y = grid[0].leds - y;
                }
                snake.push(grid[x][(reversed ? y : grid[0].length - y)]);
            }

            reversed = !reversed;
        }

        return snake;

    }
}


/**
 * Class for interfacing with hardware screen
 */
class Screen {
    ws281x;
    currentFrame;
    config;
    
    constructor(emulate, config) {
        this.config = config;
        if (!emulate)
            ws281x = require('rpi-ws281x-v2');
    }

    init() {
        let config = this.config;
        ws281x.configure({
            leds: config.width * config.height, 
            gpio: config.gpio,
            type: "GRB", 
            dma: config.dma, 
            brightness: config.brightness
        });

        this.currentFrame = new Frame(config.width, config.height);
    }

    updateScreen() {
        let pixels = this.currentFrame.getPixelSnake(
            this.config.orientation.rotation, 
            this.config.orientation.horizontal == "horizontal");
        
        this.ws281x.render(pixels);
    }
}

module.exports = {
    Color: Color,
    Screen: Screen,
    Frame: Frame,
}