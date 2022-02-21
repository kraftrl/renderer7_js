import { FrameBuffer } from "../framebuffer/FrameBuffer.js";
import { Pipeline } from "../pipeline/Pipeline.js";
import { Abstract } from "./Abstract.js";

export class Letterbox extends Abstract {

    constructor() {
        super();

        this.display = function () {
            const resizer = document.getElementById("resizer");
            const wFB = resizer.offsetWidth;
            const hFB = resizer.offsetHeight;
            // Compute the largest possible dimension for a square viewport.
            const dVP = Math.min(wFB, hFB);

            // Compute a displacement for the viewport within the framebuffer.
            const hOffset = (hFB < wFB) ? (wFB - hFB) / 2 : 0;
            const vOffset = (wFB < hFB) ? (hFB - wFB) / 2 : 0;

            // Fit the largest possible viewport, with aspect ratio 1,
            // in the framebuffer, located at the framebuffer's:
            switch (this.mode) {
                default:
                case 1:
                    this.fb.setViewport(0,         0,         dVP, dVP); // 1. upper left-hand corner
                    break;
                case 2:
                    this.fb.setViewport(hOffset,   0,         dVP, dVP); // 2. center of the top edge
                    break;
                case 3:
                    this.fb.setViewport(wFB - dVP, 0,         dVP, dVP); // 3. upper right-hand corner
                    break;
                case 4:
                    this.fb.setViewport(wFB - dVP, vOffset,   dVP, dVP); // 4. center of the right edge
                    break;
                case 5:
                    this.fb.setViewport(wFB - dVP, hFB - dVP, dVP, dVP); // 5, lower right-hand corner
                    break;
                case 6:
                    this.fb.setViewport(hOffset,   hFB - dVP, dVP, dVP); // 6. center of the bottom edge
                    break;
                case 7:
                    this.fb.setViewport(0,         hFB - dVP, dVP, dVP); // 7. lower left-hand corner
                    break;
                case 8:
                    this.fb.setViewport(0,         vOffset,   dVP, dVP); // 8. center of the left edge
                    break;
                case 9:
                    this.fb.setViewport(hOffset,   vOffset,   dVP, dVP); // 9. center of the framebuffer
                    break;
            }

            this.fb.clearFB();
            this.fb.vp.clearVP();
            Pipeline.render(this.scene, this.fb.vp);
        
            // maybe should just store this imageData in Framebuffer
            const imageData = this.ctx.getImageData(0, 0, wFB, hFB);
            // console.log(fb);
            imageData.data.set(this.fb.pixel_buffer);
            this.ctx.putImageData(imageData, this.fb.vp.vp_ul_x, this.fb.vp.vp_ul_y);
        }
        
        this.setupViewing();
    }
}