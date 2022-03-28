import { Disk } from "../models/Disk.js";
import { Abstract } from "./Abstract.js";
import { ModelShading } from "../scene/ModelShading.js";
import { Position } from "../scene/Position.js";
import { SquareGrid } from "../models/SquareGrid.js";
import { Color } from "../color/Color.js";

export class WindowToTheWorld extends Abstract {

    constructor() {
        super();

        this.scene.positionList = [];

        // Create models for a 3x3 grid of circles and squares.

        // Add all the Models as Positions to the Scene.
        this.scene.addPosition([
            new Position(new Disk(1.0, 10, 40)),
            new Position(new SquareGrid(1.0, 15, 15)),
            new Position(new Disk(1.0, 10, 40)),
            new Position(new SquareGrid(1.0, 15, 15)),
            new Position(new Disk(1.0, 10, 40)),
            new Position(new SquareGrid(1.0, 15, 15)),
            new Position(new Disk(1.0, 10, 40)),
            new Position(new SquareGrid(1.0, 15, 15)),
            new Position(new Disk(1.0, 10, 40))
        ]);

        // Translate eight of the nine models.
        this.moveModel(this.scene.getPosition(0).model,  -2,  2, 0);  // upper left-hand corner
        this.moveModel(this.scene.getPosition(1).model,   0,  2, 0);  // center of top edge
        this.moveModel(this.scene.getPosition(2).model,   2,  2, 0);  // upper right-hand corner
        this.moveModel(this.scene.getPosition(3).model,  -2,  0, 0);  // center of left edge
        //this.moveModel(this.scene.getPosition(4).model,   0,  0, 0);  // the model at the center (already there)
        this.moveModel(this.scene.getPosition(5).model,   2,  0, 0);  // center of right edge
        this.moveModel(this.scene.getPosition(6).model,  -2, -2, 0);  // lower left-hand corner
        this.moveModel(this.scene.getPosition(7).model,   0, -2, 0);  // center of bottom edge
        this.moveModel(this.scene.getPosition(8).model,   2, -2, 0);  // lower right-hand corner

        for (let position of this.scene.getPositionList()){
            ModelShading.setRandomColor(position.model);
        }
        ModelShading.setColor(this.scene.getPosition(4).model, Color.Red); // the model at the center

        this.modelToRotate = this.scene.getPosition(4).model;

        this.setupViewing();
    }

    setupViewing() {
        // Get the size of the FrameBuffer.
        const wFB = this.fb.width;
        const hFB = this.fb.height;

        // The viewport is the whole framebuffer.
        this.fb.setViewport(0, 0, wFB, hFB);

        switch (this.mode){
            default:
            case 1: // 1. upper left-hand corner
                this.left   = -1;
                this.right  = -1 + (2 * wFB) / this.SIZE;
                this.bottom =  1 - (2 * hFB) / this.SIZE;
                this.top    =  1;
                break;
            case 2: // 2. center of the top edge
                this.left   = -wFB / this.SIZE;
                this.right  =  wFB / this.SIZE;
                this.bottom =  1 - (2 * hFB) / this.SIZE;
                this.top    =  1;
                break;
            case 3: // 3. upper right-hand corner
                this.left   = 1 - (2 * wFB) / this.SIZE;
                this.right  = 1;
                this.bottom = 1 - (2 * hFB) / this.SIZE;
                this.top    = 1;
                break;
            case 4: // 4. center of the right edge
                this.left   =  1 - (2 * wFB) / this.SIZE;
                this.right  =  1;
                this.bottom = -hFB / this.SIZE;
                this.top    =  hFB / this.SIZE;
                break;
            case 5: // 5. lower right-hand corner
                this.left   =  1 - (2 * wFB) / this.SIZE;
                this.right  =  1;
                this.bottom = -1;
                this.top    = -1 + (2 * hFB) / this.SIZE;
                break;
            case 6: // 6. center of the bottom edge
                this.left   = -wFB / this.SIZE;
                this.right  =  wFB / this.SIZE;
                this.bottom = -1;
                this.top    = -1 + (2 * hFB) / this.SIZE;
                break;
            case 7: // 7. lower left-hand corner
                this.left   = -1;
                this.right  = -1 + (2 * wFB) / this.SIZE;
                this.bottom = -1;
                this.top    = -1 + (2 * hFB) / this.SIZE;
                break;
            case 8: // 8. centered of the left edge
                this.left   = -1;
                this.right  = -1 + (2 * wFB) / this.SIZE;
                this.bottom = -hFB / this.SIZE;
                this.top    =   hFB / this.SIZE;
                break;
            case 9: // 9. center of the framebuffer
                this.left   = -wFB / this.SIZE;
                this.right  =  wFB / this.SIZE;
                this.bottom = -hFB / this.SIZE;
                this.top    =  hFB / this.SIZE;
                break;
        }

        super.setupViewing();
    }
}
new WindowToTheWorld();