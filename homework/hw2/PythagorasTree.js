import { Color } from '../../color/Color.js';
import { Matrix } from '../../scene/Matrix.js';
import { ModelShading } from '../../scene/ModelShading.js';
import { Position } from '../../scene/Position.js';
import { PythagorasTree } from './fractals/PythagorasTree.js';
import { Abstract } from './Abstract.js';

export class PythagorasTree_Fractal extends Abstract {
    constructor() {
        super();
        
        this.scene.addPosition([
            new Position(new PythagorasTree(0.4, 0.45, 0)),
            new Position(new PythagorasTree(0.4, 0.45, 1)),
            new Position(new PythagorasTree(0.4, 0.45, 2)),
            new Position(new PythagorasTree(0.4, 0.45, 3)),
            new Position(new PythagorasTree(0.4, 0.45, 4)),
            new Position(new PythagorasTree(0.4, 0.45, 5)),
            new Position(new PythagorasTree(0.4, 0.45, 6)),
            new Position(new PythagorasTree(0.4, 0.45, 7)),
            new Position(new PythagorasTree(0.4, 0.45, 8)),
            new Position(new PythagorasTree(0.4, 0.45, 9)),
            new Position(new PythagorasTree(0.4, 0.45, 10)),
            new Position(new PythagorasTree(0.4, 0.45, 11)),
            new Position(new PythagorasTree(0.4, 0.45, 12)),
            new Position(new PythagorasTree(0.4, 0.45, 13)),
            new Position(new PythagorasTree(0.4, 0.45, 14)),
            new Position(new PythagorasTree(0.4, 0.45, 15))
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
new PythagorasTree_Fractal();