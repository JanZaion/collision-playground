export const pickedValues: Grate = {
  wo: 155,
  wi: 125,
  type: 'ladder',
  lc: 'A15',
  surfaceTreatment: 'Passivated',
};

export const filterBasedCollisionDetection = (grates: Grate[], pickedValues: Grate, field: GrateField) => {
  const filteredGrates = grates.filter((grate) => grate[field] === pickedValues[field]);
  const collisions: GrateField[] = [];

  // Get all keys except the input field
  const fieldsToCheck = (Object.keys(pickedValues) as GrateField[]).filter((key) => key !== field);

  for (const fieldToCheck of fieldsToCheck) {
    const filteredByField = filteredGrates.filter((grate) => grate[fieldToCheck] === pickedValues[fieldToCheck]);

    if (!filteredByField.length) {
      collisions.push(fieldToCheck);
    }
  }

  return collisions;
};
