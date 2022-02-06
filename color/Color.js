/**
 * 
 */
export class Color{

    static Black = new Color('#000000');
    static White = new Color('#FFFFFF');
    static Red = new Color('#FF0000');
    static Green = new Color('#00FF00');
    static Blue = new Color('#0000FF');
    static GAMMA = 1/2.2;

    constructor(color){
        var rgb = [];
        if (color instanceof Array) {
            rgb = color;
            // color = Color.RgbToHex(rgb);
        } else { // color is a hex string
            rgb = Color.hexToRgb(color);
        }
        this.r = rgb[0];
        this.g = rgb[1];
        this.b = rgb[2];
        // this.c = color; // Hold hex value as well.
    }

    // Apply gamma-encoding (gamma-compression) to the colors.
    // https://www.scratchapixel.com/lessons/digital-imaging/digital-images
    // http://blog.johnnovak.net/2016/09/21/what-every-coder-should-know-about-gamma/
    applyGamma() {
        this.r = Math.round(Math.pow(this.r,  Color.GAMMA));
        this.g = Math.round(Math.pow(this.g,  Color.GAMMA));
        this.b = Math.round(Math.pow(this.b,  Color.GAMMA));
        // this.c = Color.RgbToHex([this.r, this.g, this.b]); Hex value
    }

    static interpolate(c, slope, dx){
        const rgb = [Math.abs(c.r + slope.r*dx),
                     Math.abs(c.g + slope.g*dx),
                     Math.abs(c.b + slope.b*dx)];
        // We need the Math.abs() because otherwise, we sometimes get -0.0.
        return new Color(rgb);
    }

    // The smaller the weight is, the closer y is to the lower
    // pixel, so we give the lower pixel more emphasis when
    // weight is small.
    static interpolateAA(c1, c2, weight){
        const rgbLow = [(1 - weight) * c1.r + weight * (c2.r / 255.0),
                        (1 - weight) * c1.g + weight * (c2.g / 255.0),
                        (1 - weight) * c1.b + weight * (c2.b / 255.0)];
        const rgbHigh = [weight * c1.r + (1 - weight) * (c2.r/255.0),
                         weight * c1.g + (1 - weight) * (c2.g/255.0),
                         weight * c1.b + (1 - weight) * (c2.b/255.0)];
        return [new Color(rgbLow), new Color(rgbHigh)];
    }

    static slope(c1, c0, dx){
        const rgb = [(c1.r - c0.r) / dx,
                     (c1.g - c0.g) / dx,
                     (c1.b - c0.b) / dx];
        return new Color(rgb);
    }

    static hexToRgb(hex){
        if(hex.match(/^#[A-Fa-f0-9]{6}/)){
            return [parseInt(hex.substring(1, 3), 16), parseInt(hex.substring(3,5), 16), parseInt(hex.substring(5,7), 16)];
        }
        return [0, 0, 0];
    }

    static RgbToHex([r, g, b]) {
        return "#" + Color.intToHex(r) + Color.intToHex(g) + Color.intToHex(b);
    }

    static intToHex(x) {
        if (x < 10) {
            return "0" + x.toString(16);
        }
        return x.toString(16);
    }

}

