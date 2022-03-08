import { LineSegment } from "../../../scene/LineSegment.js";
import { Model } from "../../../scene/Model.js"
import { Vertex } from "../../../scene/Vertex.js";

/**
 Create a wireframe model of a Levy C Curve.
<p>
See <a href="https://en.wikipedia.org/wiki/L%C3%A9vy_C_curve" target="_top">
            https://en.wikipedia.org/wiki/L%C3%A9vy_C_curve</a>
*/
export class C_Curve extends Model {
    /**
     Create a Levy C curve with {@code n} subdivisions and
    beginning with the line segment from {@link Vertex}
    {@code v0} to {@link Vertex} {@code v1}.
    <p>
    The vertices {@code v0} and {@code v1} should be in the same z-plane.

    @param v0  left {@link Vertex} of the base
    @param v1  right {@link Vertex} of the base
    @param n   number of subdivisions in this C Curve
   */
    constructor(n, v0 = new Vertex(-.5, 0, 0), v1 = new Vertex(0.5, 0, 0)){
        super(`C Curve (n = ${n})`);

        this.addVertex([v0, v1]);

        this.curve(0, 1, n);
    }
    

    /**
     If {@code n > 0}, recursively subdivide the line segment whose
    vertices are indexed by {@code vIndex0} and {@code vIndex1}.
    <p>
    If {@code n == 0}, draw the line segment whose vertices are
    indexed by {@code vIndex0} and {@code vIndex1}.
    <p>
    Given two points, {@code p0 = (x0, y0)} and {@code p1 = (x1, y1)},
    compute the new point {@code p2 = (x2, y2)} that determines a
    right isosceles triangle whose hypotenuse is the line segment
    from {@code p0} to {@code p1}. The third point of the right
    isosceles triangle is the point {@code p2 = (x2, y2)}.
    <pre>{@code
                       p2
                       +
                     / | \
                   /   |   \
                 /     |     \
               /       |       \
             /         |         \
            +----------+----------+
            p0         p3         p1
    }</pre>
    <p>
    Let {@code length} equal the length of the given line segment.
    <p>
    Let {@code v0} be the vector from {@code p0} to {@code p1}.
    <pre>{@code
        v0 = (x1 - x0, y1 - y0)
    }</pre>
    Let {@code v1} be the unit vector perpendicular to {@code v0}.
    <pre>{@code
        v1 = ( (y0 - y1)/length, (x1 - x0)/length )
    }</pre>
    <p>
    You should check that the dot product of {@code v0} with {@code v1} is {@code 0}.
    <p>
    Let {@code p3} be the midpoint of the line segment.
    <pre>{@code
        p3 = (x3, y3) = ( (x0+x1)/2, (y0+y1)/2 )
    }</pre>
    <p>
    The point {@code p2} lies the distance {@code length/2} from {@code p3}
    in the direction of the unit vector {@code v1}.
    <pre>{@code
        p2 = p3 + length/2 * v1
        = ( (x0+x1)/2, (y0+y1)/2 ) + (length/2) * ( (y0-y1)/length, (x1-x0)/length )
        = ( (x0+x1)/2, (y0+y1)/2 ) + (1/2) * (y0-y1, x1-x0)
        = ( (x0+x1)/2, (y0+y1)/2 ) + ( (y0-y1)/2, (x1-x0)/2 )
        = ( (x0+x1+y0-y1)/2, (y0+y1+x1-x0)/2 )
    }</pre>

    @param vIndex0  index of the left {@link Vertex} of the base
    @param vIndex1  index of the right {@link Vertex} of the base
    @param n        number of subdivisions in this C Curve
    */
    curve(vIndex0, vIndex1, n){       
        if (n > 0)
        {
            const v0 = this.vertexList[vIndex0];
            const v1 = this.vertexList[vIndex1];
            const index = this.vertexList.length;

            const x0 = v0.x;
            const y0 = v0.y;
            const z0 = v0.z;
            const x1 = v1.x;
            const y1 = v1.y;
            const z1 = v1.z;

            // Add one vertex to the model.
            this.addVertex([new Vertex((x0+x1+y0-y1)/2, (y0+y1+x1-x0)/2, z0)]);

            // Give a name to the index of the new vertex.
            const vIndex2 = index + 0;

            // Recursively subdivide the new intervals.
            this.curve(vIndex0, vIndex2, n-1);
            this.curve(vIndex2, vIndex1, n-1);
        }
        else
        {
            this.addLineSegment([new LineSegment(vIndex0, vIndex1)]);
        }
    }
}