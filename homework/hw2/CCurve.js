import { Color } from '../../color/Color.js';
import { Matrix } from '../../scene/Matrix.js';
import { ModelShading } from '../../scene/ModelShading.js';
import { Position } from '../../scene/Position.js';
import { C_Curve } from './fractals/C_Curve.js';
import { Abstract } from './Abstract.js';

export class CCurve_Fractal extends Abstract {
    constructor() {
        super();
        
        this.scene.addPosition([
            new Position(new C_Curve(0)),
            new Position(new C_Curve(1)),
            new Position(new C_Curve(2)),
            new Position(new C_Curve(3)),
            new Position(new C_Curve(4)),
            new Position(new C_Curve(5)),
            new Position(new C_Curve(6)),
            new Position(new C_Curve(7)),
            new Position(new C_Curve(8)),
            new Position(new C_Curve(9)),
            new Position(new C_Curve(10)),
            new Position(new C_Curve(11)),
            new Position(new C_Curve(12)),
            new Position(new C_Curve(13)),
            new Position(new C_Curve(14)),
            new Position(new C_Curve(15)),
            new Position(new C_Curve(16)),
            new Position(new C_Curve(17)),
            new Position(new C_Curve(18)),
            new Position(new C_Curve(19)),
            new Position(new C_Curve(20))
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
new CCurve_Fractal();