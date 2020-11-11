import chalk from "chalk";

/**
 * Way to store a color for a pixel;
 */
export class Color {
    color: Array<number>;

    constructor(r: number, g: number, b: number) {
        this.color = [r, g, b];
    }

    getR(): number {return this.color[0]}
    getG(): number {return this.color[1]}
    getB(): number {return this.color[2]}
}


/** A complete grid of colors to represent a frame on the screen. */
export class Frame {
    grid: Array<Array<Color>>;

    constructor(width: number, height: number) {
        this.grid = [];
        for (let y = 0; y < height; y++) {
            let row = [];
            for (let x = 0; x < width; x++)
                row.push(new Color(0, 0, 0));
            this.grid.push(row);
        }
    }

    setPixel(x: number, y: number, color: Color) {
        this.grid[x][y] = color;
    }

    getGrid(): Array<Array<Color>> {return this.grid;}
    
    setGrid(grid: Array<Array<Color>>) {this.grid = grid;}

    static fromGrid(grid: Array<Array<Color>>): Frame {
        let frame = new Frame(0, 0);
        frame.setGrid(grid);
        return frame;
    }

    toConsoleOutput(): string {
        let output = "";
        this.grid.forEach(row => {
            row.forEach(color => {
                output += chalk.rgb(color.getR(), color.getG(), color.getB())("██ ");
            })
            output += "\n";
        })
        return output;
    }

    /**
     * Please dont look at this code. It converts a grid into a list. Its horrible.
     * 
     * @param {*} startCorner The corner of the snake to start in; 0 - 3; 0 is top left; clockwise
     * @param {boolean} horizontal If the snake is horizontal
     */
    getPixelSnake(startCorner: number, horizontal: boolean): Array<Color> {
        let snake = [];

        let grid = this.grid;

        if (startCorner == 3 || startCorner == 1)
            horizontal = !horizontal;

        let invertAll = false;
        if (startCorner == 2 || startCorner == 1) {
            invertAll = true;
        }

        let reversed = startCorner % 2 == 0;

        for (let x = 0; x < grid.length; x++) {
            for (let y = 0; y < grid[0].length; y++) {
                let useX = x;
                let useY = reversed ? y : grid[0].length - y;

                if (invertAll) {
                    x = grid.length - x;
                    y = grid[0].length - y;
                }
                snake.push(grid[x][(reversed ? y : grid[0].length - y - 1)]);
            }

            reversed = !reversed;
        }

        return snake;

    }
}


/**
 * Class for interfacing with hardware screen
 */
export class TableScreen {
    ws281x: any;
    currentFrame;
    config;
    
    constructor(emulate: boolean, config: any) {
        this.config = config;
        if (!emulate)
            this.ws281x = require('rpi-ws281x-v2');
        
        this.currentFrame = new Frame(config.width, config.height);
    }

    init() {
        let config = this.config;
        this.ws281x.configure({
            leds: config.width * config.height, 
            gpio: config.gpio,
            type: "GRB", 
            dma: config.dma, 
            brightness: config.brightness
        });
    }

    updateScreen() {
        let pixels = this.currentFrame.getPixelSnake(
            this.config.orientation.rotation, 
            this.config.orientation.horizontal == "horizontal");
        
        this.ws281x.render(pixels);
    }
}