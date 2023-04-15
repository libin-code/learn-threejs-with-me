import * as dat from "lil-gui";

export default class Debug {
  constructor() {
    this.active = window.location.hash === "#debug";

    if (this.active) {
      this.ui = new dat.GUI();
    }
  }
  adjustPosAndScale = (object, name, range = 5) => {
    if (!this.active) {
      return;
    }
    const folder = this.ui.addFolder(name);
    folder
      .add(object.scale, "x")
      .min(-range)
      .max(range)
      .step(0.01)
      .name("scale-x");
    folder
      .add(object.scale, "y")
      .min(-range)
      .max(range)
      .step(0.01)
      .name("scale-y");
    folder
      .add(object.scale, "z")
      .min(-range)
      .max(range)
      .step(0.01)
      .name("scale-z");
    folder
      .add(object.position, "x")
      .min(-range)
      .max(range)
      .step(0.01)
      .name("pos-x");
    folder
      .add(object.position, "y")
      .min(-range)
      .max(range)
      .step(0.01)
      .name("pos-y");
    folder
      .add(object.position, "z")
      .min(-range)
      .max(range)
      .step(0.01)
      .name("pos-z");

    return folder;
  };
}
