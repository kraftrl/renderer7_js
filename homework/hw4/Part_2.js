import { Hw4_Abstract } from "./Hw4_Abstract.js";

export class Part_2 extends Hw4_Abstract {

    constructor() {
        super();
        
        this.setupViewing();
    }

    setupViewing() {
        // Get the size of the FrameBuffer.
        const wFB = this.fb.width;
        const hFB = this.fb.height;

        // Compute the size of the viewport. (SIZE is
        // the initial size for the framebuffer.)
        const wVP = (wFB < this.SIZE) ? wFB : this.SIZE;
        const hVP = (hFB < this.SIZE) ? hFB : this.SIZE;

        if (this.mode == 1)
        {
            // 1. upper left-hand corner
            this.fb.setViewport(0, 0, wVP, hVP);
            this.scene.camera.projOrtho(-1,                             // left
                                        -1 + (2.0 * wVP) / this.SIZE,  // right
                                        1 - (2.0 * hVP) / this.SIZE,  // bottom
                                        1);                          // top
        }
        else if (this.mode == 2)
        {
            // 2. center of the top edge
            this.fb.setViewport((wFB - wVP)/2, 0, wVP, hVP);
            this.scene.camera.projOrtho(-wVP / this.SIZE,               // left
                                        wVP / this.SIZE,                // right
                                        1 - (2.0 * hVP) / this.SIZE,    // bottom
                                        1);                             // top
        }
        else if (this.mode == 3)
        {
            // 3. upper right-hand corner
            this.fb.setViewport(wFB - wVP, 0, wVP, hVP);
            this.scene.camera.projOrtho(1 - (2.0 * wVP) / this.SIZE,    // left
                                        1,                              // right
                                        1 - (2.0 * hVP) / this.SIZE,    // bottom
                                        1);                             // top
        }
        else if (this.mode == 4)
        {
            // 4. center of the right edge
            this.fb.setViewport(wFB - wVP, (hFB - hVP)/2, wVP, hVP);
            this.scene.camera.projOrtho(1 - (2.0 * wVP) / this.SIZE,    // left
                                        1,                              // right
                                        -hVP / this.SIZE,               // bottom
                                        hVP / this.SIZE);               // top
        }
        else if (this.mode == 5)
        {
            // 5. lower right-hand corner
            this.fb.setViewport(wFB - wVP, hFB - hVP, wVP, hVP);
            this.scene.camera.projOrtho( 1 - (2.0 * wVP) / this.SIZE,   // left
                                        1,                              // right
                                        -1,                             // bottom
                                        -1 + (2.0 * hVP) / this.SIZE);  // top
        }
        else if (this.mode == 6)
        {
            // 6. center of the bottom edge
            this.fb.setViewport((wFB - wVP)/2, hFB - hVP, wVP, hVP);
            this.scene.camera.projOrtho(-wVP / this.SIZE,               // left
                                        wVP / this.SIZE,                // right
                                        -1,                             // bottom
                                        -1 + (2.0 * hVP) / this.SIZE);  // top
        }
        else if (this.mode == 7)
        {
            // 7. lower left-hand corner
            this.fb.setViewport(0, hFB - hVP, wVP, hVP);
            this.scene.camera.projOrtho(-1,                             // left
                                        -1 + (2.0 * wVP) / this.SIZE,   // right
                                        -1,                             // bottom
                                        -1 + (2.0 * hVP) / this.SIZE);  // top
        }
        else if (this.mode == 8)
        {
            // 8. centered of the left edge
            this.fb.setViewport(0, (hFB - hVP)/2, wVP, hVP);
            this.scene.camera.projOrtho(-1,                             // left
                                        -1 + (2.0 * wVP) / this.SIZE,   // right
                                        -hVP / this.SIZE,               // bottom
                                        hVP / this.SIZE);               // top
        }
        else if (this.mode == 9)
        {
            // 9. center of the framebuffer
            this.fb.setViewport((wFB - wVP)/2, (hFB - hVP)/2, wVP, hVP);
            this.scene.camera.projOrtho(-wVP / this.SIZE,       // left
                                        wVP / this.SIZE,        // right
                                        -hVP / this.SIZE,       // bottom
                                        hVP / this.SIZE);       // top
        }

        super.setupViewing();
    }
}
new Part_2();