export const filterBasedCollisionDetection = (products: Grate[], formValues: Grate, formField: GrateField) => {
  const filteredGrates = Object.entries(formValues)
    .filter(([, value]) => Boolean(value))
    .reduce((filtered, [currentField, value]) => {
      const wouldFilter = filtered.filter((product) => product[currentField as keyof Grate] === value);

      // Skip this filter if it would result in empty array
      return wouldFilter.length > 0 ? wouldFilter : filtered;
    }, products);

  const collisions: GrateField[] = [];

  if (!formValues[formField]) {
    return collisions;
  }

  const fieldsToCheck = (Object.keys(formValues) as GrateField[]).filter((key) => key !== formField);

  for (const fieldToCheck of fieldsToCheck) {
    const filteredByField = filteredGrates.filter((product) => product[fieldToCheck] === formValues[fieldToCheck]);

    if (!filteredByField.length) {
      collisions.push(fieldToCheck);
    }
  }

  return collisions;
};

export const getCollisions = (products: Grate[], formValues: Grate, formFields: GrateField[]) => {
  const collisions: Partial<Record<GrateField, GrateField[]>> = {};

  for (const formField of formFields) {
    collisions[formField] = filterBasedCollisionDetection(products, formValues, formField);
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

export const createGetCollidingFields = <FormKeys extends ProductKeys, ApiKeys extends ProductKeys>(
  fieldsMap: FieldsMap<FormKeys, ApiKeys>
) => {
  const getCollidingFields = (
    formFields: FormKeys[],
    flatFormValues: FlatPartialObject<FormKeys>,
    flatProducts: FlatPartialObject<ApiKeys>[]
  ) => {
    if (!formFields.length) {
      return {};
    }

    const translatedFormValues = formFields.reduce((accumulated, field) => {
      if (flatFormValues[field]) {
        accumulated[fieldsMap[field] as ApiKeys] = flatFormValues[field];
      }
      return accumulated;
    }, {} as FlatPartialObject<ApiKeys>);

    const translatedFormFields = formFields.map((field) => fieldsMap[field] as ApiKeys);

    const apiFieldCollisions = getCollisions(flatProducts, translatedFormValues, translatedFormFields);

    const formFieldCollisions = formFields.reduce((accumulated, field) => {
      accumulated[field] = [...apiFieldCollisions[fieldsMap[field] as ApiKeys]].map(
        (apiField) => Object.keys(fieldsMap).find((key) => fieldsMap[key as FormKeys] === apiField) as FormKeys
      );

      return accumulated;
    }, {} as Record<FormKeys, FormKeys[]>);

    console.log(formFieldCollisions);

    return formFieldCollisions;
  };

  return getCollidingFields;
};

export const createSelection = (
  products: Grate[],
  formValues: Grate,
  formField: GrateField,
  formFields: GrateField[]
) => {
  const selectionSet = new Set(products.map((grate) => grate[formField]).filter(Boolean));

  const selection: ItemsSelection = [];

  for (const item of selectionSet) {
    const newPickedValues = { ...formValues };

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
