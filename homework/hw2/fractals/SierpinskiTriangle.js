import { LineSegment } from "../../../scene/LineSegment.js";
import { Model } from "../../../scene/Model.js";
import { Vertex } from "../../../scene/Vertex.js";

/**
 Create a wireframe model of a Sierpinski triangle.
 <p>
 See <a href="https://en.wikipedia.org/wiki/Sierpinski_triangle" target="_top">
 https://en.wikipedia.org/wiki/Sierpinski_triangle</a>
 */
export class SierpinskiTriangle extends Model {
    /**
     Create a Sierpinski triangle with {@code n}
    subdivisions and its corners at the given
    vertices.
    
    @param v0  1st {@link Vertex} of the triangle
    @param v1  2nd {@link Vertex} of the triangle
    @param v2  3rd {@link Vertex} of the triangle
    @param n   number of subdivisions of this triangle
    */
    constructor(n, 
                theta = 0,
                v0 = new Vertex(Math.cos(theta), Math.sin(theta), 0), 
                v1 = new Vertex(Math.cos(theta + 2*Math.PI/3), Math.sin(theta + 2*Math.PI/3), 0), 
                v2 = new Vertex(Math.cos(theta + 4*Math.PI/3), Math.sin(theta + 4*Math.PI/3), 0.0)) {
        super(`Sierpinski Triangle (n = ${n})`);

        this.addVertex([v0, v1, v2]);

        this.sierpinski(0, 1, 2, n);
    }

    /**
     If {@code n > 0}, recursively subdivide the triangle whose
    vertices are indexed by {@code vIndex0}, {@code vIndex1} and
    {@code vIndex2}.
    <p>
    If {@code n == 0}, draw the triangle whose vertices are indexed
    by {@code vIndex0}, {@code vIndex1} and {@code vIndex2}.

    @param vIndex0  index of a {link Vertex} of a triangle
    @param vIndex1  index of a {link Vertex} of a triangle
    @param vIndex2  index of a {link Vertex} of a triangle
    @param n        number of subdivisions of this triangle
    */
    sierpinski(vIndex0, vIndex1, vIndex2, n) {
        this.addLineSegment([new LineSegment(vIndex0, vIndex1),
                             new LineSegment(vIndex1, vIndex2),
                             new LineSegment(vIndex2, vIndex0)]);

        if (n > 0){
            const v0 = this.vertexList[vIndex0];
            const v1 = this.vertexList[vIndex1];
            const v2 = this.vertexList[vIndex2];
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
            
            // Add three vertices to the model.
            this.addVertex([new Vertex((x0 + x1)/2, (y0 + y1)/2, z0),
                            new Vertex((x1 + x2)/2, (y1 + y2)/2, z1),
                            new Vertex((x2+x0)/2,   (y2+y0)/2,   z2)]);
        
            // Give a name to the index of each of the three new vertices.
            const vIndex3 = index + 0;
            const vIndex4 = index + 1;
            const vIndex5 = index + 2;

            // Recursively subdivide the three new intervals.
            this.sierpinski(vIndex0, vIndex3, vIndex5, n-1);
            this.sierpinski(vIndex1, vIndex3, vIndex4, n-1);
            this.sierpinski(vIndex2, vIndex4, vIndex5, n-1);
        }
    }
}