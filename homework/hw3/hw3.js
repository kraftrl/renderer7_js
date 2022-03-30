import { Scene } from '../../scene/Scene.js';
import { Pipeline } from '../../pipeline/Pipeline.js';
import { FrameBuffer } from '../../framebuffer/FrameBuffer.js';
import { Circle } from '../../models/Circle.js';
import { Square } from '../../models/Square.js';
import { Position} from '../../scene/Position.js';
import { ModelShading } from '../../scene/ModelShading.js';
import { Color } from '../../color/Color.js';
import { Vertex } from '../../scene/Vertex.js';

// Refrence to image.
const fbp = document.getElementById("pixels");  

// arrays used to keep track where the shapes and mouse are at all times
var circle = [-5,5,3,0]; // x, y, radius, selected/unselected
var square1 = [0,0,1,0]; // x, y, sideLength, selected/unselected
var square2 = [-5,-5,2,0]; // x, y, sideLength, selected/unselected
var square3 = [5,5,3,0]; // x, y, sideLength, selected/unselected
var diamond = [5,-5,3,0]; // x, y, radius, selected/unselected
var mousePressedInfo = [0,0]; // x,y
var mouseDraggedInfo = [0,0,0,0]; // xCam,yCam,x,y
var mouseDebug = false;
var mousePress = false; //checks if mouse is pressed for debug info

// Create the Scene object that we shall render
const scene = new Scene();

const right  = 10;
const left   = -right;
const top    = 10;
const bottom = -top;
const near = 2;
scene.camera.projPerspective(left, right, bottom, top, near);

// Create several Model objects.
scene.addPosition( [new Position(new Square(1))] );
scene.addPosition( [new Position(new Square(2))] );
scene.addPosition( [new Position(new Square(3))] );
scene.addPosition( [new Position(new Circle(3, 4))] );
scene.addPosition( [new Position(new Circle(3, 64))] );

// Give each model a useful name.
scene.getPosition(0).model.name = "Square_1";
scene.getPosition(1).model.name = "Square_2";
scene.getPosition(2).model.name = "Square_3";
scene.getPosition(3).model.name = "Diamond";
scene.getPosition(4).model.name = "Circle";

for (var p of scene.positionList) {
	ModelShading.setColor(p.model, Color.White);
}

// Push the models away from where the camera is.
for (var m of scene.positionList)
{
    moveModel(m, 0, 0, -near);
}

// Give each model an initial position in the scene.
moveModel(scene.positionList[0],  0,  0, 0);
moveModel(scene.positionList[1], -5, -5, 0);
moveModel(scene.positionList[2], +5, +5, 0);
moveModel(scene.positionList[3], +5, -5, 0);
moveModel(scene.positionList[4], -5, +5, 0);

// Render.
print_help_message();
updateFB();    
  
document.addEventListener('keypress', keyPressed);
function keyPressed(event) {
    const c = event.key;
    if ('h' == c)
    {
        print_help_message();
    }
    else if ('d' == c)
    {
        Pipeline.debug = ! Pipeline.debug;
    }
    else if ('c' == c)
    {
        Pipeline.doClipping = ! Pipeline.doClipping;
        console.log("Clipping is turned ");
        console.log(Pipeline.doClipping ? "On" : "Off");
    }
    else if('i' == c)
    {
        mouseDebug = ! mouseDebug;
    }
    else if('r' == c)
    {
        var d;
        if(fbp.width < fbp.height)
        {
            d = fbp.width;
        }
        else
        {
            d = fbp.height;
        }
        // Update the panel with new dimensions.
        const panel = document.getElementById("resizer");
        panel.style.width = `${d}px`;
        panel.style.height = `${d}px`;  
    }
    else if('R' == c)
    {
        var d;
        if(fbp.width > fbp.height)
        {
            d = fbp.width;
        }
        else
        {
            d = fbp.height;
        }
        // Update the panel with new dimensions.
        const panel = document.getElementById("resizer");
        panel.style.width = `${d}px`;
        panel.style.height = `${d}px`;  
    }
    updateFB();
}
   
