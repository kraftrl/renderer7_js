import { LineSegment } from "../../../scene/LineSegment.js";
import { Model } from "../../../scene/Model.js";
import { Vertex } from "../../../scene/Vertex.js";

/**
 Create a wireframe model of a Box Fractal.
 <p>
 See <a href="https://en.wikipedia.org/wiki/Vicsek_fractal" target="_top">
 https://en.wikipedia.org/wiki/Vicsek_fractal</a>
 */
export class BoxFractal extends Model {
    /**
     Create a Box Fractal with {@code n}
    subdivisions and its corners at the given
    vertices.
    <p>
    The vertices {@code v0}, {@code v1}, {@code v2},
    and {@code v3} should all be in the same z-plane.
    
    @param n   number of subdivisions of this rectangle
    @param v0  1st {@link Vertex} of the rectangle
    @param v1  2nd {@link Vertex} of the rectangle
    @param v2  3rd {@link Vertex} of the rectangle
    @param v3  4th {@link Vertex} of the rectangle
    */
    constructor(n, v0 = new Vertex(-1, 1, 0), v1 = new Vertex(1, 1, 0), v2 = new Vertex(1, -1, 0), v3 = new Vertex(-1, -1, 0)){
        super("Box Fractal (n = " + n + ")");
        
        this.addVertex([v0, v1, v2, v3]);
        
        this.box(0, 1, 2, 3, n);
    }
    
    /**
     If {@code n > 0}, recursively subdivide the rectangle whose
    vertices are indexed by {@code vIndex0}, {@code vIndex1},
    {@code vIndex2}, and {@code vIndex3}.
    <p>
    If {@code n == 0}, draw the rectangle whose vertices are indexed
    by {@code vIndex0}, {@code vIndex1}, {@code vIndex2}, and
    {@code vIndex3}.
    <p>
    Given four points, {@code p0 = (x0, y0)}, {@code p1 = (x1, y1)},
    {@code p2 = (x2, y2)}, and {@code p3 = (x3, y3)}, compute 12 new
    vertices that divide the rectangle up into nine subrectangles of
    equal size.
    <p>
    The following six of the nine subrectangles will then be
    recursively subdivided.
    
    <pre>{@code
    v0                                     v1
    +------------+------------+------------+
    |            |............|            |
    |            |............|            |
    |            |............|            |
    |            |............|            |
    |            |............|            |
    y6 +------------+------------+------------+
    |............|............|............|
    |............|............|............|
    |............|............|............|
    |............|............|............|
    |............|............|............|
    y7 +------------+------------+------------+
    |            |............|            |
    |            |............|            |
    |            |............|            |
    |            |............|            |
    |            |............|            |
    +------------+------------+------------+
    v3          x4            x5           v2
    }</pre>
    
    The coordinates {@code x4} and {@code x5} divide the horizontal sides
    of the rectangle into thirds. Similarly for coordinates {@code y6}
    and {@code y7} and the vertical sides. So
    <pre>{@code
    x4 = (2/3) * x0 + (1/3) * x1
    x5 = (1/3) * x0 + (2/3) * x1
    y6 = (2/3) * y0 + (1/3) * y1
    y7 = (1/3) * y0 + (2/3) * y1
    }</pre>
    <p>
    The 12 new vertices have the following coordinates.
    <pre>{@code
    (x4, y0)
    (x5, y0)
    (x0, y6)
    (x4, y6)
    (x5, y6)
    (x1, y6)
    (x0, y7)
    (x4, y7)
    (x5, y7)
    (x1, y7)
    (x4, y3)
    (x5, y3)
    }</pre>
    
    @param vIndex0  index of a {link Vertex} of a rectangle
    @param vIndex1  index of a {link Vertex} of a rectangle
    @param vIndex2  index of a {link Vertex} of a rectangle
    @param vIndex3  index of a {link Vertex} of a rectangle
    @param n        number of subdivisions of this rectangle
    */
    box(vIndex0, vIndex1, vIndex2, vIndex3, n) {    
        if (n > 0) {
            const v0 = this.vertexList[vIndex0];
            const v1 = this.vertexList[vIndex1];
            const v2 = this.vertexList[vIndex2];
            const v3 = this.vertexList[vIndex3];
            const index = this.vertexList.length;

            const x0 = v0.x;
            const y0 = v0.y;
            const z0 = v0.z;
            const x1 = v1.x;
            const y1 = v1.y;
            const z1 = v1.z;
            const x2 = v2.x;
            const y2 = v2.y;
            const z2 = v2.z;
            const x3 = v3.x;
            const y3 = v3.y;
            const z3 = v3.z;

            // Add twelve vertices to the model.
            const x4 = 2.0/3 * x0 + 1.0/3 * x1;
            const x5 = 1.0/3 * x0 + 2.0/3 * x1;
            const y6 = 2.0/3 * y0 + 1.0/3 * y3;
            const y7 = 1.0/3 * y0 + 2.0/3 * y3;
            this.addVertex([
                new Vertex(x4,y0,z0),
                new Vertex(x5,y0,z0),
                new Vertex(x0,y6,z0),
                new Vertex(x4,y6,z0),
                new Vertex(x5,y6,z0),
                new Vertex(x1,y6,z0),
                new Vertex(x0,y7,z0),
                new Vertex(x4,y7,z0),
                new Vertex(x5,y7,z0),
                new Vertex(x1,y7,z0),
                new Vertex(x4,y3,z0),
                new Vertex(x5,y3,z0)
            ]);

            // Give a name to the index of each of the twelve new vertices.
            const vIndex4 = index + 0;
            const vIndex5 = index + 1;
            const vIndex6 = index + 2;
            const vIndex7 = index + 3;
            const vIndex8 = index + 4;
            const vIndex9 = index + 5;
            const vIndex10 = index + 6;
            const vIndex11 = index + 7;
            const vIndex12 = index + 8;
            const vIndex13 = index + 9;
            const vIndex14 = index + 10;
            const vIndex15 = index + 11;

            // Recursively branch the new intervals.
            this.box(vIndex4, vIndex5, vIndex8, vIndex7, n-1);
            this.box(vIndex6, vIndex7, vIndex11, vIndex10, n-1);
            this.box(vIndex7, vIndex8, vIndex12, vIndex11, n-1);
            this.box(vIndex8, vIndex9, vIndex13, vIndex12, n-1);
            this.box(vIndex11, vIndex12, vIndex15, vIndex14, n-1);
        } else {
            this.addLineSegment([
                new LineSegment(vIndex0,  vIndex1),
                new LineSegment(vIndex1,  vIndex2),
                new LineSegment(vIndex2,  vIndex3),
                new LineSegment(vIndex3,  vIndex0)
            ]);      
        }
    }
}