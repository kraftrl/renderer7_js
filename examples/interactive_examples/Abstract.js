import { ModelShading } from '../../scene/ModelShading.js';
import { Matrix } from '../../scene/Matrix.js';
import { Pipeline } from '../../pipeline/Pipeline.js';
import { Rasterize } from '../../pipeline/Rasterize.js';
import { FrameBuffer } from '../../framebuffer/FrameBuffer.js';
import { Clip } from '../../pipeline/Clip.js';

// Used for transformations.
var xTranslation = 0.0;
var yTranslation = 0.0;
var zTranslation = 0.0;
var xRotation = 0.0;
var yRotation = 0.0;
var zRotation = 0.0;
var scale = 1.0;

export class Abstract {

    constructor() {
        this.resizer = document.getElementById("resizer");
        const w = resizer.offsetWidth;
        const h = resizer.offsetHeight;
        this.ctx = document.getElementById("pixels").getContext("2d");
        this.ctx.canvas.width = w;
        this.ctx.canvas.height = h;
        this.fb = new FrameBuffer(undefined, w, h);

        this.letterbox = false;
        this.aspectRatio = 1;
        this.near   =  -1;
        this.left   = -1;
        this.right  =  1;
        this.bottom = -1;
        this.top    =  1;
        this.showCamera = false;
        this.cameraChanged = false;
        this.showFBaspectRatio = false;

        this.showMatrix = false;
        this.pushback = -2;

        this.scene = null;
        this.modelArray = [];
        this.currentModel = 0;
        this.setUpListeners();
        this.print_help_message();
    }

    // A client program can override how transformations are preformed.
    setTransformations(c) {
        if ('=' == c) {
            scale = 1.0;
            xTranslation = 0.0;
            yTranslation = 0.0;
            zTranslation = 0.0;
            xRotation = 0.0;
            yRotation = 0.0;
            zRotation = 0.0;
        }
        else if ('s' == c) { // Scale the model 10% smaller.
            scale /= 1.1;
        }
        else if ('S' == c) { // Scale the model 10% larger.
            scale *= 1.1;
        }
        else if ('x' == c) {
            xTranslation -= 0.1;
        }
        else if ('X' == c) {
            xTranslation += 0.1;
        }
        else if ('y' == c) {
            yTranslation -= 0.1;
        }
        else if ('Y' == c) {
            yTranslation += 0.1;
        }
        else if ('z' == c) {
            zTranslation -= 0.1;
        }
        else if ('Z' == c) {
            zTranslation += 0.1;
        }
        else if ('u' == c) {
            xRotation -= 2.0;
        }
        else if ('U' == c) {
            xRotation += 2.0;
        }
        else if ('v' == c) {
            yRotation -= 2.0;
        }
        else if ('V' == c) {
            yRotation += 2.0;
        }
        else if ('w' == c) {
            zRotation -= 2.0;
        }
        else if ('W' == c) {
            zRotation += 2.0;
        }

        var model_p = this.scene.positionList[this.currentModel];
        model_p.matrix = Matrix.translate(0, 0, this.pushback).mult(
                         Matrix.translate(xTranslation, yTranslation, zTranslation)).mult(
                         Matrix.rotateX(xRotation).mult(Matrix.rotateY(yRotation)).mult(Matrix.rotateZ(zRotation)).mult(Matrix.scaleConst(scale))
                    );
    }

