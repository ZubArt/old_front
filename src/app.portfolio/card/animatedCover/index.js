import Node from './node'
function rand(max, min) {
    min = min || 0;
    return Math.random() * (max - min) + min;
}


export default class AnimatedCover {

    static getNextId() {
        AnimatedCover.counter = AnimatedCover.counter || 0;
        return `ac_${AnimatedCover.counter++}`
    }

    constructor(element, $document, $scope, $timeout) {
        this.element = element;
        this.id = AnimatedCover.getNextId();
        const {data} = $scope;

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

        const img = new Image();
        let hasImg = false;
        if (data && data.images && data.images.preview) {
            img.onload = () => {
                img.loaded = hasImg = true;
                updateSize()
            };
            img.src = data.images.preview;
        }

        let updateSize = () => {
            w = this.w;
            h = this.h;

            canvas.width = w;
            canvas.height = h;

            tmpCanvas.width = w;
            tmpCanvas.height = h;

            tmpCtx.fillStyle = 'hsl(' + (Math.random() * 300 | 0) + ',100%,50%)';
            tmpCtx.fillRect(0, 0, w, h);

            if (hasImg) {
                tmpCtx.drawImage(img, 0, 0, w, h);
            }

            rawData = tmpCtx.getImageData(0, 0, w, h);
            nodes = AnimatedCover.getNodes(rawData, w, h);
            invalid = true;
        };

        let timer;

        const resizeTimeout = () => timer = timer || $timeout(checkResize, 0);

        $scope.$watchGroup([() => that.clientWidth, () => that.clientHeight], resizeTimeout);
        angular.element(window).on('resize', resizeTimeout);

        const checkResize = () => {
            timer = null;
            if (this.w !== that.clientWidth || this.h !== that.clientHeight) {
                this.w = that.clientWidth || 1;
                this.h = that.clientHeight || 1;
                invalid = true;
            }
        };

        checkResize();

        let lastTimeRedraw = false;
        let draw = () => {
            requestAnimationFrame(draw);

            if (!invalid)
                return;

            if (w !== this.w || h !== this.h) {
                updateSize();
            }

            let l = rawData.data.length;
            while (l--) {
                rawData.data[l] = 0;
            }

            invalid = !lastTimeRedraw;
            mouseOn && mm(that, lastEvent);

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
        };
        draw();

        function mm(container, event) {

            event = event || lastEvent;
            let point = [event.offsetX, event.offsetY];
            lastEvent = event;

            if (!nodes || !nodes.length)
                return;

            let l = nodes.length, dx, dy, node, c;
            while(l--) {
                node = nodes[l];
                dx = node.x - point[0];
                dy = node.y - point[1];
                c = Math.sqrt(dx * dx + dy * dy);
                if (c < (rand(200, 50) | 0) ) {
                    node.target.x += dx;
                    node.target.y += dy;
                    node.target.x = AnimatedCover.contains(node.target.x, 0, w);
                    node.target.y = AnimatedCover.contains(node.target.y, 0, h);
                }
            }
            invalid = true;
        }

        const mouseover = () => {
            mouseOn = true;
        };
        const mouseout = () => {
            mouseOn = false;

            let l = nodes.length, d;
            while (l--) {
                d = nodes[l];
                d.target.x = d.origin.x;
                d.target.y = d.origin.y;
            }
            lastTimeRedraw = false;
            invalid = true;
        };
        const mousemove = function(event) {
            mm(this, event);
        };

        element
            .on('mouseenter', mouseover)
            .on('mouseleave', mouseout)
            .on('mousemove', mousemove)
        ;

        $scope.$on('$destroy', () => {
            element
                .off('mouseenter', mouseover)
                .off('mouseleave', mouseout)
                .off('mousemove', mousemove)
            ;
            angular.element(window).off('resize', resizeTimeout);
        });
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
