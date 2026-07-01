

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
    // 1. Check for Missing (Is the key in the object?)
    if (!(field in manifest)) {
      errors[field] = "Missing";
    } 
    // 2. Check for Invalid (Is the data logically sound?)
    else {
      const value = manifest[field];
      let isInvalid = false;

      if (field === "containerId") {
        if (!Number.isInteger(value) || value <= 0) isInvalid = true;
      } 
      else if (field === "destination") {
        if (typeof value !== "string" || value.trim().length === 0) isInvalid = true;
      } 
      else if (field === "weight") {
        if (typeof value !== "number" || Number.isNaN(value) || value <= 0) isInvalid = true;
      } 
      else if (field === "unit") {
        if (!["kg", "lb"].includes(value)) isInvalid = true;
      } 
      else if (field === "hazmat") {
        if (typeof value !== "boolean") isInvalid = true;
      }

      if (isInvalid) {
        errors[field] = "Invalid";
      }
    }
  });

  return errors;
}

function processManifest(manifest) {
  // 1. Run the validation engine we built
  const errors = validateManifest(manifest);
  const { containerId } = manifest;

  // 2. Check if the errors object has any entries
  if (Object.keys(errors).length > 0) {
    // Log the error message with the containerId
    console.log(`Validation error: ${containerId}`);
    // Log the actual errors object
    console.log(errors);
    return; // Exit early!
  }

  // 3. Success path (Only runs if no errors)
  console.log(`Validation success: ${containerId}`);
  const normalized = normalizeUnits(manifest);
  console.log(`Total weight: ${normalized.weight} kg`);
}
