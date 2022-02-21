import { Scene } from './../scene/Scene.js';
import { ModelShading } from './../scene/ModelShading.js';
import { Matrix } from './../scene/Matrix.js';
import { Position } from './../scene/Position.js';
import { GRSModel } from './../models/GRSModel.js';
import { Axes2D } from './../models/Axes2D.js';
import { InteractiveAbstractClient } from './InteractiveAbstractClient.js';
import { Color } from '../color/Color.js';

export class InteractiveGRSModels extends InteractiveAbstractClient {
    constructor() {

        super();

        // Create the Scene object that we shall render.
        this.scene = new Scene();
        
        // Create a Position object that will hold one of the Models.
        var position = new Position();

        // Add the Position object to the scene.
        this.scene.addPosition([position]);

        this.scene.camera.projPerspectiveReset();

        // Push the position away from where the camera is.
        this.pushback = -2.0;
        position.matrix = Matrix.translate(0, 0, this.pushback);

        // Instantiate all the grs models.
        this.modelArray.push(new GRSModel("../assets/grs/bronto_v2.grs"));
        this.modelArray.push(new GRSModel("../assets/grs/rex_v2.grs"));
        this.modelArray.push(new GRSModel("../assets/grs/usa_v2.grs"));
        this.modelArray.push(new GRSModel("../assets/grs/bronto.grs"));
        this.modelArray.push(new GRSModel("../assets/grs/rex.grs"));
        this.modelArray.push(new GRSModel("../assets/grs/usa.grs"));
        this.modelArray.push(new GRSModel("../assets/grs/vinci.grs"));
        this.modelArray.push(new GRSModel("../assets/grs/dragon.grs"));
        this.modelArray.push(new GRSModel("../assets/grs/birdhead.grs"));
        this.modelArray.push(new GRSModel("../assets/grs/knight.grs"));
        this.modelArray.push(new GRSModel("../assets/grs/house.grs"));
        this.modelArray.push(new GRSModel("../assets/grs/scene.grs"));

        // Create a set of x and y axes.
        var axes = new Axes2D(-1, +1, -1, +1, 20, 20);
        // Create a Position object that will hold the exes.
        var axes_p = new Position(axes);
        // Push this position away from where the camera is.
        axes_p.matrix = Matrix.translate(0, 0, this.pushback);
        // Add that Position object to the scene.
        this.scene.addPosition([axes_p]);

        // Give each model a random color.
        for (var m of this.modelArray) {
            ModelShading.setRandomColor(m);
        }
        ModelShading.setColor(axes, Color.Red);

        // Add a model to the first position.
        position.setModel(this.modelArray[this.currentModel]);

        // Switch to a parallel (orthographic) projection.
        this.scene.camera.perspective = false;
        //this.scene.camera.projOrtho();
        
        this.setupViewing();
    }
}