export const filterBasedCollisionDetection = (grates: Grate[], pickedValues: Grate, field: GrateField) => {
  const filteredGrates = Object.entries(pickedValues)
    .filter(([, value]) => Boolean(value))
    .reduce((filtered, [currentField, value]) => {
      const wouldFilter = filtered.filter((grate) => grate[currentField as keyof Grate] === value);

      // Skip this filter if it would result in empty array
      return wouldFilter.length > 0 ? wouldFilter : filtered;
    }, grates);

  const collisions: GrateField[] = [];

  if (!pickedValues[field]) {
    return collisions;
  }

  const fieldsToCheck = (Object.keys(pickedValues) as GrateField[]).filter((key) => key !== field);

  for (const fieldToCheck of fieldsToCheck) {
    const filteredByField = filteredGrates.filter((grate) => grate[fieldToCheck] === pickedValues[fieldToCheck]);

    if (!filteredByField.length) {
      collisions.push(fieldToCheck);
    }
  }

  return collisions;
};

export const getCollisions = (grates: Grate[], pickedValues: Grate, fields: GrateField[]) => {
  const collisions: Partial<Record<GrateField, GrateField[]>> = {};

  for (const field of fields) {
    collisions[field] = filterBasedCollisionDetection(grates, pickedValues, field);
  }

  // Add reverse collisions
  for (const [field, fieldCollisions] of Object.entries(collisions)) {
    const castField = field as GrateField;

    if (fieldCollisions.length) {
      for (const fieldCollision of fieldCollisions) {
        if (collisions[fieldCollision] && !collisions[fieldCollision].includes(castField)) {
          collisions[fieldCollision].push(castField);
        }
      }
    }
  }

  return collisions;
};

export const createSelection = (grates: Grate[], pickedValues: Grate, field: GrateField, fields: GrateField[]) => {
  const selectionSet = new Set(grates.map((grate) => grate[field]).filter(Boolean));

  const selection: ItemsSelection = [];

  for (const item of selectionSet) {
    const newPickedValues = { ...pickedValues };

    (newPickedValues[field] as typeof item) = item;

    const collisions = getCollisions(grates, newPickedValues, fields);

    if (item) {
      selection.push({
        value: item,
        label: String(item),
        isInCollision: Boolean(collisions[field]?.length),
      });
    }
  }

  return selection;
};

// TODO: add fields map
