import { Scene } from './../scene/Scene.js';
import { ModelShading } from './../scene/ModelShading.js';
import { Matrix } from './../scene/Matrix.js';
import { Position } from './../scene/Position.js';
import { Torus } from './../models/Torus.js';
import { CylinderSector } from './../models/CylinderSector.js';
import { ObjSimpleModel } from './../models/ObjSimpleModel.js';
import { Sphere } from './../models/Sphere.js';
import { Cube2 } from './../models/Cube2.js';
import { PanelXY } from './../models/PanelXY.js';
import { PanelXZ } from './../models/PanelXZ.js';
import { InteractiveAbstractClient } from './InteractiveAbstractClient.js';

export class InteractiveModels extends InteractiveAbstractClient {
    /**
       This constructor instantiates the Scene object
       and initializes it with appropriate geometry.
       Then this constructor instantiates the GUI.
    */
    constructor() {
        super();

        this.scene = new Scene();
        
        this.scene.addPosition([new Position(), new Position(), new Position()]);

        // Reset the camera
        this.scene.camera.projPerspectiveReset();
        
        // Pull the positions away from where the camera is
        this.scene.getPosition(0).matrix = Matrix.translate(0, 0, this.pushback);
        this.scene.getPosition(1).matrix = Matrix.translate(0, 0, this.pushback);
        this.scene.getPosition(2).matrix = Matrix.translate(0, 0, this.pushback);

        // Create several Model objects.
        this.modelArray.push(new ObjSimpleModel("../assets/apple.obj"));
        this.modelArray.push(new ObjSimpleModel("../assets/cow.obj"));
        this.modelArray.push(new ObjSimpleModel("../assets/galleon.obj"));
        this.modelArray.push(new ObjSimpleModel("../assets/teapot.obj"));
        this.modelArray.push(new ObjSimpleModel("../assets/cessna.obj"));
        this.modelArray.push( new Sphere(1.0, 30, 30) );
        this.modelArray.push( new CylinderSector(0.5, 1.0, 5, 5) );
        this.modelArray.push( new Torus(0.75, 0.25, 25, 25) );
        this.modelArray.push( new Cube2(15, 15, 15) );
        var floor = new PanelXZ(-7, 7, 3, -1); // floor
        var wall = new PanelXY(-7, 7, -1, 3); // wall
        

        // Give each model a random color.
        for (var m of this.modelArray) {
            ModelShading.setRandomColor(m);
        }
        ModelShading.setRandomColor(wall);
        ModelShading.setRandomColor(floor);
        // ModelShading.setRandomColor(airplane);

        // Add four models to the Scene.
        this.scene.getPosition(0).setModel( this.modelArray[1] );
        this.scene.getPosition(1).setModel( wall );
        this.scene.getPosition(2).setModel( floor );

        // Position the wall, floor.
        this.scene.getPosition(1).matrix.mult( Matrix.translate(0,  0, -3) );// wall
        this.scene.getPosition(2).matrix.mult( Matrix.translate(0, -1,  3) );// floor

        this.setupViewing();
    }

    setTransformations(c) {
        if ('=' == c) {
            // Do nothing as I can't get the matrix multiplication done right
        }
        else if ('s' == c) { // Scale the model 10% smaller.
            this.scene.getPosition(0).matrix.mult(Matrix.scaleConst(1 / 1.1));
        }
        else if ('S' == c) { // Scale the model 10% larger.
            this.scene.getPosition(0).matrix.mult(Matrix.scaleConst(1.1));
        }
        else if ('x' == c) {
            //this.xTranslation[0] -= 0.1;
            this.scene.getPosition(0).matrix.mult(Matrix.translate(-0.1, 0, 0));
        }
        else if ('X' == c) {
            //this.xTranslation[0] += 0.1;
            this.scene.getPosition(0).matrix.mult(Matrix.translate(0.1, 0, 0));
        }
        else if ('y' == c) {
            //this.yTranslation[0] -= 0.1;
            this.scene.getPosition(0).matrix.mult(Matrix.translate(0, -0.1, 0));
        }
        else if ('Y' == c) {
            //this.yTranslation[0] += 0.1;
            this.scene.getPosition(0).matrix.mult(Matrix.translate(0, 0.1, 0));
        }
        else if ('z' == c) {
            //this.zTranslation[0] -= 0.1;
            this.scene.getPosition(0).matrix.mult(Matrix.translate(0, 0, -0.1));
        }
        else if ('Z' == c) {
            //this.zTranslation[0] += 0.1;
            this.scene.getPosition(0).matrix.mult(Matrix.translate(0, 0, 0.1));
        }
        else if ('u' == c) {
            //this.xRotation[0] -= 2.0;
            this.scene.getPosition(0).matrix.mult(Matrix.rotateX(-2.0));
        }
        else if ('U' == c) {
            //this.xRotation[0] += 2.0;
            this.scene.getPosition(0).matrix.mult(Matrix.rotateX(2.0));
        }
        else if ('v' == c) {
            //this.yRotation[0] -= 2.0;
            this.scene.getPosition(0).matrix.mult(Matrix.rotateY(-2.0));
        }
        else if ('V' == c) {
            //this.yRotation[0] += 2.0;
            this.scene.getPosition(0).matrix.mult(Matrix.rotateY(2.0));
        }
        else if ('w' == c) {
            //this.zRotation[0] -= 2.0;
            this.scene.getPosition(0).matrix.mult(Matrix.rotateZ(-2.0));
        }
        else if ('W' == c) {
            //this.zRotation[0] += 2.0;
            this.scene.getPosition(0).matrix.mult(Matrix.rotateZ(2.0));
        }
    }
}
var interactiveModels = new InteractiveModels();
document.addEventListener("keypress", function(e) {
    interactiveModels.keyPressed(e)
});

// window.onresize = function() {
//     interactiveModels.setupViewing();
// };

var resizer = new ResizeObserver(function () {
    interactiveModels.setupViewing();
});
resizer.observe(document.getElementById("resizer"));