    keyPressed(e) {
        const c = e.key;
        if ('h' == c) {
            this.print_help_message();            
        }
        else if ('a' == c) {
            Rasterize.doAntialiasing = ! Rasterize.doAntialiasing;
            console.log("Anti-aliasing is turned " + (Rasterize.doAntialiasing ? "On" : "Off"));
        }
        else if ('g' == c) {
            Rasterize.doGamma = ! Rasterize.doGamma;
            console.log("Gamma correction is turned " + (Rasterize.doGamma ? "On" : "Off"));
        }
        else if ('d' == c) {
            this.modelArray[this.currentModel].debug = !this.modelArray[this.currentModel].debug;
            Clip.debug = !Clip.debug;
        }
        else if ('D' == c) {
            Rasterize.debug = ! Rasterize.debug;
        }
        else if ('/' == c) {
            this.currentModel = (this.currentModel + 1) % this.modelArray.length;
            this.scene.getPosition(0).setModel( this.modelArray[this.currentModel] );
        }
        else if ('?' == c) {
            if (--this.currentModel < 0) this.currentModel = this.modelArray.length - 1;
            this.scene.getPosition(0).setModel( this.modelArray[this.currentModel] );
         }
         else if ('p' == c) {
            this.scene.camera.perspective = !this.scene.camera.perspective;
            var p = this.scene.camera.perspective ? "perspective" : "orthographic";
            console.log("Using " + p + " projection");
            this.cameraChanged = true; 
        }
        else if ('l' == c) {
            this.letterbox = !this.letterbox;
            if (this.letterbox) {
                console.log("Letter boxing is turned on");
            }
            else {
                console.log("Letter boxing is turned off")
            }
        }
        else if ('r' == c || 'R' == c) {
            // Change the aspect ratio of the camera's view rectangle.
            if ('r' == c) {
                this.aspectRatio -= 0.1;
            }
            else {
                this.aspectRatio += 0.1;
            }
            // Adjust right and left.
            // (Keep the vertical field-of-view fixed.)
            this.right =  this.top * this.aspectRatio;
            this.left  = -this.right;
            console.log("Aspect ratio (of camera's image rectangle) = " + this.aspectRatio);
        }
        else if ('o' == c || 'O' == c) {
            // Change left, right, bottom, and top.
            // (Keep the aspect ratio fixed.)
            if ('o' == c) {
                this.left   += 0.1 * this.aspectRatio;
                this.right  -= 0.1 * this.aspectRatio;
                this.bottom += 0.1;
                this.top    -= 0.1;
            }
            else {
                this.left   -= 0.1 * this.aspectRatio;
                this.right  += 0.1 * this.aspectRatio;
                this.bottom -= 0.1;
                this.top    += 0.1;
            }
            this.cameraChanged = true;
        }
        else if ('f' == c) {
            this.showFBaspectRatio = !this.showFBaspectRatio;
            if (this.showFBaspectRatio) {
                // Get the new size of the FrameBufferPanel.
                var w = this.ctx.canvas.width;
                var h = this.ctx.canvas.height;
                console.log("Aspect ratio (of framebuffer) = " + w/h);
            }
        }
        else if ('c' == c) {
            // Change the solid random color of the current model.
            ModelShading.setRandomColor(this.scene.getPosition(0).model);
        }
        else if ('C' == c) {
            // Change each color in the current model to a random color.
            ModelShading.setRandomColors(this.scene.getPosition(0).model);
        }
        else if ('&' == c) {
            // Change the random color of each vertex of the current model.
            ModelShading.setRandomVertexColors(this.scene.getPosition(0).model);
        }
        else if ('e' == c) {
            // Change the solid random color of each edge of the current model.
            ModelShading.setRandomLineSegmentColors(this.scene.getPosition(0).model);
        }
        else if ('E' == c) {
            // Change the random color of each end of each edge of the current model.
            ModelShading.setRainbowLineSegmentColors(this.scene.getPosition(0).model);
        }
        else if ('M' == c) {
            this.showCamera = !this.showCamera;
            if (this.showCamera) this.cameraChanged = true;
        }
        else if ('m' == c) {
            this.showMatrix = !this.showMatrix;
        }
        else if ('n' == c) {
            // Move the camera's near plane.
            this.near -= 0.01;
        }
        else if ('N' == c) {
            this.near += 0.01;
        }
        
        if ('='==c||'/'==c||'?'==c
            ||'s'==c||'x'==c||'y'==c||'z'==c||'u'==c||'v'==c||'w'==c
            ||'S'==c||'X'==c||'Y'==c||'Z'==c||'U'==c||'V'==c||'W'==c) {
            this.setTransformations(c);
        }

        if (this.showMatrix) {
            //this.displayMatrix(c);
        }

        console.log(this);

        // Render again.
        this.setupViewing();
    }



