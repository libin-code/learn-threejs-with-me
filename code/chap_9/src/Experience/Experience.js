import * as THREE from "three";
import { Resources, Debug, Sizes, Time, EE } from "./Utils";
import Camera from "./Camera.js";
import Renderer from "./Renderer.js";
import World from "./World/index.js";

import { sources } from "./sources.js";

let instance = null;

export default class Experience {
  constructor(canvas) {
    if (instance) {
      return instance;
    }
    instance = this;

    window.experience = this;

    this.canvas = canvas;

    this.debug = new Debug();
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.resources = new Resources(sources);
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();

    EE.on("tick", () => {
      this.update();
    });
  }
  update = () => {
    this.camera.update();
    this.world.update();
    this.renderer.update();
  };
}