fbp.addEventListener('mouseleave', mouseExited);
function mouseExited(e) {
    // Set every shape to be unselected.
    circle[3] = 0;
    square1[3] = 0;
    square2[3] = 0;
    square3[3] = 0;
    diamond[3] = 0;
    mousePress = false;
}
 
fbp.addEventListener('mousedown', mousePressed);
function mousePressed(event) {
    mousePress = true;
    var xC = 10*((event.clientX-0.5)/(fbp.width/2.001)-1); 
    var yC = -10*((event.clientY-fbp.height+0.5)/(fbp.height/2.001)+1); 
    var zC = -10;

    // Check if a shape is pressed on.
    if(hitSquare(square1[0],square1[1],square1[2],xC,yC))
    {
        if(mouseDebug)
        console.log("Square_1");
        square1[3] = 1;
    }
    
    if(hitSquare(square2[0],square2[1],square2[2],xC,yC))
    {
        if(mouseDebug)
        console.log("Square_2");
        square2[3] = 1;
    }
    
    if(hitSquare(square3[0],square3[1],square3[2],xC,yC))
    {
        if(mouseDebug)
        console.log("Square_3");
        square3[3] = 1;
    }
    
    if(hitDiamond(diamond[0],diamond[1],diamond[2],xC,yC))
    {
        if(mouseDebug)
        console.log("Diamond");
        diamond[3] = 1;
    }
    
    if(hitCircle(circle[0],circle[1],circle[2],xC,yC))
    {
        if(mouseDebug)
        console.log("Circle");
        circle[3] = 1;
    }
    // Get mouse pressed info for debugging.
    mousePressedInfo[0] = xC;
    mousePressedInfo[1] = yC;
    mouseDraggedInfo[0] = xC;
    mouseDraggedInfo[1] = yC;
    mouseDraggedInfo[2] = event.clientX;
    mouseDraggedInfo[3] = event.clientY;
    
    if(mouseDebug) 
    {       
        console.log(new Vertex(xC,yC,zC));
    }
}
 
fbp.addEventListener('mouseup', mouseReleased);
function mouseReleased(e) {
    // Set each shape to be unselected.
    mousePress = false;
    circle[3] = 0;
    square1[3] = 0;
    square2[3] = 0;
    square3[3] = 0;
    diamond[3] = 0;
} 
   
fbp.addEventListener('mousemove', mouseDragged);
function mouseDragged(e) {
    var xC = 10*((e.clientX-0.5)/(fbp.width/2.001)-1); 
    var yC = -10*((e.clientY-fbp.height+0.5)/(fbp.height/2.001)+1); 
    var deltaX = xC - mouseDraggedInfo[0];
    var deltaY = yC - mouseDraggedInfo[1];
    mouseDraggedInfo[0] = xC;
    mouseDraggedInfo[1] = yC;
    if(mouseDebug && mousePress)
        console.log("mouseDeltaX = " + Math.round(e.clientX - mouseDraggedInfo[2]) + ", "
                        + "mouseDeltaY = " + Math.round(-(e.clientY - mouseDraggedInfo[3])));
    mouseDraggedInfo[2] = e.clientX;
    mouseDraggedInfo[3] = e.clientY; 
    var updated = false;
        
    if(square1[3] == 1)
    {
        if(mouseDebug)
        console.log("Square_1");
        square1[0] += deltaX;
        square1[1] += deltaY;     
        moveModel(scene.positionList[0],deltaX,deltaY, 0);
        updated = true;
    }
    
    if(square2[3] == 1)
    {
        if(mouseDebug)
        console.log("Square_2");
        square2[0] += deltaX;
        square2[1] += deltaY;     
        moveModel(scene.positionList[1],deltaX,deltaY, 0);
        updated = true;
    }
    
    if(square3[3] == 1)
    {
        if(mouseDebug)
        console.log("Square_3");
        square3[0] += deltaX;
        square3[1] += deltaY;     
        moveModel(scene.positionList[2],deltaX,deltaY, 0);
        updated = true;
    }
    
    if(diamond[3] == 1)
    {
        if(mouseDebug)
        console.log("Diamond");
        diamond[0] += deltaX;
        diamond[1] += deltaY;     
        moveModel(scene.positionList[3],deltaX,deltaY, 0);
        updated = true;
    }
    
    if(circle[3] == 1)
    {
        if(mouseDebug)
        console.log("Circle");
        circle[0] += deltaX;  
        circle[1] += deltaY; 
        moveModel(scene.positionList[4],deltaX,deltaY, 0);    
        updated = true;   
    }

    if(updated)
        updateFB();
}
   
