// import { Vertex } from '../../scene/Vertex.js';
// import { Model } from '../../scene/Model.js';
// import { LineSegment } from '../../scene/LineSegment.js';
// import { OrthographicNormalizeMatrix } from '../../scene/OrthographicNormalizeMatrix.js';
// import { PerspectiveNormalizeMatrix } from '../../scene/PerspectiveNormalizeMatrix.js';
//import { ObjSimpleModel } from '../../models/ObjSimpleModel.js';
// import { GRSModel } from '../../models/GRSModel.js';
// import { Cube2 } from '../../models/Cube2.js';
//import { Pyramid } from '../../models/Pyramid.js';
//import { Circle } from '../../models/Circle.js';
//import { CylinderSector } from '../../models/CylinderSector.js';
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

// ModelShading.setColor(scene.getPosition(1).model, Color.Red);
// ModelShading.setColor(scene.getPosition(2).model, Color.Red);
// ModelShading.setColor(scene.getPosition(3).model, Color.Red);

// Create a FrameBuffer to render our scene into.
var width  = 1200;
var height =  900;
var fb = new FrameBuffer(null, width, height);                          

// Create the animation frames.
for (var i = 0; i < 360; i++)
{
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
      
   // Render again.
   fb.clearFB(Color.Black);
   Pipeline.render(scene, fb.vp);
   fb.dumpFB2File("PNW_Frame" + i + ".ppm");
}

