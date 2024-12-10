export const filterBasedCollisionDetection = (products: Grate[], pickedValues: Grate, formField: GrateField) => {
  const filteredGrates = Object.entries(pickedValues)
    .filter(([, value]) => Boolean(value))
    .reduce((filtered, [currentField, value]) => {
      const wouldFilter = filtered.filter((product) => product[currentField as keyof Grate] === value);

      // Skip this filter if it would result in empty array
      return wouldFilter.length > 0 ? wouldFilter : filtered;
    }, products);

  const collisions: GrateField[] = [];

  if (!pickedValues[formField]) {
    return collisions;
  }

  const fieldsToCheck = (Object.keys(pickedValues) as GrateField[]).filter((key) => key !== formField);

  for (const fieldToCheck of fieldsToCheck) {
    const filteredByField = filteredGrates.filter((product) => product[fieldToCheck] === pickedValues[fieldToCheck]);

    if (!filteredByField.length) {
      collisions.push(fieldToCheck);
    }
  }

  return collisions;
};

export const getCollisions = (products: Grate[], pickedValues: Grate, formFields: GrateField[]) => {
  const collisions: Partial<Record<GrateField, GrateField[]>> = {};

  for (const formField of formFields) {
    collisions[formField] = filterBasedCollisionDetection(products, pickedValues, formField);
  }

  // Add reverse collisions
  for (const [formField, fieldCollisions] of Object.entries(collisions)) {
    const castField = formField as GrateField;

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

export const createSelection = (
  products: Grate[],
  pickedValues: Grate,
  formField: GrateField,
  formFields: GrateField[]
) => {
  const selectionSet = new Set(products.map((grate) => grate[formField]).filter(Boolean));

  const selection: ItemsSelection = [];

  for (const item of selectionSet) {
    const newPickedValues = { ...pickedValues };

    (newPickedValues[formField] as typeof item) = item;

    const collisions = getCollisions(products, newPickedValues, formFields);

    if (item) {
      selection.push({
        value: item,
        label: String(item),
        isInCollision: Boolean(collisions[formField]?.length),
      });
    }
  }

  return selection;
};

// export const createGetCollidingFields = <
//   FormKeys extends ProductKeys,
//   ApiKeys extends ProductKeys,
// >(
//   fieldsMap: FieldsMap<FormKeys, ApiKeys>,
// ) => {
