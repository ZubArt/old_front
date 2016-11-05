import Node from './node'

export default class AnimatedCover {

    static getNextId() {
        AnimatedCover.counter = AnimatedCover.counter || 0;
        return `ac_${AnimatedCover.counter++}`
    }

    constructor(element, $document) {
        this.element = element;
        this.id = AnimatedCover.getNextId();

        let that = element[0];

        let w, h
            , rawData
            , nodes
            , lastEvent
            , invalid = true
            ;

        let mouseOn = false;

        let canvas = element.find('canvas')[0];
        let ctx = canvas.getContext('2d');

        let tmpCanvas = $document[0].createElement('canvas');
        let tmpCtx = tmpCanvas.getContext('2d');

        let updateSize = () => {
            w = this.w = that.clientWidth;
            h = this.h = that.clientHeight;

            canvas.width = w;
            canvas.height = h;

            tmpCanvas.width = w;
            tmpCanvas.height = h;

            tmpCtx.fillStyle = 'hsl(' + (Math.random() * 300 | 0) + ',100%,50%)';
            tmpCtx.fillRect(0, 0, w, h);

            rawData = tmpCtx.getImageData(0, 0, w, h);
            nodes = AnimatedCover.getNodes(rawData, w, h);
        };
        updateSize();

        let lastTimeRedraw = false;
        let draw = () => {
            requestAnimationFrame(draw);

            if (!invalid)
                return;

            if (w !== this.w || h !== this.h) {
                updateSize()
            }

            let l = rawData.data.length;
            while (l--) {
                rawData.data[l] -= 10;
            }

            invalid = !lastTimeRedraw;

            l = nodes.length;
            let atHome = l;

            let i, node, j;
            while (l--) {
                node = nodes[l];
                i = 4 * (~~node.x + ~~node.y * w);
                j = 4;
                while (j--) {
                    rawData.data[i + j] = node.pixel[j];
                }
                if (AnimatedCover.updateNode(node, mouseOn ? node.target : node.origin, node.velocity))
                    atHome--;
            }

            lastTimeRedraw = atHome < 1;

            ctx.save();
            ctx.clearRect(0, 0, w, h);
            ctx.putImageData(rawData, 0, 0);
            ctx.restore();
            mouseOn && mm(that, lastEvent);
        };
        draw();

        function mm(container, event) {

            event = event || lastEvent;
            let point = [event.offsetX, event.offsetY];
            lastEvent = event;

            if (!nodes || !nodes.length)
                return;
            nodes.forEach(function (d) {
                let dx = d.x - point[0];
                let dy = d.y - point[1];
                let c = Math.sqrt(dx * dx + dy * dy);
                if (c < (200 * Math.random() | 0)) {
                    d.target.x += dx;
                    d.target.y += dy;
                    d.target.x = AnimatedCover.contains(d.target.x, 0, w);
                    d.target.y = AnimatedCover.contains(d.target.y, 0, h);
                }
            });
            invalid = true;
        }

        element
            .on('mouseover', () => {
                mouseOn = true;
            })
            .on('mouseout', () => {
                mouseOn = false;
                nodes.forEach(function (d) {
                    d.target.x = d.origin.x;
                    d.target.y = d.origin.y;
                });
                lastTimeRedraw = false;
                invalid = true;
            })
            .on('mousemove', function(event) {
                mm(this, event);
            })
    }

    static getNodes(imageData, w, h) {
        let data = imageData.data;
        let l = data.length;
        let i, result = [];
        let w2 = w/2, h2 = h/2;

        let x = 0, y = 0, rgba, node;

        for (i = 0; i < l; i+=4) {

            rgba = [
                data[i],
                data[i+1],
                data[i+2],
                data[i+3]
            ];

            node = new Node(x, y, rgba);
            result.push(node);

            x++;
            if (i && !(x%w)) {
                x = 0;
                y++;
            }
        }

        return result
    }

    static updateNode(node, target, velocity) {

        velocity = arguments.length > 2 ? +velocity : .25;

        let dx = node.x - target.x;
        let dy = node.y - target.y;
        let c = Math.sqrt(dx * dx + dy * dy);
        if (c < 2) {
            node.x = target.x;
            node.y = target.y;
            return true;
        }

        node.x -= dx * velocity;
        node.y -= dy * velocity;
        return false;
    }

    static contains(value, min, max) {
        return value < min ? min : value > max ? max : value
    }
}