var resizer = new ResizeObserver(componentResized);
resizer.observe(document.getElementById("resizer"));
function componentResized() { 
    if(mouseDebug) {
        console.log(`FrameBufferPanel [w = ${fbp.width}, h = ${fbp.height}].\n`);                   
    }
    updateFB();
} 

/**
* Move the model.
* 
* @param m
*    The model to move.
* @param deltaX
*    The x distance to move.
* @param deltaY
*    The y distance to move.
* @param deltaZ
*    The z distance to move.
*/
function moveModel(m, deltaX, deltaY, deltaZ) {
    for (var i = 0; i < m.model.vertexList.length; ++i)
    {
        const v = m.model.vertexList[i];
        m.model.vertexList[i] =  new Vertex(v.x + deltaX,
                                        v.y + deltaY,
                                        v.z + deltaZ);
    }
}
   
/**
* Checks if a mouse click (x2,y2) is contained in a circle with center(x1,y1) and radius (r).
* 
* @param x1
*     X coordinate of the circles center.
* @param y1
*     Y coordinate of the circles center.
* @param r
*     Radius of the circle.
* @param x2
*     X coordinate of the mouse click.
* @param y2
*     Y coordinate of the mouse click.
* @return 
*     Returns true if the mouse click is contained in the circle, and false otherwise.
*/
function hitCircle(x1, y1, r, x2, y2) {
    var distToEdge = Math.sqrt((x2-x1)*(x2-x1) + (y2 - y1)*(y2 - y1));
    return distToEdge <= r;
}
   
/**
* Checks if a mouse click (x2,y2) is contained in a square with center(x1,y1) and side length (l).
* 
* @param x1
*     X coordinate of the squares center.
* @param y1
*     Y coordinate of the squares center.
* @param l
*     Length of the side.
* @param x2
*     X coordinate of the mouse click.
* @param y2
*     Y coordinate of the mouse click.
* @return 
*     Returns true if the mouse click is contained in the square, and false otherwise.
*/
function hitSquare(x1, y1, l, x2, y2) {      
    return (x2 >= x1-l) && (x2 <= x1+l) && (y2 >= y1-l) && (y2 <= y1+l);
}
   
/**
* Checks if a mouse click (x2,y2) is contained in a diamond with center(x1,y1) and distance from center to corner (r).
* 
* @param x1
*     X coordinate of the diamonds center.
* @param y1
*     Y coordinate of the diamonds center.
* @param r
*     Distance from the center of the diamond to a corner.
* @param x2
*     X coordinate of the mouse click.
* @param y2
*     Y coordinate of the mouse click.
* @return 
*     Returns true if the mouse click is contained in the diamond, and false otherwise.
*/
function hitDiamond(x1, y1, r, x2, y2) {      
    var dx = Math.abs(x2 - x1);
    var dy = Math.abs(y2 - y1);
    var dist = dx/(2*r) + dy/(2*r);
    return dist <= 0.5;
}

/**
* Print the help message.
*/
function print_help_message() {
    console.log("Use the 'd' key to toggle renderer debugging information on and off.");
    console.log("Use the 'i' key to toggle mouse debugging information on and off.");
    console.log("Use the 'c' key to toggle line clipping on and off.");
    console.log("Use the 'r/R' keys to reset the window's aspect ratio.");
    console.log("Use the 'h' key to redisplay this help message.");
}

/**
* Updates/refreshes the FrameBuffer likely after a shape moves.
*/
function updateFB() {
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