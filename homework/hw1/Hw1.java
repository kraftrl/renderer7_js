/*


*/

import framebuffer.FrameBuffer;

import java.awt.Color;

/**


*/
public class Hw1
{
   public static void main(String[] args)
   {
      // Check for a file name on the command line.
      if ( 0 == args.length )
      {
         System.err.println("Usage: java Hw1 <PPM-file-name>");
         System.exit(-1);
      }

      // This framebuffer holds the image that will be embedded
      // within two viewports of our larger framebuffer.
      final FrameBuffer fbEmbedded = new FrameBuffer( args[0] );

      /******************************************/

      // Your code goes here.
      // Create a framebuffer. Fill it with the checkerboard pattern.
      // Create a viewport and fill it with a flipped copy of the command-line PPM file.
      // Create another viewport and fill it with another flipped copy of the command-line PPM file.
      // Draw the striped pattern.
      // Create another viewport that covers the selected region of the framebuffer.
      // Create another viewport to hold a "framed" copy of the selected region.
      // Give this viewport a grayish background color.
      // Create another viewport inside the last one.
      // Copy the selected region's viewport into this last viewport.
      // Load Dumbledore into another FrameBuffer.
      // Create a viewport to hold Dumbledore's ghost.
      // Blend Dumbledore from the framebuffer into the viewport.

      FrameBuffer fb = null;


      /******************************************/
      // Save the resulting image in a file.
      final String savedFileName = "Hw1.ppm";
      fb.dumpFB2File( savedFileName );
      System.err.println("Saved " + savedFileName);
   }
}
