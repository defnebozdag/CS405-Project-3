/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }



    draw(mvp, modelView, normalMatrix, modelMatrix) {
        // transformation on the current node
        const currentTransform = this.trs.getTransformationMatrix();
    
        // updating the transformation matrices
        const transformedModel = MatrixMult(modelMatrix, currentTransform);
        const transformedModelView = MatrixMult(modelView, currentTransform);
        const transformedMvp = MatrixMult(mvp, currentTransform);
        const transformedNormals = MatrixMult(normalMatrix, currentTransform);

    
        // Drawing the MeshDrawer (if present)
        if (this.meshDrawer) {
            this.meshDrawer.draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
        }
    
        // Recursively drawing all children
        for (let child of this.children) {
            child.draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
        }
    }
    
    

    

}