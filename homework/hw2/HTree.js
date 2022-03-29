import { Color } from '../../color/Color.js';
import { Matrix } from '../../scene/Matrix.js';
import { ModelShading } from '../../scene/ModelShading.js';
import { Position } from '../../scene/Position.js';
import { H_Tree } from './fractals/H_Tree.js';
import { Abstract } from './Abstract.js';

export class H_Tree_Fractal extends Abstract {
    constructor() {
        super();
        
        this.scene.addPosition([
            new Position(new H_Tree(0)),
            new Position(new H_Tree(1)),
            new Position(new H_Tree(2)),
            new Position(new H_Tree(3)),
            new Position(new H_Tree(4)),
            new Position(new H_Tree(5)),
            new Position(new H_Tree(6)),
            new Position(new H_Tree(7)),
            new Position(new H_Tree(8)),
            new Position(new H_Tree(9)),
            new Position(new H_Tree(10)),
            new Position(new H_Tree(11)),
            new Position(new H_Tree(12)),
            new Position(new H_Tree(13)),
            new Position(new H_Tree(14)),
            new Position(new H_Tree(15)),
            new Position(new H_Tree(16))
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
new H_Tree_Fractal();