import { FrameBuffer } from '../../framebuffer/FrameBuffer.js';
import { Disk } from '../../models/Disk.js';
import { Clip } from '../../pipeline/Clip.js';
import { Pipeline } from '../../pipeline/Pipeline.js';
import { Rasterize } from '../../pipeline/Rasterize.js';
import { Matrix } from '../../scene/Matrix.js';
import { ModelShading } from '../../scene/ModelShading.js';
import { Position } from '../../scene/Position.js';
import { Scene } from '../../scene/Scene.js';
import { Vertex } from '../../scene/Vertex.js';

export class Hw4_Abstract {

    constructor() {
        this.resizer = document.getElementById("resizer");
        const w = resizer.offsetWidth;
        const h = resizer.offsetHeight;
        this.ctx = document.getElementById("pixels").getContext("2d");
        this.ctx.canvas.width = w;
        this.ctx.canvas.height = h;
        this.fb = new FrameBuffer(undefined, w, h);

        this.SIZE = 300;
        this.showCamera = false;
        this.cameraChanged = false;
        this.showFBaspectRatio = false;
        this.aspectRatio = 1;
        this.near   =  1;
        this.left   = -1;
        this.right  =  1;
        this.bottom = -1;
        this.top    =  1;
        this.pushback = -2;
        this.mode = 1;
        this.scene = new Scene();
        this.scene.camera.projOrtho(this.left, this.right, this.bottom, this.top);
        var model = new Disk(1, 10, 40);
        this.modelArray = [ model ];
        this.modelToRotate = model;
        ModelShading.setRandomColor(model);
        var position = new Position(this.modelArray[0]);
        this.scene.addPosition([ position ]);
        position.matrix = Matrix.translate(0, 0, 2);
        this.fps = 30;
        const thisClass = this;
        this.timer = undefined;
        this.print_help_message();
    }

    moveModel(model, deltaX, deltaY, deltaZ) {        
        for (var i = 0; i < model.vertexList.length; ++i) {
            const v = model.vertexList[i];
            model.vertexList[i] = new Vertex(v.x + deltaX,
                                             v.y + deltaY,
                                             v.z + deltaZ);
        }
    }

    rotateModel(model, angle) {
        angle = angle * Math.PI / 180; // convert to radians

        for (var i = 0; i < model.vertexList.length; ++i) {
            const v = model.vertexList[i];
            model.vertexList[i] = new Vertex(v.x * Math.cos(angle) - v.y * Math.sin(angle),
                                             v.x * Math.sin(angle) + v.y * Math.cos(angle),
                                             v.z);
        }
    }

    // Get in one place the code to set up the viewport and the view volume.
    setupViewing() {
        
        if (this.showCamera && this.cameraChanged) {
            // console.log(this.scene.camera);
            this.cameraChanged = false;
        }
        
        //render again
        this.fb.clearFB();
        this.fb.vp.clearVP();
        Pipeline.render(this.scene, this.fb.vp);
    
        this.ctx.putImageData(new ImageData(this.fb.pixel_buffer,this.fb.width,this.fb.height), 0, 0);
    }

    keyPressed(e) {
        const c = e.key;
        if ('h' == c) {
            print_help_message();        
        } else if ('d' == c) {
            this.modelArray[0].debug = !this.modelArray[0].debug;
            Clip.debug = !Clip.debug;
        } else if ('D' == c) {
            Rasterize.debug = ! Rasterize.debug;
        } else if ('a' == c) {
            Rasterize.doAntialiasing = ! Rasterize.doAntialiasing;
            console.log("Anti-aliasing is turned " + Rasterize.doAntialiasing ? "On" : "Off");
        } else if ('g' == c) {
            Rasterize.doGamma = ! Rasterize.doGamma;
            console.log("Gamma correction is turned " + Rasterize.doGamma ? "On" : "Off");
        } else if ('f' == c) {
            this.showFBaspectRatio = !this.showFBaspectRatio;
            if (this.showFBaspectRatio) {
                console.log("Aspect ratio (of framebuffer) = " + this.fb.width/this.fb.height);
            }
        } else if ('c' == c) {
            // Change the solid random color of the current model.
            ModelShading.setRandomColor(this.scene.getPosition(0).model);
        } else if ('C' == c) {
            // Change each color in the current model to a random color.
            ModelShading.setRandomColors(this.scene.getPosition(0).model);
        } else if ('e' == c && e.altKey()) {
            // Change the random color of each vertex of the current model.
            ModelShading.setRandomVertexColors(this.scene.getPosition(0).model);
        } else if ('e' == c) {
            // Change the solid random color of each edge of the current model.
            ModelShading.setRandomLineSegmentColors(this.scene.getPosition(0).model);
        } else if ('E' == c) {
            // Change the random color of each end of each edge of the current model.
            ModelShading.setRainbowLineSegmentColors(this.scene.getPosition(0).model);
        } else if ('M' == c) {
            this.showCamera = !this.showCamera;
            if (this.showCamera) this.cameraChanged = true;
        } else if ('m' == c) {
            this.showMatrix = !this.showMatrix;
        } else if ('s' == c) {
            // stop the rotation.
            clearInterval(this.timer);
        } else if ('S' == c) {
            // Start the rotation.
            const thisClass = this;
            this.timer = setInterval(function() {
                thisClass.rotateModel(thisClass.modelToRotate, 10); // 10 degrees
                thisClass.setupViewing();
            }, 1000/this.fps);
        } else if ('1' == c) {
            this.mode = 1;
        } else if ('2' == c) {
            this.mode = 2;
        } else if ('3' == c) {
            this.mode = 3;
        } else if ('4' == c) {
            this.mode = 4;
        } else if ('5' == c) {
            this.mode = 5;
        } else if ('6' == c) {
            this.mode = 6;
        } else if ('7' == c) {
            this.mode = 7;
        } else if ('8' == c) {
            this.mode = 8;
        } else if ('9' == c) {
            this.mode = 9;
        }
        //console.log(this);

        // Render again.
        this.setupViewing();
    }
    
   print_help_message() {
      console.log("Use the 'd/D' key to toggle debugging information on and off.");
      console.log("Use the 'a' key to toggle antialiasing on and off.");
      console.log("Use the 'g' key to toggle gamma correction on and off.");
      console.log("Use the 'f' key to toggle showing framebuffer aspect ratio.");
      console.log("Use the 'm' key to toggle showing the Camera data.");
      console.log("Use the 's/S' key to stop/Start the rotation.");
      console.log("Use the '1' through '9' keys to choose a letterbox/crop/window mode.");
      console.log("Use the 'h' key to redisplay this help message.");
   }
}