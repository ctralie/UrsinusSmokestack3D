/**
 * A class for ray-based picking
 */
class PickHelper {
  constructor(scene, camera) {
    this.scene = scene;
    this.camera = camera;
    this.raycaster = new THREE.Raycaster();
    this.lastPicked = null;
  }

  /**
   * Figure out which annotation sphere someone is clicking on
   * @param {obj} normalizedPosition Position, in [-1, 1] x [-1, 1] screen coordinates, of click
   * @returns Scene object
   */
  pick(normalizedPosition) {
    const scene = this.scene;
    const camera = this.camera;
    // cast a ray through the frustum
    this.raycaster.setFromCamera(normalizedPosition, camera);
    // get the list of objects the ray intersected
    const intersectedObjects = this.raycaster.intersectObjects(scene.children);
    let pickedObj = null;
    if (intersectedObjects.length) {
      // pick the first object. It's the closest one
      pickedObj = intersectedObjects[0].object;
      if ('annotation' in pickedObj) {
        // save its color
        pickedObj.material.color.setHex(0xFF0000);
        // restore the color if there is a picked object
        if (!(this.lastPicked === null)) {
          this.lastPicked.material.color.setHex(0xFFFF00);
        }
        this.lastPicked = pickedObj;
      }
    }
    return pickedObj;
  }
}