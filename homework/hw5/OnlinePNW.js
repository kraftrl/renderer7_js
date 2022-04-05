import { Scene } from '../../scene/Scene.js';
import { ModelShading } from '../../scene/ModelShading.js';
import { Matrix } from '../../scene/Matrix.js';
import { Position } from '../../scene/Position.js';
import { Axes2D } from '../../models/Axes2D.js';
import { Pipeline } from '../../pipeline/Pipeline.js';
import { FrameBuffer } from '../../framebuffer/FrameBuffer.js';
import { Color } from '../../color/Color.js';
import { P } from './P.js';
import { N } from './N.js';
import { W } from './W.js';

// Create timer.
var timer = null;

// Create the Scene object that we shall render.
const scene = new Scene();

const right  = 4;
const left   = -right;
const top    = 3;
const bottom = -top;
const near = 3;
scene.camera.projPerspective(left, right, bottom, top, near);

// Create a set of x and y axes.
const axes = new Axes2D(-2, +2, -2, +4, 0, 8, 12);
ModelShading.setColor(axes, Color.Red);
const axes_p = new Position(axes);
scene.addPosition([axes_p]);
// Push the axes away from where the camera is.
axes_p.matrix = Matrix.translate(0, 0, -near);

//Add the letters to the Scene.
scene.addPosition( [new Position(new P())] );
scene.addPosition( [new Position(new N())] );
scene.addPosition( [new Position(new W())] );

// Give the letters random colors.
ModelShading.setRandomColor(scene.getPosition(1).model); // P
ModelShading.setRandomColor(scene.getPosition(2).model); // N
ModelShading.setRandomColor(scene.getPosition(3).model); // W

// Create a FrameBuffer to render our scene into.
var width  = 1200;
var height =  900;
var fb = new FrameBuffer(null, width, height);                          

displayNextFrame();

function display(){
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
	Pipeline.render(scene, fb.vp);

	ctx.putImageData(new ImageData(fb.pixel_buffer,fb.width, fb.height), fb.vp.vp_ul_x, fb.vp.vp_ul_y);
}

function displayNextFrame() {
    timer = setInterval(function() {
    rotateModels();
    display();
    }, 1000/30);
}

var i = 0;
function rotateModels() {
   // Push the letters away from the camera/get into starting positions.
   scene.getPosition(1).matrix = Matrix.translate(-2, 0, -near); // P
   scene.getPosition(2).matrix = Matrix.translate(-0.5, 0, -near); // N
   scene.getPosition(3).matrix = Matrix.translate(1, 0, -near); // W
   
   // do P
   scene.getPosition(1).matrix.mult(Matrix.translate(2, 0, 0));
   scene.getPosition(1).matrix.mult(Matrix.rotateZ(-i));
   scene.getPosition(1).matrix.mult(Matrix.translate(-2, 0, 0));
   
   // do N
   var translateYDirection = (-2.0/90)*i; // if i <= 90
   if(i > 90)
   {
      translateYDirection = -(2.0/90.0)*(180-i);
   }
   if(i > 270)
   {
      translateYDirection = (2.0/90)*(360-i);
   }
      
   // Rotate N around its center axis.
   scene.getPosition(2).matrix.mult(Matrix.translate(0.5, 0.0, 0.0));
   scene.getPosition(2).matrix.mult( Matrix.rotateY(i) );           
   scene.getPosition(2).matrix.mult( Matrix.translate(-0.5, 0.0, 0.0) );
   // Translate N along the y-axis.
   scene.getPosition(2).matrix.mult( Matrix.translate(0.0, translateYDirection , 0.0) );
      
   // do W
   scene.getPosition(3).matrix.mult( Matrix.translate(0.5, 1.0, 0.0) );
   scene.getPosition(3).matrix.mult( Matrix.rotateZ(2*i) );
   scene.getPosition(3).matrix.mult( Matrix.translate(-0.5, -1.0, 0.0) );

   if(i == 360) {i = 0;} else {i++;}
}

var played = true;
document.addEventListener('keypress', keyPressed);
function keyPressed(event) {
    const c = event.key;
    //var played = true;
    if ('f' == c)
    {
        if (!played)
            rotateModels();
    }
    else if ('p' == c) {
        if (played) {
            clearInterval(timer);
            played = false;
        } else {
            displayNextFrame();
            played = true;
        }
    }
    display();
}

var resizer = new ResizeObserver(display);
resizer.observe(document.getElementById("resizer"));
