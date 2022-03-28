import { Abstract } from "./Abstract.js";

export class Crop extends Abstract {

    constructor() {
        super();
        
        this.SIZE = 500;
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

        switch (this.mode){    
            default:
            case 1: // 1. upper left-hand corner
                this.fb.setViewport(0, 0, wVP, hVP);
                this.left   = -1;
                this.right  = -1 + (2.0 * wVP) / this.SIZE;
                this.bottom =  1 - (2.0 * hVP) / this.SIZE;
                this.top    =  1;
                break;
            case 2: // 2. center of the top edge
                this.fb.setViewport((wFB - wVP)/2, 0, wVP, hVP);
                this.left   = -wVP / this.SIZE;
                this.right  =  wVP / this.SIZE;
                this.bottom =  1 - (2.0 * hVP) / this.SIZE;
                this.top    =  1;
                break;
            case 3: // 3. upper right-hand corner
                this.fb.setViewport(wFB - wVP, 0, wVP, hVP);
                this.left   = 1 - (2.0 * wVP) / this.SIZE;
                this.right  = 1;
                this.bottom = 1 - (2.0 * hVP) / this.SIZE;
                this.top    = 1;
                break;
            case 4: // 4. center of the right edge
                this.fb.setViewport(wFB - wVP, (hFB - hVP)/2, wVP, hVP);
                this.left   =  1 - (2.0 * wVP) / this.SIZE;
                this.right  =  1;
                this.bottom = -hVP / this.SIZE;
                this.top    =  hVP / this.SIZE;
                break;
            case 5: // 5. lower right-hand corner
                this.fb.setViewport(wFB - wVP, hFB - hVP, wVP, hVP);
                this.left   =  1 - (2.0 * wVP) / this.SIZE;
                this.right  =  1;
                this.bottom = -1;
                this.top    = -1 + (2.0 * hVP) / this.SIZE;
                break;
            case 6: // 6. center of the bottom edge
                this.fb.setViewport((wFB - wVP)/2, hFB - hVP, wVP, hVP);
                this.left   = -wVP / this.SIZE;
                this.right  =  wVP / this.SIZE;
                this.bottom = -1;
                this.top    = -1 + (2.0 * hVP) / this.SIZE;
                break;
            case 7: // 7. lower left-hand corner
                this.fb.setViewport(0, hFB - hVP, wVP, hVP);
                this.left   = -1;
                this.right  = -1 + (2.0 * wVP) / this.SIZE;
                this.bottom = -1;
                this.top    = -1 + (2.0 * hVP) / this.SIZE;
                break;
            case 8: // 8. centered of the left edge
                this.fb.setViewport(0, (hFB - hVP)/2, wVP, hVP);
                this.left   = -1;
                this.right  = -1 + (2.0 * wVP) / this.SIZE;
                this.bottom = -hVP / this.SIZE;
                this.top    =  hVP / this.SIZE;
                break;
            case 9: // 9. center of the framebuffer
                this.fb.setViewport((wFB - wVP)/2, (hFB - hVP)/2, wVP, hVP);
                this.left   = -wVP / this.SIZE;
                this.right  =  wVP / this.SIZE;
                this.bottom = -hVP / this.SIZE;
                this.top    =  hVP / this.SIZE;
                break;
        }

        super.setupViewing();
    }
}
new Crop();