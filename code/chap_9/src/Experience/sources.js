function generatePath(name, keypath, suffix = "", excludes = ["opacity"]) {
  const result = {
    name,
    paths: {
      color: `textures/${keypath}/basecolor.${suffix || "jpg"}`,
      normal: `textures/${keypath}/normal.${suffix || "jpg"}`,
      height: `textures/${keypath}/height.${suffix || "png"}`,
      opacity: `textures/${keypath}/opacity.${suffix || "jpg"}`,
      ao: `textures/${keypath}/ao.${suffix || "jpg"}`,
      roughness: `textures/${keypath}/roughness.${suffix || "jpg"}`,
      metalness: `textures/${keypath}/metallic.${suffix || "jpg"}`,
    },
  };
  excludes.forEach((key) => {
    delete result.paths[key];
  });
  return result;
}

export const sources = [
  generatePath("floor", "floor"),
  generatePath("wall", "wall"),
  generatePath("table", "table"),
  generatePath("box1", "box1"),
  generatePath("box2", "box2"),
  generatePath("alert", "alert", "", ["metalness", "opacity"]),
  generatePath("circle", "circle", "", []),
];
