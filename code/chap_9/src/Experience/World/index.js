import * as THREE from "three";
import Experience from "../Experience";
import { EE } from "../Utils";
import Floor from "./Floor";
import Wall from "./Wall";
import Alert from "./Alert";
import Door from "./Door";
import Table from "./Table";
import Chair from "./Chair";
import Box from "./Box";
import Circle from "./Circle";
import Environment from "./Environment";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.items = [];
    this.instance = null;
    this._scene = this.experience.scene;

    EE.on("ready", () => {
      const FLOOR = new Floor();
      const WALL = new Wall({
        floor: FLOOR,
      });
      const ALERT = new Alert({
        position: [2, 3.5, -2.5],
        scale: [0.32, 0.32, 0.32],
      });
      const DOOR = new Door({
        position: [-2.38, 1.65, 0],
        scale: [2.2, 3.4, 1],
      });
      const TABLE = new Table({
        position: [0, 0.82, 0],
        scale: [2, 0.11, 0.97],
      });
      const CHAIR = new Chair({
        position: [0, 0.4, 1],
        scale: [1, 0.1, 0.8],
      });
      const TABLE_AND_CHAIR = new THREE.Group();
      TABLE_AND_CHAIR.add(TABLE.mesh, CHAIR.mesh);
      TABLE_AND_CHAIR.position.set(0, -1.36, -1.7);
      TABLE_AND_CHAIR.scale.set(1.5, 1.5, 1.5);
      this._scene.add(TABLE_AND_CHAIR);
      const BIG_BOX = new Box({
        name: "BIG_BOX",
        position: [1.69, 0.55, 1.69],
        scale: [1, 1, 1],
        texturePath: "box2",
      });
      const SMALL_BOX = new Box({
        name: "SMALL_BOX",
        position: [0.8, 0.29, 1.82],
        scale: [0.8, 0.55, 0.93],
        texturePath: "box2",
      });
      const OTHER_BOX = new Box({
        name: "OTHER_BOX",
        position: [-2.12, 1.18, 1.82],
        scale: [0.67, 2.2, 1.18],
        texturePath: "box1",
      });
      const CIRCLE = new Circle({
        position: [-1.5, 3.4, -2.4],
        scale: [0.45, 0.45, 0.45],
      });

      this.items.push(
        FLOOR,
        WALL,
        ALERT,
        DOOR,
        TABLE_AND_CHAIR,
        BIG_BOX,
        SMALL_BOX,
        OTHER_BOX,
        CIRCLE
      );

      this.instance = new THREE.Group();
      this.instance.add(
        ...this.items
          .filter((item) => item.mesh instanceof THREE.Object3D)
          .map((item) => item.mesh)
      );
      this.instance.position.set(0, -1.36, 0);
      this._scene.add(this.instance);
      this.experience.debug.adjustPosAndScale(this.instance, "WORLD");

      new Environment();
    });
  }
  update = () => {
    this.items.forEach((item) => {
      if (typeof item?.update === "function") {
        item.update();
      }
    });
  };
}
