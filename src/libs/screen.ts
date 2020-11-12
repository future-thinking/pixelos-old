import chalk from "chalk";

/**
 * Way to store a color for a pixel;
 */
export class Color {
    color: Array<number>;

    constructor(r: number, g: number, b: number) {
        this.color = [r, g, b];
    }

    clone(): Color {
        return new Color(this.color[0], this.color[1], this.color[2]);
    }

    getR(): number {return this.color[0]}
    getG(): number {return this.color[1]}
    getB(): number {return this.color[2]}
}


/** A complete grid of colors to represent a frame on the screen. */
export class Frame {
    grid: Array<Array<Color>>;

    constructor(width: number) {
        this.grid = [];
        for (let y = 0; y < width; y++) {
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
        let frame = new Frame(0);
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

    rotate90deg(): void {
        let rotated: Array<Array<Color>> = [];
        for (let n = 0; n < this.grid.length; n++)
            rotated.push([]);

        for (let x = 0; x < this.grid.length; x++) {
            for (let y = 0; y < this.grid.length; y++) {
                rotated[x][y] = this.grid[this.grid.length - y - 1][x].clone();
            }
        }

        this.grid = rotated;
    }

    rotate(rotations: number): void {
        if (rotations == 0)
            return;
        if (rotations < 0) {
            rotations = rotations % -4;
            rotations = 4 + rotations;
        }
        rotations = rotations % 4;
        for (let i = 0; i < rotations; i++) {
            this.rotate90deg();
        }
    }

    clone(): Frame {
        let newGrid: Array<Array<Color>> = [];
        for (let x = 0; x < this.grid.length; x++) {
            newGrid.push([])
            for (let y = 0; y < this.grid.length; y++) {
                newGrid[x][y] = this.grid[x][y].clone();
            }
        }
        return Frame.fromGrid(newGrid);
    }

    snakeUnmap(): Array<Color> {
        let snake: Array<Color> = [];

        let reverse: boolean = false;
        for (let y = 0; y < this.grid.length; y++) {
            for (let x = 0; x < this.grid.length; x++) {
                if (!reverse)
                    snake.push(this.grid[y][x]);
                else
                    snake.push(this.grid[y][this.grid.length - x - 1].clone());
            }
            reverse = !reverse;
        }

        return snake;
    }
}


/**
 * Class for interfacing with hardware screen
 */
export class TableScreen {
    ws281x: any;
    currentFrame: Frame;
    config: any;
    emulate: boolean;
    
    constructor(emulate: boolean, config: any) {
        this.config = config;
        this.emulate = emulate;
        if (!emulate)
            this.ws281x = require('rpi-ws281x-v2');
        
        this.currentFrame = new Frame(config.width);
    }

    init() {
        let config = this.config;
        if (!this.emulate)
            this.ws281x.configure({
                leds: Math.pow(config.width, 2), 
                gpio: config.gpio,
                type: "GRB", 
                dma: config.dma, 
                brightness: config.brightness
            });
    }

    updateScreen() {
    }
}