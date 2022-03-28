/*

*/
import { Scene } from '../../scene/Scene.js';
import { Canopy } from './fractals/Canopy.js';
import { KochCurve } from './fractals/KochCurve.js';
import { H_Tree } from './fractals/H_Tree.js';
import { SierpinskiTriangle } from './fractals/SierpinskiTriangle.js';
import { BoxFractal } from './fractals/BoxFractal.js';
import { C_Curve } from './fractals/C_Curve.js';
import { PythagorasTree } from './fractals/PythagorasTree.js';
import { Position } from '../../scene/Position.js';
import { FrameBuffer } from '../../framebuffer/FrameBuffer.js';
import { Pipeline } from '../../pipeline/Pipeline.js';
import { Matrix } from '../../scene/Matrix.js';
import { ModelShading } from '../../scene/ModelShading.js'
import { Color } from '../../color/Color.js';

export class InteractiveModelsAll {
    constructor() {
        // Used for transformations.
        this.xTranslation = 0.0;
        this.yTranslation = 0.0;
        this.zTranslation = 0.0;
        this.scale = 1.0;

        this.ctx = document.getElementById('pixels');

        // Create the Scene object that we shall render
        this.scene = new Scene();
        this.scene.camera.projPerspective(-2, 2, -2, 2, 2);

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
            new Position(new Canopy(46, 16)),

            new Position(new KochCurve(0)),
            new Position(new KochCurve(1)),
            new Position(new KochCurve(2)),
            new Position(new KochCurve(3)),
            new Position(new KochCurve(4)),
            new Position(new KochCurve(5)),
            new Position(new KochCurve(6)),
            new Position(new KochCurve(7)),

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
            new Position(new H_Tree(16)),

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
            new Position(new SierpinskiTriangle(10)),

            new Position(new BoxFractal(0)),
            new Position(new BoxFractal(1)),
            new Position(new BoxFractal(2)),
            new Position(new BoxFractal(3)),
            new Position(new BoxFractal(4)),
            new Position(new BoxFractal(5)),
            new Position(new BoxFractal(6)),
            new Position(new BoxFractal(7)),
            new Position(new BoxFractal(8)),

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
            new Position(new C_Curve(20)),

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

        var thisClass = this;
        document.addEventListener("keypress", function(e) {
            thisClass.keyPressed(e);
        });
        const resizer = new ResizeObserver(function () {
            thisClass.display();
        });
        resizer.observe(document.getElementById("resizer"));

        this.display();
        this.print_help_message();
    }

    keyPressed(event) {
        const c = event.key;
        if ('h' == c) {
            this.print_help_message();
            return;
        }
        else if ('d' == c) {
            Pipeline.debug = !Pipeline.debug;
        }
        else if ('a' == c) {
            Rasterize.doAntialiasing = ! Rasterize.doAntialiasing;
            console.log("Anti-aliasing is turned " + (Rasterize.doAntialiasing ? "On" : "Off"));
        }
        else if ('g' == c) {
            Rasterize.doGamma = ! Rasterize.doGamma;
            console.log("Gamma correction is turned " + (Rasterize.doGamma ? "On" : "Off"));
        }
        else if ('i' == c){
           const verts = this.scene.getPosition(this.currentPosition).model.vertexList.length;
           const lines = this.scene.getPosition(this.currentPosition).model.lineSegmentList.length;
           console.log("The current Model has " + verts + " vertices and " + 
                        lines + " line segments.");
        }
        else if ('c' == c) {
            ModelShading.setRandomColor(this.scene.positionList[this.currentPosition].model);
        }
        else if ('C' == c) {
            ModelShading.setRandomLineSegmentColors(this.scene.positionList[this.currentPosition].model);
        }
        else if ('/' == c) {
            this.scene.getPosition(this.currentPosition).model.visible = false;
            this.currentPosition = (this.currentPosition + 1) % (this.scene.positionList.length - 1);
            this.scene.getPosition(this.currentPosition).model.visible = true;
        }
        else if ('?' == c) {
            this.scene.getPosition(this.currentPosition).model.visible = false;
            if (--this.currentPosition < 0) this.currentPosition = this.scene.positionList.length - 2;
            this.scene.getPosition(this.currentPosition).model.visible = true;
        }
        else if ('p' == c) {
            this.scene.camera.perspective = ! this.scene.camera.perspective;
            let p = this.scene.camera.perspective ? "perspective" : "orthographic";
            console.log("Using " + p + " projection");
        }
        else if ('s' == c) {
            this.scale /= 1.1; 
        }
        else if ('S' == c) {
            this.scale *= 1.1;
        }
        else if ('x' == c) {
            this.xTranslation += -0.1;
        }
        else if ('y' == c) {
            this.yTranslation += -0.1;
        }
        else if ('z' == c) {
            this.zTranslation += -0.1;
        }
        else if ('X' == c) {
            this.xTranslation += 0.1;
        }
        else if ('Y' == c) {
            this.yTranslation += 0.1;
        }
        else if ('Z' == c) {
            this.zTranslation += 0.1;
        }
        else if ('=' == c) {
            this.scale = 1.0;
            this.xTranslation = 0.0;
            this.yTranslation = 0.0;
            this.zTranslation = 0.0;
        }
        
        var model_p = this.scene.positionList[this.currentPosition];
        model_p.matrix = Matrix.translate(0, 0, -1).
                            mult(Matrix.translate(this.xTranslation, this.yTranslation, this.zTranslation)).
                            mult(Matrix.scaleConst(this.scale));
                            
        // add image data
        this.display();
    }

    display(){
        const resizer = document.getElementById("resizer");
        const w = resizer.offsetWidth;
        const h = resizer.offsetHeight;
        const ctx = document.getElementById("pixels").getContext("2d");
        if (ctx == null) {
            console.log("cn.getContext(2d) is null");
            return;
        }
        ctx.canvas.width = w;
        ctx.canvas.height = h;
        const fb = new FrameBuffer(undefined, w, h);
        Pipeline.render(this.scene, fb.vp);
    
        ctx.putImageData(new ImageData(fb.pixel_buffer,fb.width,fb.height), fb.vp.vp_ul_x, fb.vp.vp_ul_y);
    }

    print_help_message()
    {
        console.log("Use the 'd/D' keys to toggle debugging information on and off for the current model.");
        console.log("Use the 'i' key to get information about the current model.");
        console.log("Use the '/' key to cycle through the models.");
        console.log("Use the 'p' key to toggle between parallel and orthographic projection.");    
        console.log("Use the x/X, y/Y, z/Z, keys to translate the model along the x, y, z axes.");
        console.log("Use the s/S keys to scale the size of the model.");
        console.log("Use the 'm' key to toggle the display of transformation information.");
        console.log("Use the 'c' key to toggle line clipping on and off.");
        console.log("Use the 'h' key to redisplay this help message.");
    }

}