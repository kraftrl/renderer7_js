import { Model } from './../scene/Model.js';
import { LineSegment } from './../scene/LineSegment.js';
import { Vertex } from './../scene/Vertex.js';

/*

*/


/**


*/
export class W extends Model
{
   /**
      The letter W.
   */
   constructor()
   {
      super("W");

      this.addVertex([new Vertex(0.0, 1.00, 0.0),  // front face
                new Vertex(0.2, 1.00, 0.0),
                new Vertex(0.3, 0.45, 0.0),
                new Vertex(0.4, 1.00, 0.0),
                new Vertex(0.6, 1.00, 0.0),
                new Vertex(0.7, 0.45, 0.0),
                new Vertex(0.8, 1.00, 0.0),
                new Vertex(1.0, 1.00, 0.0),
                new Vertex(0.8, 0.00, 0.0),
                new Vertex(0.6, 0.00, 0.0),
                new Vertex(0.5, 0.55, 0.0),
                new Vertex(0.4, 0.00, 0.0),
                new Vertex(0.2, 0.00, 0.0),

                new Vertex(0.0, 1.00, -0.25),  // back face
                new Vertex(0.2, 1.00, -0.25),
                new Vertex(0.3, 0.45, -0.25),
                new Vertex(0.4, 1.00, -0.25),
                new Vertex(0.6, 1.00, -0.25),
                new Vertex(0.7, 0.45, -0.25),
                new Vertex(0.8, 1.00, -0.25),
                new Vertex(1.0, 1.00, -0.25),
                new Vertex(0.8, 0.00, -0.25),
                new Vertex(0.6, 0.00, -0.25),
                new Vertex(0.5, 0.55, -0.25),
                new Vertex(0.4, 0.00, -0.25),
                new Vertex(0.2, 0.00, -0.25)]);

      // Create the front face line segments.
      this.addLineSegment([new LineSegment( 0,  1),
                     new LineSegment( 1,  2),
                     new LineSegment( 2,  3),
                     new LineSegment( 3,  4),
                     new LineSegment( 4,  5),
                     new LineSegment( 5,  6),
                     new LineSegment( 6,  7),
                     new LineSegment( 7,  8),
                     new LineSegment( 8,  9),
                     new LineSegment( 9, 10),
                     new LineSegment(10, 11),
                     new LineSegment(11, 12),
                     new LineSegment(12,  0)]);

      // Create the back face line segments.
      this.addLineSegment([new LineSegment(13, 14),
                     new LineSegment(14, 15),
                     new LineSegment(15, 16),
                     new LineSegment(16, 17),
                     new LineSegment(17, 18),
                     new LineSegment(18, 19),
                     new LineSegment(19, 20),
                     new LineSegment(20, 21),
                     new LineSegment(21, 22),
                     new LineSegment(22, 23),
                     new LineSegment(23, 24),
                     new LineSegment(24, 25),
                     new LineSegment(25, 13)]);

      // Connect front face to back face.
      this.addLineSegment([new LineSegment( 0, 13),
                     new LineSegment( 1, 14),
                     new LineSegment( 2, 15),
                     new LineSegment( 3, 16),
                     new LineSegment( 4, 17),
                     new LineSegment( 5, 18),
                     new LineSegment( 6, 19),
                     new LineSegment( 7, 20),
                     new LineSegment( 8, 21),
                     new LineSegment( 9, 22),
                     new LineSegment(10, 23),
                     new LineSegment(11, 24),
                     new LineSegment(12, 25)]);
   }
}
