import { Color } from '../../color/Color.js';
import { Matrix } from '../../scene/Matrix.js';
import { ModelShading } from '../../scene/ModelShading.js';
import { Position } from '../../scene/Position.js';
import { SierpinskiTriangle } from './fractals/SierpinskiTriangle.js';
import { Abstract } from './Abstract.js';

export class SierpinskiTriangle_Fractal extends Abstract {
    constructor() {
        super();
        
        this.scene.addPosition([
            new Position(new SierpinskiTriangle(0)),
            new Position(new SierpinskiTriangle(1)),
            new Position(new SierpinskiTriangle(2)),
            new Position(new SierpinskiTriangle(3)),
            new Position(new SierpinskiTriangle(4)),
            new Position(new SierpinskiTriangle(5)),
            new Position(new SierpinskiTriangle(6)),
            new Position(new SierpinskiTriangle(7)),
            new Position(new SierpinskiTriangle(8)),
            new Position(new SierpinskiTriangle(9)),
            new Position(new SierpinskiTriangle(10))
        ]);

        // Push the models away from where the camera is.
        for (var p of this.scene.positionList) {
            ModelShading.setColor(p.model, Color.Blue);
            p.model.visible = false;
            p.matrix = Matrix.translate(0, 0, -1);
        }

        // currentModel will cycle through all but
        // the last model, the axes
        this.currentPosition = 0;
        this.scene.positionList[this.currentPosition].model.visible = true;
    }
}
new SierpinskiTriangle_Fractal();