    // A client program can override the printing of transformation information.
    displayMatrix(c) {
        if ('m'==c||'='==c
            ||'s'==c||'x'==c||'y'==c||'z'==c||'u'==c||'v'==c||'w'==c
            ||'S'==c||'X'==c||'Y'==c||'Z'==c||'U'==c||'V'==c||'W'==c) {
            console.log("xRot = " + this.xRotation[0] + ", yRot = " + this.yRotation[0]  + ", zRot = " + this.zRotation[0]);
            console.log(this.scene.getPosition(0).matrix);
        }
    }

    // Get in one place the code to set up the viewport and the view volume.
    setupViewing() {
        // Set up the camera's view volume.
        if (this.scene.camera.perspective) {
            this.scene.camera.projPerspective(this.left, this.right, this.bottom, this.top, this.near);
        }
        else {
            this.scene.camera.projOrtho(this.left, this.right, this.bottom, this.top);
        }
        
        if (this.showCamera && this.cameraChanged) {
            // console.log(this.scene.camera);
            this.cameraChanged = false;
        }
        
        // render again
        if (this.letterbox) {
            const wFB = this.fb.width;
            const hFB = this.fb.height;
            // Compute the largest possible dimension for a square viewport.
            const dVP = Math.min(wFB, hFB);
            this.fb.setViewport(0, 0, dVP, dVP); // upper left-hand corner
            this.fb.clearFB();
            this.fb.vp.clearVP();
        } else {
            this.fb.setViewport();
            this.fb.vp.clearVP();
        }
        Pipeline.render(this.scene, this.fb.vp);
    
        this.ctx.putImageData(new ImageData(this.fb.pixel_buffer,this.fb.width,this.fb.height), this.fb.vp.vp_ul_x, this.fb.vp.vp_ul_y);
    }

    setUpListeners(){
        const client = this;
        // resize observer
        const resizeObserver = new ResizeObserver(function () {
            const w = client.resizer.offsetWidth;
            const h = client.resizer.offsetHeight;
            client.ctx.canvas.width = w;
            client.ctx.canvas.height = h;
            client.fb = new FrameBuffer(undefined, w, h);
            client.setupViewing();
        });
        resizeObserver.observe(client.resizer);
        // key listener
        document.addEventListener("keypress", function(event) {
            client.keyPressed(event);
        });
    }

    print_help_message()
    {
        console.log("Use the 'd' key to toggle debugging information on and off for the current model.");
        console.log("Use the '/' key to cycle through the models.");
        console.log("Use the 'p' key to toggle between parallel and orthographic projection.");
        console.log("Use the x/X, y/Y, z/Z, keys to translate the model along the x, y, z axes.");
        console.log("Use the u/U, v/V, w/W, keys to rotate the model around the x, y, z axes.");
        console.log("Use the s/S keys to scale the size of the model.");
        console.log("Use the 'c' key to change the random solid model color.");
        console.log("Use the 'C' key to randomly change model's colors.");
        console.log("Use the 'e' key to randomly change the edge colors.");
        console.log("Use the 'E' key to randomly change the end of the edge colors.");
        console.log("Use the 'a' key to toggle antialiasing on and off.");
        console.log("Use the 'g' key to toggle gamma correction on and off.");
        console.log("Use the n/N keys to move the camera's near plane.");
        console.log("Use the o/O keys to change the size of the camera's view rectangle.");
        console.log("Use the r/R keys to change the aspect ratio of the camera's view rectangle.");
        console.log("Use the 'f' key to toggle showing framebufer aspect ratio.");
        console.log("Use the 'l' key to toggle letterboxing on and off.");
        console.log("Use the 'M' key to toggle showing the Camera normalization matrix.");
        console.log("Use the 'm' key to toggle showing the Model transformation matrix.");
        console.log("Use the '=' key to reset the Model transformation matrix to the identity.");
        console.log("Use the 'h' key to redisplay this help message.");
    }
}