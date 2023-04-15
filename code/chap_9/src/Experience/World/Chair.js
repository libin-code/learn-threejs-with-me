import * as THREE from "three";
import Table from "./Table";

export default class Chair extends Table {
  constructor({ position, scale } = {}) {
    super({ position, scale });
  }

  __addTableLegs() {
    const THICKNESS = this._desktop.scale.y;
    const LENGTH = this._desktop.position.y + 0.3;
    const HEIGHT = this._desktop.scale.z;
    const LEFT_LEG = genLeftLeg.call(this);
    const RIGHT_LEG = genRightLeg.call(this);
    const CHAIR_BACK = genBack.call(this);

    this._tableLegs = new THREE.Group();
    this._tableLegs.add(LEFT_LEG, RIGHT_LEG, CHAIR_BACK);
    this._experience.debug.adjustPosAndScale(CHAIR_BACK, "CHAIR_BACK");

    function genLeftLeg() {
      const mesh = new THREE.Mesh(this._geometry, this._material);
      mesh.position.set(
        -(this._desktop.scale.x / 2 - THICKNESS / 2),
        LENGTH / 2,
        this._desktop.position.z
      );
      mesh.scale.set(THICKNESS, LENGTH, HEIGHT);
      return mesh;
    }

    function genRightLeg() {
      const mesh = new THREE.Mesh(this._geometry, this._material);
      mesh.position.set(
        this._desktop.scale.x / 2 - THICKNESS / 2,
        LENGTH / 2,
        this._desktop.position.z
      );
      mesh.scale.set(THICKNESS, LENGTH, HEIGHT);
      return mesh;
    }

    function genBack() {
      const mesh = new THREE.Mesh(this._geometry, this._material);
      mesh.rotateY(Math.PI / 2);
      mesh.position.set(
        this._desktop.position.x,
        HEIGHT - 0.2,
        this._desktop.position.z + this._desktop.scale.x / 2 - 0.15
      );
      mesh.scale.set(THICKNESS, LENGTH, HEIGHT);
      return mesh;
    }
  }
  __addExtras() {}
  __addLight() {}
}
