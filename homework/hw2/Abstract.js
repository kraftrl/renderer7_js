/*

*/
import { Scene } from '../../scene/Scene.js';
import { FrameBuffer } from '../../framebuffer/FrameBuffer.js';
import { Pipeline } from '../../pipeline/Pipeline.js';
import { Matrix } from '../../scene/Matrix.js';
import { ModelShading } from '../../scene/ModelShading.js'

export class Abstract {
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

        // add positions to scene in individual modules

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