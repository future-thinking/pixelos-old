ws281x = require('rpi-ws281x-v2');

class Rainbow {
    constructor() {
        // Current pixel position
        this.offset = 0;

        // Set my Matrix configuration
        this.config = {};

        // By setting width and height instead of number of leds
        // you may use named pixel mappings.
        // Currently "matrix" and "alternating-matrix" are
        // supported. You may also set the "map" property
        // to a custom Uint32Array to define your own map.
        this.config.width = 32;
        this.config.height = 8;
        this.config.map = 'canvas-matrix';

        // Configure ws281x
        ws281x.configure(this.config);
    }

    loop() {
        var pixels = new Uint32Array(this.config.leds);

        // Set a specific pixel
        pixels[this.offset] = 0xFF0000;

        // Move on to next
        this.offset = (this.offset + 1) % this.config.leds;

        // Render to strip
        ws281x.render(pixels);
    }

    run() {
        // Loop every 100 ms
        setInterval(this.loop.bind(this), 100);
    }
}

let example = new Rainbow();
example.run();