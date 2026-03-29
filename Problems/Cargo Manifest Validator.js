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

function validateManifest(manifest) {
  const errors = {};
  const requiredFields = ["containerId", "destination", "weight", "unit", "hazmat"];

  requiredFields.forEach((field) => {
    // 1. Check for Missing
    if (!(field in manifest)) {
      errors[field] = "Missing";
    } 
    // 2. Check for Invalid
    else {
      let isInvalid = false;

      // Rule: containerId must be an Integer and > 0
      if (field === "containerId" && (!Number.isInteger(manifest[field]) || manifest[field] <= 0)) {
        isInvalid = true;
      } 
      else if (field === "destination" && typeof manifest[field] !== "string") {
        isInvalid = true;
      } 
      else if (field === "weight" && (typeof manifest[field] !== "number" || manifest[field] <= 0)) {
        isInvalid = true;
      } 
      else if (field === "unit" && !["kg", "lb"].includes(manifest[field])) {
        isInvalid = true;
      } 
      else if (field === "hazmat" && typeof manifest[field] !== "boolean") {
        isInvalid = true;
      }

      if (isInvalid) {
        errors[field] = "Invalid";
      }
    }
  });

  return errors;
}

function processManifest(manifest) {
  const errors = validateManifest(manifest);
  const { containerId } = manifest;

  if (Object.keys(errors).length > 0) {
    console.log(`Validation error: ${manifest.containerId}`);
    return;
  }

  console.log(`Validation success: ${containerId}`);

  const normalized = normalizeUnits(manifest);
  console.log(`Total weight: ${normalized.weight} kg`);
}

