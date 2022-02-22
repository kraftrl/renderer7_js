import { Scene } from './scene/Scene.js';
import { ModelShading } from './scene/ModelShading.js';
import { Matrix } from './scene/Matrix.js';
import { Vertex } from './scene/Vertex.js';
import { Model } from './scene/Model.js';
import { Position } from './scene/Position.js';
import { LineSegment } from './scene/LineSegment.js';
//import { OrthographicNormalizeMatrix } from './scene/OrthographicNormalizeMatrix.js';
//import { PerspectiveNormalizeMatrix } from './scene/PerspectiveNormalizeMatrix.js';
//import { ObjSimpleModel } from './models/ObjSimpleModel.js';
//import { GRSModel } from './models/GRSModel.js';
//import { Cube2 } from './models/Cube2.js';
//import { Pyramid } from './models/Pyramid.js';
import { Axes2D } from './models/Axes2D.js';
//import { Circle } from './models/Circle.js';
//import { CylinderSector } from './models/CylinderSector.js';
import { Pipeline } from './pipeline/Pipeline.js';
import { FrameBuffer } from './framebuffer/FrameBuffer.js';
import { Color } from './color/Color.js';
//import { Square } from './models/Square.js';

// Create the Scene object that we shall render.
const scene = new Scene();

// Since this is a 2D example, we can use an orthographic camera.
var right = 2.0;
var left = -right;
var top = right;
var bottom = -top;
scene.camera.projOrtho(left, right, bottom, top);
// scene.camera.projPerspective(left, right, bottom, top, 1); // added
      
// Create a FrameBuffer to render our scene into.
var width  = 512;
var height = 512;
var fb = new FrameBuffer(null,width,height,Color.Green);

// Create a set of x and y axes.
var axes = new Axes2D(-2, +2, -2, +2, 8, 8);
// Color them red.
ModelShading.setColor(axes, Color.Red);
// Add the axes to the Scene.
var axes_p = new Position(axes);
scene.addPosition([axes_p]);

//Create a Model of a square.
var square = new Model("Example_01");

square.addVertex([new Vertex(0, 0, 0),
                  new Vertex(1, 0, 0),
                  new Vertex(1, 1, 0),
                  new Vertex(0, 1, 0)]);

// square.addColor([Color.Blue,
//                 Color.Red,
//                 Color.Green,
//                 Color.White]);
ModelShading.setColor(square, Color.Black);

square.addLineSegment([new LineSegment(0, 1, 0, 1),
                        new LineSegment(1, 2, 1, 2),
                        new LineSegment(2, 3, 2, 3),
                        new LineSegment(3, 0, 3, 0)]);

// Add the square to the Scene.
var square_p = new Position(square);
scene.addPosition( [square_p] );

// Rotate the square around its corner at the origin.
for(let i = 0; i < 60; i++) {
      // Render again.
      fb.clearFB(Color.White);
      Pipeline.render(scene, fb.vp);
      fb.dumpFB2File("PPM_Example_1_Frame" + i + ".ppm");  

      // Accumulate rotations of the square in the model matrix.
      square_p.matrix.mult( Matrix.rotateZ(6) );
}