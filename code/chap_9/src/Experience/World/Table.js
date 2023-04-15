import * as THREE from "three";
import Experience from "../Experience";

export default class Table {
  constructor({ position = [0, 0, 0], scale = [1, 1, 1] } = {}) {
    this.mesh = null;

    this._position = position;
    this._scale = scale;
    this._experience = new Experience();
    this._scene = this._experience.scene;
    this._resources = this._experience.resources;
    this._extra = [];
    this._geometry = null;
    this._texture = {};
    this._material = null;
    this._desktop = null;
    this._tableLegs = null;
    this._monitor = null;
    this._light = null;

    this.__addGeometry();
    this.__addTexture();
    this.__addMaterial();
    this.__addMesh();
    this.__addLight();

    this._experience.debug.adjustPosAndScale(this.mesh, "Table");
  }
  __addGeometry = () => {
    this._geometry = new THREE.BoxGeometry(1, 1, 1, 32, 32, 32);
  };
  __addTexture = () => {
    this._resources.setTextures(this._texture, "table", [1, 1]);
  };
  __addMaterial = () => {
    this._material = new THREE.MeshStandardMaterial({
      metalness: 0.6,
      roughness: 1,
      map: this._texture.color,
      normalMap: this._texture.normal,
      aoMap: this._texture.ao,
      aoMapIntensity: 0.5,
      displacementMap: this._texture.height,
      displacementScale: 0.001,
      roughnessMap: this._texture.roughness,
      metalnessMap: this._texture.metalness,
    });
  };
  __addMesh = () => {
    this.mesh = new THREE.Group();
    this.__addDesktop();
    this.__addTableLegs();
    this.__addExtras();
    this.mesh.add(this._desktop, this._tableLegs, ...this._extra);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this._scene.add(this.mesh);
  };
  __addDesktop = () => {
    this._desktop = new THREE.Mesh(this._geometry.clone(), this._material);
    this._desktop.position.set(...this._position);
    this._desktop.scale.set(...this._scale);
  };
  __addTableLegs() {
    const THICKNESS = this._desktop.scale.y;
    const LENGTH = this._desktop.position.y;
    const HEIGHT = this._desktop.scale.z;
    const LEFT_LEG = genLeftLeg.call(this);
    const RIGHT_LEG = genRightLeg.call(this);

    this._tableLegs = new THREE.Group();
    this._tableLegs.add(LEFT_LEG, RIGHT_LEG);

    function genLeftLeg() {
      const mesh = new THREE.Mesh(this._geometry.clone(), this._material);
      mesh.position.set(
        -(this._desktop.scale.x / 2 - THICKNESS / 2),
        LENGTH / 2,
        this._desktop.position.z
      );
      mesh.scale.set(THICKNESS, LENGTH, HEIGHT);
      return mesh;
    }

    function genRightLeg() {
      const mesh = new THREE.Mesh(this._geometry.clone(), this._material);
      mesh.position.set(
        this._desktop.scale.x / 2 - THICKNESS / 2,
        LENGTH / 2,
        this._desktop.position.z
      );
      mesh.scale.set(THICKNESS, LENGTH, HEIGHT);
      return mesh;
    }
  }
  __addExtras() {
    this._monitor = new THREE.Group();

    const MONITOR = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1, 32, 32, 32),
      this._material
    );
    MONITOR.scale.set(1.1, 0.6, 0.1);
    MONITOR.position.set(0, 1.2, 0);

    const SCREEN_MESH = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1, 32, 32),
      new THREE.MeshBasicMaterial({
        side: THREE.FrontSide,
        map: new THREE.VideoTexture(this.__getVideo()),
      })
    );

    SCREEN_MESH.scale.set(0.55, 0.6, 0.29);
    SCREEN_MESH.position.set(...MONITOR.position);
    SCREEN_MESH.position.z = (0, 1.2, 0.06);

    this._monitor.add(MONITOR, SCREEN_MESH);
    this._extra = [this._monitor];
  }
  __getVideo = () => {
    const VIDEO = document.getElementById("video");
    VIDEO.play();
    VIDEO.addEventListener("play", function () {
      this.currentTime = 3;
    });
    return VIDEO;
  };
  __addLight() {
    this._light = new THREE.RectAreaLight(new THREE.Color(this.color), 3, 1, 1);
    this._light.rotateY(Math.PI);
    this._light.position.set(0, 1.82, -1.62);
    this._scene.add(this._light);
  }
}
