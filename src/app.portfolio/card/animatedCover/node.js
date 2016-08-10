function rand(max, min) {
    min = min || 0;
    return Math.random() * (max - min) + min;
}

export default class Node {
    constructor(x, y, pixel) {
        this.x = x;
        this.y = y;
        this.origin = {
            x: x,
            y: y
        };
        this.target = {
            x: x,
            y: y
        };
        this.pixel = pixel;
        this.velocity = rand(.8, .5);
    }
}
