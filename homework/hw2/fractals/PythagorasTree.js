import { LineSegment } from "../../../scene/LineSegment.js";
import { Model } from "../../../scene/Model.js";
import { Vertex } from "../../../scene/Vertex.js";

/**
 Create a wireframe model of a Pythagoras tree.
 <p>
 See <a href="https://en.wikipedia.org/wiki/Pythagoras_tree_(fractal)" target="_top">
 https://en.wikipedia.org/wiki/Pythagoras_tree_(fractal)</a>
 */
export class PythagorasTree extends Model {      
    /**
     Create a Pythagoras tree with {@code n} branches and
    with its base on the line segment from {@link Vertex}
    {@code v0} to {@link Vertex} {@code v1}.
    <p>
    The vertices {@code v0} and {@code v1} should be in the same z-plane.
    
    @param v0     left {@link Vertex} of the base
    @param v1     right {@link Vertex} of the base
    @param alpha  determines the horizontal location of the peek
    @param beta   determines the vertical location of the peek
    @param n      number of branches in this Pythagoras tree
    */
    constructor(alpha, beta, n, v0 = new Vertex(-0.25, -1.0, 0.0), v1 = new Vertex( 0.25, -1.0, 0.0)) {
        super(`Pythagoras Tree (n = ${n})`);

        this.addVertex([v0, v1]);

        this.pythagoras(0, 1, alpha, beta, n);
    }

    /**
     Given two points, {@code p0 = (x0, y0)} and {@code p1 = (x1, y1)},
    compute two new points, {@code p2 = (x2, y2)} and {@code p3 = (x3, y3)},
    that determine a square whose base is the line segment from
    {@code p0} to {@code p1}. Then build a triangle with one side being
    the side of the square opposite to the base. The third point of
    the triangle is the point {@code p5 = (x5, y5)}. The point
    {@code p5} is above the point {@code p4 = (x4, y4)}.
    <p>
    Let {@code length} equal the length of each side of the square. Let
    <pre>{@code
    the distance between p4 and p2 = alpha * length,
    the distance between p5 and p4 = beta * length.
    }</pre>
    <pre>{@code
    p5
    +
    /    \
    /       \
    /           \
    /              \
    /                 \
    /                     \
    p2 +-------+----------------+ p3
    |       p4               |
    |                        |
    |                        |
    |                        |
    |                        |
    |                        |
    |                        |
    |                        |
    +------------------------+
    p0                        p1
    }</pre>
    <p>
    Let {@code v0} be the vector from {@code p0} to {@code p1}.
    <pre>{@code
    v0 = (x1 - x0, y1 - y0)
    }</pre>
    <p>
    Let {@code v1} be the vector along the side of the square
    from {@code p0} to {@code p2}. So {@code v1} is
    perpendicular to {@code v0}.
    <pre>{@code
    v1 = (y0 - y1, x1 - x0)
    }</pre>
    <p>
    You should check that the dot product of {@code v0} with {@code v1} is {@code 0}.

    <p>
    The point {@code p2} has these coordinates.
    <pre>{@code
    p2 = (x2, y2) = (x0, y0) + v1
    = (x0 + y0 - y1, y0 + x1 - x0)
    }</pre>
    <p>
    The point {@code p3} has these coordinates.
    <pre>{@code
    p3 = (x3, y3) = (x1, y1) + v1
    = (x1 + y0 - y1, y1 + x1 - x0)
    }</pre>
    <p>
    The point {@code p3} should also have these coordinates.
    <pre>{@code
    p3 = (x3, y3) = (x2, y2) + v0
    = (x2 + x1 - x0, y2 + y1 - y0)
    = ( (x0 + y0 - y1) + x1 - x0,
    (y0 + x1 - x0) + y1 - y0 )
    = ( x1 + y0 - y1,
    y1 + x1 - x0 )
    }</pre>
    <p>
    The point {@code p4} has these coordinates.
    <pre>{@code
    p4 = (1-alpha)*p2 + alpha*p3
    = (1-alpha)*((x0 + y0 - y1, y0 + x1 - x0) + alpha*(x1 + y0 - y1, y1 + x1 - x0)
    = ( (1-alpha)*x0 + alpha*x1 + y0 - y1,
    (1-alpha)*y0 + alpha*y1 + x1 - x0 )
    }</pre>
    <p>
    The point {@code p5} has these coordinates.
    <pre>{@code
    p5 = p4 + beta * v1
    = ( (1-alpha)*x0 + alpha*x1 + y0 - y1,
    (1-alpha)*y0 + alpha*y1 + x1 - x0 ) + beta*(y0 - y1, x1 - x0)
    = ( (1-alpha)*x0 + alpha*x1 + y0 - y1 + beta*(y0 - y1),
    (1-alpha)*y0 + alpha*y1 + x1 - x0 + beta*(x1 - x0) )
    = ( (1-alpha)*x0 + alpha*x1 + (1+beta)*(y0 - y1),
    (1-alpha)*y0 + alpha*y1 + (1+beta)*(x1 - x0) )
    }</pre>

    @param vIndex0  index of the left {@link Vertex} of the base
    @param vIndex1  index of the right {@link Vertex} of the base
    @param alpha    determines the horizontal location of the peek
    @param beta     determines the vertical location of the peek
    @param n        number of branches in this Pythagoras tree
    */
    pythagoras(vIndex0, vIndex1, alpha, beta, n) {
        const v0 = this.vertexList[vIndex0];
        const v1 = this.vertexList[vIndex1];
        const index = this.vertexList.length;
        
        const x0 = v0.x;
        const y0 = v0.y;
        const z0 = v0.z;
        const x1 = v1.x;
        const y1 = v1.y;
        const z1 = v1.z;
        
        const v2 = new Vertex(x0 + y0 - y1,y0 + x1 - x0,z0);
        const v3 = new Vertex(x1 + y0 - y1,y1 + x1 - x0,z1);
        
        this.addVertex([v2,v3]);
        
        const vIndex2 = index + 0;
        const vIndex3 = index + 1;
        
        this.addLineSegment([new LineSegment(vIndex2,vIndex0),
                             new LineSegment(vIndex0,vIndex1),
                             new LineSegment(vIndex1,vIndex3)]);
        
        if (n > 0) {
            this.addVertex([new Vertex((1-alpha)*x0 + alpha*x1 + (1+beta)*(y0 - y1),
                                (1-alpha)*y0 + alpha*y1 + (1+beta)*(x1 - x0),
                                z0)]);
            
            const vIndex5 = index + 2;
            
            this.pythagoras(vIndex2,vIndex5,alpha,beta,n-1);
            this.pythagoras(vIndex5,vIndex3,alpha,beta,n-1);
        } else {
            this.addLineSegment([new LineSegment(vIndex2,vIndex3)]);
        }
    }
}