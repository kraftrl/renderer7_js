import { Scene } from '../../scene/Scene.js';
import { ModelShading } from '../../scene/ModelShading.js';
import { Matrix } from '../../scene/Matrix.js';
import { Position } from '../../scene/Position.js';
import { Torus } from '../../models/Torus.js';
import { CylinderSector } from '../../models/CylinderSector.js';
import { ObjSimpleModel } from '../../models/ObjSimpleModel.js';
import { Sphere } from '../../models/Sphere.js';
import { Cube2 } from '../../models/Cube2.js';
import { PanelXY } from '../../models/PanelXY.js';
import { PanelXZ } from '../../models/PanelXZ.js';
import { Abstract } from './Abstract.js';

export class Models extends Abstract {
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

        // Create several Model objects.
        this.modelArray.push(new ObjSimpleModel("../../assets/apple.obj"));
        this.modelArray.push(new ObjSimpleModel("../../assets/cow.obj"));
        this.modelArray.push(new ObjSimpleModel("../../assets/galleon.obj"));
        this.modelArray.push(new ObjSimpleModel("../../assets/teapot.obj"));
        this.modelArray.push(new ObjSimpleModel("../../assets/cessna.obj"));
        this.modelArray.push(new Sphere(1, 30, 30) );
        this.modelArray.push(new CylinderSector(0.5, 1, 5, 5) );
        this.modelArray.push(new Torus(0.75, 0.25, 25, 25) );
        this.modelArray.push(new Cube2(15, 15, 15) );
        var wall = new PanelXY(-4, 4, -1, 3); // wall
        var floor = new PanelXZ(-4, 4, -2, 0); // floor
        

        // Give each model a random color.
        for (var m of this.modelArray) {
            ModelShading.setRandomColor(m);
        }
        ModelShading.setRandomColor(wall);
        ModelShading.setRandomColor(floor);

        // Add four models to the Scene.
        this.scene.getPosition(0).setModel( this.modelArray[0] );
        this.scene.getPosition(1).setModel( wall );
        this.scene.getPosition(2).setModel( floor );

        // Position the wall, floor.
        this.scene.getPosition(0).matrix.mult(Matrix.translate(0, 0, this.pushback));
        this.scene.getPosition(1).matrix.mult(Matrix.translate(0, 0, -4));
        this.scene.getPosition(2).matrix.mult(Matrix.translate(0,-1, this.pushback));

        this.setupViewing();
    }
}
new Models();