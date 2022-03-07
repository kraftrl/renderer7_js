/*


*/
import { FrameBuffer } from '../../framebuffer/FrameBuffer.js'

function main(){
    // Check for a file name on the command line.
    if ( process.argv.length < 3 )
    {
        console.log("Usage: java Hw1 <PPM-file-name>");
        return;
    }

    // This framebuffer holds the image that will be embedded
    // within two viewports of our larger framebuffer.
    const fbEmbedded = new FrameBuffer( process.argv.slice(2) );
    const height = 255;
    const width = 255;
    const startX = 75;
    const startY = 125;
    
    var fb = new FrameBuffer(1000, 600, [192, 56, 14, 255]);
    for (var i = 0; i < 600; i+=100){
        var start = 0;
        if (i/100%2!=0) start = 100;
        for (var j = start; j < 1000; j+=200){
            fb.setViewport(j,i,100,100);
            fb.vp.clearVP([255, 189, 96, 255]);
        }
    }
    
    // first Viewport (fbEmbedded flipped vertically)
    fb.setViewport(startX, startY, width, height);
    for (var i = 0; i < height; i++){
        var flippedY = height - i;
        for (var x = 0; x < width; x++){
            var c = fbEmbedded.getPixelFB(x, i);
            if (c[0] <= 251 || c[1] <= 251 || c[2] <= 251){
                fb.vp.setPixelVP(x, flippedY, c);
            }
        }
    }
    
    // second Viewport (fbEmbedded flipped horizontally)
    startX += 256;
    fb.setViewport(startX, startY, width, height);
    for (var i = 0; i < width; i++){
        var flippedX = width - i;
        for (var y = 0; y < height; y++){
            var c = fbEmbedded.getPixelFB(i, y);
            if (c[0] <= 251 || c[1] <= 251 || c[2] <= 251){
                fb.vp.setPixelVP(flippedX, y, c);
            }
        }
    }
    
    // third Viewport (stripes)
    startX = 610;
    startY = 420;
    width = 300;
    height = 120;
    fb.setViewport(startX, startY, width, height);
    var colorList = [];
    for (var j = 0; j < 2; j++){
        for (var i = 0; i < 30; i++){
            colorList.push([152, 203, 74, 255]);
        }
        for (var i = 0; i < 30; i++){
            colorList.push([84, 129, 230, 255]);
        }
        for (var i = 0; i < 30; i++){
            colorList.push([241, 95, 116, 255]);
        }
    }
    for (var i = width-1; i >= 0; i--){
        var replace = colorList.pop();
        colorList.unshift([replace]);
        for (var j = 0; j < height; j++){
            fb.vp.setPixelVP(i, j, colorList[j]);
        }
    }
    
    // fourth Viewport (selected region)
    startX = 725;
    startY = 25;
    width = 250;
    height = 350;
    fb.setViewport(startX, startY, width, height);
    fb.vp.clearVP([192, 192, 192, 255]);
    for (var i = 0; i < 200; i++){
        var x = 500 + i;
        for (var j = 0; j < 300; j++){
            var y = 200 + j;
            fb.vp.setPixelVP(i + 25, j + 25, fb.getPixelFB(x, y));
        }
    }
    
    // fifth Viewport (Dumbeldore's ghost)
    startX = 400;
    startY = 100;
    width = 500;
    height = 500;
    var dumbledore = new FrameBuffer("Dumbledore.ppm");
    fb.setViewport(startX,startY,width,height);
    for (var i = 0; i < 500; i++){
        for (var j = 0; j < 500; j++){
            var c1 = dumbledore.getPixelFB(i,j);
            if (c1[0] <= 251 || c1[1] <= 251 || c1[2] <= 251){
                var c2 = fb.getPixelFB(startX+i,startY+j);
                var red = Math.floor(.7 * c1[0] + .3 * c2[0]);
                var green = Math.floor(.7 * c1[1] + .3 * c2[1]);
                var blue = Math.floor(.7 * c1[2] + .3 * c2[2]);
                fb.vp.setPixelVP(i, j, [red, green, blue, 255]);
            }
        }
    }
    
    // Save the resulting image in a file.
    const savedFileName = "Hw1.ppm";
    fb.dumpFB2File( savedFileName );
    console.log("Saved " + savedFileName);
}
main();