export const filterBasedCollisionDetection = <Product extends StandardProduct>(
  products: Product[],
  pickedValues: Product,
  formField: keyof Product
) => {
  const filteredGrates = Object.entries(pickedValues)
    .filter(([, value]) => Boolean(value))
    .reduce((filtered, [currentField, value]) => {
      const wouldFilter = filtered.filter((product) => product[currentField as keyof Product] === value);

      // Skip this filter if it would result in empty array
      return wouldFilter.length > 0 ? wouldFilter : filtered;
    }, products);

  const collisions: (keyof Product)[] = [];

  if (!pickedValues[formField]) {
    return collisions;
  }

  const fieldsToCheck = (Object.keys(pickedValues) as (keyof Product)[]).filter((key) => key !== formField);

  for (const fieldToCheck of fieldsToCheck) {
    const filteredByField = filteredGrates.filter((product) => product[fieldToCheck] === pickedValues[fieldToCheck]);

    if (!filteredByField.length) {
      collisions.push(fieldToCheck);
    }
  }

  return collisions;
};

export const getCollisions = <Product extends StandardProduct>(
  products: Product[],
  pickedValues: Product,
  formFields: (keyof Product)[]
) => {
  const collisions: Partial<Record<keyof Product, (keyof Product)[]>> = {};

  for (const formField of formFields) {
    collisions[formField] = filterBasedCollisionDetection(products, pickedValues, formField);
  }

  // Add reverse collisions
  for (const [formField, fieldCollisions] of Object.entries(collisions)) {
    const castField = formField as keyof Product;

    if (fieldCollisions && fieldCollisions.length) {
      for (const fieldCollision of fieldCollisions) {
        if (collisions[fieldCollision] && !collisions[fieldCollision].includes(castField)) {
          collisions[fieldCollision].push(castField);
        }
      }
    }
  }

  return collisions;
};

export const createSelection = <Product extends StandardProduct>(
  products: Product[],
  pickedValues: Product,
  formField: keyof Product,
  formFields: (keyof Product)[]
) => {
  const selectionSet = new Set(products.map((grate) => grate[formField]).filter(Boolean));

  const selection: ItemsSelection<Product> = [];

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
