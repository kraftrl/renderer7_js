import { Color } from '../../color/Color.js';
import { Matrix } from '../../scene/Matrix.js';
import { ModelShading } from '../../scene/ModelShading.js';
import { Position } from '../../scene/Position.js';
import { Canopy } from './fractals/Canopy.js';
import { Abstract } from './Abstract.js';

export class Canopy_Fractal extends Abstract {
    constructor() {
        super();
        
        this.scene.addPosition([
            new Position(new Canopy(30, 0)),
            new Position(new Canopy(31, 1)),
            new Position(new Canopy(32, 2)),
            new Position(new Canopy(33, 3)),
            new Position(new Canopy(34, 4)),
            new Position(new Canopy(35, 5)),
            new Position(new Canopy(36, 6)),
            new Position(new Canopy(37, 7)),
            new Position(new Canopy(38, 8)),
            new Position(new Canopy(39, 9)),
            new Position(new Canopy(40, 10)),
            new Position(new Canopy(41, 11)),
            new Position(new Canopy(42, 12)),
            new Position(new Canopy(43, 13)),
            new Position(new Canopy(44, 14)),
            new Position(new Canopy(45, 15)),
            new Position(new Canopy(46, 16))
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
new Canopy_Fractal();