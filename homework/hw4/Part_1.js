import { Hw4_Abstract } from "./Hw4_Abstract.js";

export class Part_1 extends Hw4_Abstract {

    constructor() {
        super();
        
        this.setupViewing();
    }

    setupViewing() {
        // Get the size of the FrameBuffer.
        const wFB = this.fb.width;
        const hFB = this.fb.height;

        // The viewport is the whole framebuffer.
        this.fb.setViewport(0, 0, wFB, hFB);
        
        // Compute the size of the viewport. (SIZE is
        // the initial size for the framebuffer.)
        const wVP = wFB;
        const hVP = hFB;
        const proportion = (wFB < hFB) ? hFB : wFB;

        if (this.mode == 1)
        {
            // 1. upper left-hand corner
            this.scene.camera.projOrtho(-1,                             // left
                                        -1 + (2.0 * wVP) / proportion,  // right
                                        1 - (2.0 * hVP) / proportion,  // bottom
                                        1);                            // top
        }
        else if (this.mode == 2)
        {
            // 2. center of the top edge
            this.scene.camera.projOrtho(-wVP / proportion,              // left
                                        wVP / proportion,               // right
                                        1 - (2.0 * hVP) / proportion,  // bottom
                                        1);                            // top
        }
        else if (this.mode == 3)
        {
            // 3. upper right-hand corner
            this.scene.camera.projOrtho(1 - (2.0 * wVP) / proportion,  // left
                                        1,                             // right
                                        1 - (2.0 * hVP) / proportion,  // bottom
                                        1);                            // top
        }
        else if (this.mode == 4)
        {
            // 4. center of the right edge
            this.scene.camera.projOrtho(1 - (2.0 * wVP) / proportion,  // left
                                        1,                             // right
                                        -hVP / proportion,             // bottom
                                        hVP / proportion);             // top
        }
        else if (this.mode == 5)
        {
            // 5. lower right-hand corner
            this.scene.camera.projOrtho(1 - (2.0 * wVP) / proportion,   // left
                                        1,                              // right
                                        -1,                             // bottom
                                        -1 + (2.0 * hVP) / proportion); // top
        }
        else if (this.mode == 6)
        {
            // 6. center of the bottom edge
            this.scene.camera.projOrtho(-wVP / proportion,              // left
                                        wVP / proportion,               // right
                                        -1,                             // bottom
                                        -1 + (2.0 * hVP) / proportion); // top
        }
        else if (this.mode == 7)
        {
            // 7. lower left-hand corner
            this.scene.camera.projOrtho(-1,                             // left
                                        -1 + (2.0 * wVP) / proportion,  // right
                                        -1,                             // bottom
                                        -1 + (2.0 * hVP) / proportion); // top
        }
        else if (this.mode == 8)
        {
            // 8. centered of the left edge
            this.scene.camera.projOrtho(-1,                             // left
                                        -1 + (2.0 * wVP) / proportion,  // right
                                        -hVP / proportion,              // bottom
                                        hVP / proportion);              // top
        }
        else if (this.mode == 9)
        {
            // 9. center of the framebuffer
            this.scene.camera.projOrtho(-wVP / proportion,      // left
                                        wVP / proportion,       // right
                                        -hVP / proportion,      // bottom
                                        hVP / proportion);      // top
        }

        super.setupViewing();
    }
}
new Part_1();