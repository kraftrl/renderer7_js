import { Color } from '../../color/Color.js';
import { Matrix } from '../../scene/Matrix.js';
import { ModelShading } from '../../scene/ModelShading.js';
import { Position } from '../../scene/Position.js';
import { KochCurve } from './fractals/KochCurve.js';
import { Abstract } from './Abstract.js';

export class KochCurve_Fractal extends Abstract {
    constructor() {
        super();
        
        this.scene.addPosition([
            new Position(new KochCurve(0)),
            new Position(new KochCurve(1)),
            new Position(new KochCurve(2)),
            new Position(new KochCurve(3)),
            new Position(new KochCurve(4)),
            new Position(new KochCurve(5)),
            new Position(new KochCurve(6)),
            new Position(new KochCurve(7))
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
new KochCurve_Fractal();