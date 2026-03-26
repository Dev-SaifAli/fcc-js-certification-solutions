// function normalizeUnits(manifest) {
//   const newManifest = { ...manifest };
//   const lbRate = 0.45;
//   const newUnit = "kg";

//   if (newManifest.unit === "lb") {
//     newManifest.weight = newManifest.weight * lbRate;
//     newManifest.unit = newUnit;
//   }
//   return newManifest;
// }

// Clean code

function normalizeUnits(manifest) {
  const isPounds = manifest.unit === "lb";

  return {
    ...manifest,
    weight: isPounds ? manifest.weight * 0.45 : manifest.weight,
    unit: "kg",
  };
}

let manifest = {
  containerId: 1,
  destination: "Monterey, California, USA",
  weight: 831,
  unit: "kg",
  hazmat: false,
};
console.log(normalizeUnits(manifest));
