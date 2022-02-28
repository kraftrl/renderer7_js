import { Abstract } from "./Abstract.js";

export class PanAndScan extends Abstract {

    constructor() {
        super();

        this.SIZE = 500;
        this.sliderValueH = 50;
        this.sliderValueV = 50;
        this.sliderH = document.getElementById("sliderH");
        this.sliderV = document.getElementById("sliderV");

        const thisClass = this;
        this.sliderH.oninput = this.sliderV.oninput = function() { 
            thisClass.sliderValueV = thisClass.sliderV.value;
            thisClass.sliderValueH = thisClass.sliderH.value;
            console.log("slider_H = " + thisClass.sliderValueH + ", "
                      + "slider_V = " + thisClass.sliderValueV);
            thisClass.setupViewing(); 
        };
    }

    setupViewing() {
        const w = this.fb.width;
        const h = this.fb.height;
    
        // Create a viewport.
        var vpX = 0;
        var vpY = 0;
        var vpW = w;
        var vpH = h;
        if (w > this.SIZE) {
            vpW = this.SIZE;
            vpX = (w - this.SIZE)/2;
        }
        if (h > this.SIZE) {
            vpH = this.SIZE;
            vpY = (h - this.SIZE)/2;
        }
        this.fb.setViewport(vpX, vpY, vpW, vpH);
    
        // Create a view volume whose aspect ratio matches the
        // viewport's aspect ratio.
        this.left   = -(vpW/this.SIZE);
        this.right  =  (vpW/this.SIZE);
        this.bottom = -(vpH/this.SIZE);
        this.top    =  (vpH/this.SIZE);
        // Use the slider value to pan the view volume across the scene.
        this.left   += (this.sliderValueH - 50.0)/50.0 * (1.0 - vpW/this.SIZE);
        this.right  += (this.sliderValueH - 50.0)/50.0 * (1.0 - vpW/this.SIZE);
        this.bottom += (50.0 - this.sliderValueV)/50.0 * (1.0 - vpH/this.SIZE);
        this.top    += (50.0 - this.sliderValueV)/50.0 * (1.0 - vpH/this.SIZE);

        super.setupViewing();
    }
}