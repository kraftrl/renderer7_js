import { Circle_v0_Abstract } from "./Circle_v0_Abstract.js";

export class Circle_v1_Distort extends Circle_v0_Abstract {

    constructor() {
        super();
    }
}

var circleDistort = new Circle_v1_Distort();
console.log(circleDistort);
//interactiveCube.setTransformations();
document.addEventListener("keypress", function(e) {
    circleDistort.keyPressed(e);
});

// window.onresize = function() {
//     interactiveCube.setupViewing();
// };

var resizer = new ResizeObserver(function () {
    circleDistort.setupViewing();
});
resizer.observe(document.getElementById("resizer"));