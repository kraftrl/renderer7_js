import { ModelShading } from './../scene/ModelShading.js';
import { Matrix } from './../scene/Matrix.js';
import { Pipeline } from './../pipeline/Pipeline.js';
import { Rasterize } from './../pipeline/Rasterize.js';
import { FrameBuffer } from '../framebuffer/FrameBuffer.js';

export class InteractiveAbstractClient {

    constructor() {
        this.letterbox = false;
        this.aspectRatio = 1.0;
        this.near   =  1.0;
        this.left   = -1.0;
        this.right  =  1.0;
        this.bottom = -1.0;
        this.top    =  1.0;
        this.showCamera = false;
        this.cameraChanged = false;
        this.showFBaspectRatio = false;

        this.showMatrix = false;
        this.pushback = 2.0;
        
        // I am unable to get the method chaining to work. Keep on getting NaNs that I can't trace.        
        /*
        this.xTranslation = [0.0];
        this.yTranslation = [0.0];
        this.zTranslation = [0.0];
        this.xRotation = [0.0];
        this.yRotation = [0.0];
        this.zRotation = [0.0];
        this.scale = [1.0];
        */

        this.scene = null;
        this.modelArray = [];
        
        this.cn = document.getElementById("pixels");;
        this.ctx = this.cn.getContext("2d");
    }

    // A client program can override how transformations are preformed.
    setTransformations(c) {
        if ('=' == c) {
            /*
            this.scale[0] = 1.0;
            this.xTranslation[0] = 0.0;
            this.yTranslation[0] = 0.0;
            this.zTranslation[0] = 0.0;
            this.xRotation[0] = 0.0;
            this.yRotation[0] = 0.0;
            this.zRotation[0] = 0.0;
            */
        }
        else if ('s' == c) { // Scale the model 10% smaller.
            //this.scale[0] /= 1.1;
            this.scene.getPosition(0).matrix.mult(Matrix.scaleConst(1 / 1.1));
        }
        else if ('S' == c) { // Scale the model 10% larger.
            //this.scale[0] *= 1.1
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


        // I am unable to get the method chaining to work. Keep on getting NaNs that I can't trace.
        /*
        // Set the model-to-view transformation matrix.
        // The order of the transformations is very important!
        var model_p = this.scene.getPosition(0);
        // Push the model away from where the camera is
        // and move the model relative to its new position.

        
        model_p.matrix = Matrix.translate(0, 0, this.pushback)
                        .mult( Matrix.translate(this.xTranslation[0],
                                                this.yTranslation[0],
                                                this.zTranslation[0]) )
                        .mult( Matrix.rotateX(this.xRotation[0]) )
                        .mult( Matrix.rotateY(this.yRotation[0]) )
                        .mult( Matrix.rotateZ(this.zRotation[0]) )
                        .mult( Matrix.scale(this.scale[0]) );
        */
    }

    keyPressed(e) {
         var c = e.key;
         if ('h' == c) {
            print_help_message();
            
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
            this.currentModel -= 1;
            if (this.currentModel < 0) this.currentModel = this.modelArray.length - 1;
            this.scene.getPosition(0).setModel( this.modelArray[this.currentModel] );
         }
         else if ('p' == c) {
            this.scene.camera.perspective = !scene.camera.perspective;
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
            if (showFBaspectRatio) {
                // Get the new size of the FrameBufferPanel.
                var w = ctx.canvas.width;
                var h = ctx.canvas.height;
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
        else if ('e' == c && e.altKey()) {
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
            if (showCamera) this.cameraChanged = true;
        }
        else if ('m' == c) {
            this.showMatrix = !this.showMatrix;
        }
        
        if ('='==c||'/'==c||'?'==c
            ||'s'==c||'x'==c||'y'==c||'z'==c||'u'==c||'v'==c||'w'==c
            ||'S'==c||'X'==c||'Y'==c||'Z'==c||'U'==c||'V'==c||'W'==c) {
            console.log(this);
            this.setTransformations(c);
        }

        if (this.showMatrix) {
            //this.displayMatrix(c);
        }

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
            console.log(this.scene.camera);
            this.cameraChanged = false;
        }
        
        this.display();
    }

    display(){
        this.cn = document.getElementById("pixels");;
        this.ctx = this.cn.getContext("2d");
        if (this.ctx == null) {
            console.log("cn.getContext(2d) is null");
            return;
        }
        const fb = new FrameBuffer(undefined,window.innerWidth,window.innerHeight,undefined);
        this.ctx.canvas.width = window.innerWidth;
        this.ctx.canvas.height = window.innerHeight;
        Pipeline.render(this.scene, fb.vp);
    
        // probably should just store this imageData in Framebuffer
        const imageData = this.ctx.getImageData(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        console.log(fb);
        imageData.data.set(fb.pixel_buffer);
        this.ctx.putImageData(imageData, fb.vp.vp_ul_x, fb.vp.vp_ul_y);
    }
}