export default class Sizes {
  constructor() {
    this.width = 800;
    this.height = 600;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);
  }
}
