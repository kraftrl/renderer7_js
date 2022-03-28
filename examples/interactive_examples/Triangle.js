import { Scene } from '../../scene/Scene.js';
import { Vertex } from '../../scene/Vertex.js';
import { Matrix } from '../../scene/Matrix.js';
import { LineSegment } from '../../scene/LineSegment.js';
import { Model } from '../../scene/Model.js';
import { Position } from '../../scene/Position.js';
import { Color } from '../../color/Color.js';
import { Abstract } from './Abstract.js';

export class Triangle extends Abstract {
    constructor() {
        super();

        this.scene = new Scene();
        
        var model = new Model("triangle");
        this.modelArray.push(model);

        this.scene.camera.projOrthoReset();
        
        var position = new Position(this.modelArray[0]);

        this.scene.addPosition([position]);

        this.pushback = -1;
        position.matrix = Matrix.translate(0, 0, this.pushback);
        
        model.addVertex([new Vertex(1, 0, 0),
                         new Vertex(0, 1, 0),
                         new Vertex(0, 0, 0)]);

        // Create a different color for each vertex.
        model.addColor(Color.Red, Color.Green, Color.Blue);
        
        // Add the geometry with colors to the Model.
        model.addLineSegment([new LineSegment(0, 1, 0, 1),
                              new LineSegment(1, 2, 1, 2),
                              new LineSegment(2, 0, 2, 0)]);

        // console.log(model);
        
        this.setupViewing();
    }
}
new Triangle();