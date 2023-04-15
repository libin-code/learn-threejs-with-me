import * as THREE from "three";
import { EE } from "./index";

export default class Resources {
  constructor(sources) {
    this.sources = sources;

    this.items = {};
    this.toLoad = this.sources.reduce((acc, { paths }) => {
      acc += Object.keys(paths).length;
      return acc;
    }, 0);
    this.loaded = 0;

    this.setLoaders();
    this.startLoading();
  }

  setLoaders = () => {
    const loadingManager = new THREE.LoadingManager();
    loadingManager.onStart = () => {};
    loadingManager.onLoad = () => {};
    loadingManager.onProgress = () => {};
    loadingManager.onError = () => {};
    this.loaders = {};
    this.loaders.textureLoader = new THREE.TextureLoader(loadingManager);
  };

  startLoading = () => {
    this.sources.forEach(({ name, paths }) => {
      this.items[name] = {};
      Object.entries(paths).forEach(([key, val]) => {
        this.loaders.textureLoader.load(val, (file) => {
          this.sourceLoaded(name, key, file);
        });
      });
    });
  };

  sourceLoaded = (name, key, file) => {
    this.items[name][key] = file;

    this.loaded++;

    if (this.loaded === this.toLoad) {
      EE.emit("ready");
    }
  };

  setTextures = (
    target,
    name,
    repeat = [1.5, 1.5],
    properties = [
      "color",
      "normal",
      "height",
      "opacity",
      "ao",
      "roughness",
      "metalness",
    ]
  ) => {
    properties.forEach((property) => {
      target[property] = this.items[name][property];

      if (target[property] === undefined) return;

      target[property].repeat.set(...repeat);
      target[property].wrapS = THREE.RepeatWrapping;
      target[property].wrapT = THREE.RepeatWrapping;
    });
  };
}
