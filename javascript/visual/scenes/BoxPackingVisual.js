import * as THREE from "three";
import BasicScene from "./BasicScene";

export default class BoxPackingVisual {
  constructor(canvas) {
    this.scene = new BasicScene(canvas);
    this._setupGrid();
    this.boxMeshes = [];
    this.boxes = [];
    this.materialByColorByDarkness = this._createMaterialByColorByDarkness();
  }

  setBin(binSizes) {
    const geometry = new THREE.BoxGeometry(...binSizes);
    const mapMesh = new THREE.Mesh(geometry);
    mapMesh.position.setY(binSizes[1] / 2);
    const boxHelper = new THREE.BoxHelper(mapMesh, 0xffffff);
    // boxHelper.material.depthTest = false;
    boxHelper.material.opacity = 0.4;
    boxHelper.material.transparent = true;
    this.scene.add(boxHelper);
  }

  addBoxes(boxes, binSizes) {
    boxes.forEach((box) => {
      const geometry = new THREE.BoxGeometry(...box.sizes);
      const material =
        this.materialByColorByDarkness[box.weightClass][box.orderClass];
      const boxMesh = new THREE.Mesh(geometry, material);
      box.pos[0] += box.sizes[0] / 2 - binSizes[0] / 2;
      box.pos[1] += box.sizes[1] / 2;
      box.pos[2] += box.sizes[2] / 2 - binSizes[2] / 2;
      boxMesh.position.set(...box.pos);
      this.boxMeshes.push(boxMesh);
      this.boxes.push(box);
      this.scene.add(boxMesh);
    });
  }

  addUnfitBoxes(boxes, binSizes) {
    let nextY = 0;
    boxes.forEach((box) => {
      box.pos = [0, nextY, 0];
      nextY += box.sizes[1];
    });
    boxes.forEach((box) => {
      box.pos[2] = binSizes[2];
      box.pos[0] = -binSizes[1] / 3;
    });
    this.addBoxes(boxes, binSizes);
  }

  showBoxesByRatio(ratio) {
    const visibleEnd = Math.ceil((this.boxMeshes.length - 1) * ratio);
    this.boxMeshes.forEach((mesh, i) => {
      mesh.visible = i <= visibleEnd;
    });
    if (visibleEnd >= 0) {
      const endBox = this.boxes[visibleEnd];
      console.log(`End box #${visibleEnd}, ID: ${endBox.id}`);
    }
  }

  _setupGrid() {
    const gridHelper = new THREE.GridHelper(300, 6);
    this.scene.add(gridHelper);
  }

  _createMaterialByColorByDarkness() {
    return [
      [0.5, 1.0, 0.5], // Green
      [1.0, 1.0, 0.5], // Yellow
      [1.0, 0.5, 0.5], // Red
      [1.0, 0.5, 1.0], // Blue
    ].map(([r, g, b]) => {
      const colors = [];
      for (let i = 1; i < 8; i++) {
        const ratio = 0.7 - i * 0.12;
        // const ratio = 0.6 / i;
        colors.push([r * ratio, g * ratio, b * ratio]);
      }
      return colors.map(
        (xs) =>
          new THREE.MeshStandardMaterial({ color: new THREE.Color(...xs) })
      );
    });
  }
}
