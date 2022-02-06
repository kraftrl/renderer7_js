import { Model } from './../scene/Model.js';
import { Vertex } from './../scene/Vertex.js';
import { LineSegment } from './../scene/LineSegment.js';

export class Clip {
    
    static clip(model) {
        var newLineSegmentList = [];
        
        const model2 = new Model(model.name, model.vertexList.slice(), model.lineSegmentList, model.colorList.slice(), model.visible, model.debug);

        for (const ls of model2.lineSegmentList) {
            const ls_clipped = Clip.clipLS(model2, ls);
            if (ls_clipped != null) {
                newLineSegmentList.push(ls_clipped);
            }
        }

        return new Model(model2.name, model2.vertexList, model2.lineSegmentList, model2.colorList, model2.visible, model2.debug);
    }


    static clipLS(model, ls) {
        const v0 = model.vertexList[ls.vIndex[0]];
        const v1 = model.vertexList[ls.vIndex[1]];

        const x0 = v0.x,  y0 = v0.y;
        const x1 = v1.x,  y1 = v1.y;

        // 1. Check for trivial accept
        if (!(Math.abs(x0) > 1 || Math.abs(x1) > 1 || Math.abs(y0) > 1 || Math.abs(y1) > 1)) {
            return ls;
        }
        // 2. Check for trivial delete.
        else if ( (x0 >  1 && x1 >  1) || (x0 < -1 && x1 < -1) || (y0 >  1 && y1 >  1) || (y0 < -1 && y1 < -1) ) {
            return null;
        }
        // 3. Need to clip this line segment.
        else {
            return Clip.clipLS(model, Clip.clipOneTime(model, ls));
        }
    }

    static clipOneTime(model, ls) {
        var v0 = model.vertexList[ls.vIndex[0]];
        var v1 = model.vertexList[ls.vIndex[1]];

        var x0 = v0.x,  y0 = v0.y;
        var x1 = v1.x,  y1 = v1.y;

        var vIx,    vIy; // "I" for inside
        var vOx,    vOy; // "O" for outside

        var inside; // keep track of which vertex is inside
        var eqnNum; // keep track of which edge is crossed
        var t = 0.0;
        
        if (x0 > 1) {
            inside = 1;
            eqnNum = 1;
            vOx = x0;   vOy = y0;
            vIx = x1;   vIy = y1;
            t = (1 - vOx) / (vIx - vOx);
        }
        else if (x1 > 1) {
            inside = 0;
            eqnNum = 1;
            vOx = x1;   vOy = y1;
            vIx = x0;   vIy = y0;
            t = (1 - vOx) / (vIx- vOx);
        }
        else if (x0 < - 1) {
            inside = 1;
            eqnNum = 2;
            vOx = x0;   vOy = y0;
            vIx = x1;   vIy = y1;
            t = (-1 - vOx) / (vIx - vOx);
        }
        else if (x1 < -1) {
            inside = 0;
            eqnNum = 2;
            vOx = x1;   vOy = y1;
            vIx = x0;   vIy = y0;
            t = (-1 - vOx) / (vIx - vOx);
        }
        else if (y0 > 1) {
            inside = 1;
            eqnNum = 3;
            vOx = x0;   vOy = y0;
            vIx = x1;   vIy = y1;
            t = (1 - vOy) / (vIy - vOy);
        }
        else if (y1 > 1) {
            inside = 0;
            eqnNum = 3;
            vOx = x1;   vOy = y1;
            vIx = x0;   vIy = y0;
            t = (1 - vOy) / (vIy - vOy);
        }
        else if (y0 < -1) {
            inside = 1;
            eqnNum = 4;
            vOx = x0;   vOy = y0;
            vIx = x1;   vIy = y1;
            t = (-1 - vOy) / (vIy - vOy);
        }
        else {
            inside = 0;
            eqnNum = 4;
            vOx = x1;   vOy = y1;
            vIx = x0;   vIy = y0;
            t = (-1 - vOy) / (vIy - vOy);
        }

        // Use the value of t to interpolate the coordinates of the new vertex.

        var x = (1-t) * vOx + t * vIx;
        var y = (1-t) * vOy + t * vIy;

        var newVertex = new Vertex(x, y, 0);

        // Modify the Model to contain the new Vertex.
        var newIndex = model.vertexList.length;
        model.vertexList.push(newVertex);

        var newLS;

        if (0 == inside) {
            newLS = new LineSegment(ls.vIndex[0], newIndex);
        }
        else {
            newLS = new LineSegment(newIndex, ls.vIndex[0]);
        }
        return newLS;
    }
}
