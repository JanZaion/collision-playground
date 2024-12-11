export const filterBasedCollisionDetection = <Product extends StandardProduct>(
  products: Product[],
  pickedValues: PickedValues<Product>,
  formField: keyof Product
) => {
  const filteredPickedValues = Object.fromEntries(
    Object.entries(pickedValues).filter(([, value]) => value != null)
  ) as Product;

  const filteredProducts = Object.entries(filteredPickedValues).reduce((filtered, [currentField, value]) => {
    const wouldFilter = filtered.filter((product) => product[currentField as keyof Product] === value);

    // Skip this filter if it would result in empty array
    return wouldFilter.length > 0 ? wouldFilter : filtered;
  }, products);

  const collisions: (keyof Product)[] = [];

  if (!filteredPickedValues[formField]) {
    return collisions;
  }

  const fieldsToCheck = (Object.keys(filteredPickedValues) as (keyof Product)[]).filter((key) => key !== formField);

  for (const fieldToCheck of fieldsToCheck) {
    const filteredByField = filteredProducts.filter(
      (product) => product[fieldToCheck] === filteredPickedValues[fieldToCheck]
    );

    if (!filteredByField.length) {
      collisions.push(fieldToCheck);
    }
  }

  return collisions;
};

/**
 * @param products - Array of Product objects to process. Must be flat objects, else it wont work
 * @param pickedValues - Picked values to filter by. Must be flat object, else it wont work. Must only contain keys that are present in the products array
 */
export const getCollisions = <Product extends StandardProduct>(
  products: Product[],
  pickedValues: PickedValues<Product>
) => {
  const formFields = Object.keys(pickedValues) as (keyof Product)[];
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
  pickedValues: PickedValues<Product>,
  formField: keyof Product
) => {
  const selectionSet = new Set(products.map((grate) => grate[formField]).filter(Boolean));

  const selection: ItemsSelection<Product> = [];

  for (const item of selectionSet) {
    const newPickedValues = { ...pickedValues };

    (newPickedValues[formField as Extract<keyof Product, string>] as typeof item) = item;

    const collisions = getCollisions(products, newPickedValues);

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

// now starts the translation nonsense

export const translateFormField = <FormKeys extends ProductKeys, ApiKeys extends ProductKeys>(
  fieldsMap: FieldsMap<FormKeys, ApiKeys>,
  field: FormKeys
) => {
  return fieldsMap[field] as ApiKeys;
};

export const translateApiField = <FormKeys extends ProductKeys, ApiKeys extends ProductKeys>(
  fieldsMap: FieldsMap<FormKeys, ApiKeys>,
  field: ApiKeys
) => {
  return Object.entries(fieldsMap).find(([, value]) => value === field)?.[0] as FormKeys;
};

export const translatePickedValues = <FormKeys extends ProductKeys, ApiKeys extends ProductKeys>(
  fieldsMap: FieldsMap<FormKeys, ApiKeys>,
  pickedValues: FlatPartialObject<FormKeys>
) => {
  const formFields = Object.keys(pickedValues) as FormKeys[];

  const translatedFormValues = formFields.reduce((accumulated, field) => {
    accumulated[fieldsMap[field] as ApiKeys] = pickedValues[field];
    return accumulated;
  }, {} as FlatPartialObject<ApiKeys>);

  return translatedFormValues;
};

const getKeyByValue = <FormKeys extends ProductKeys, ApiKeys extends ProductKeys>(
  value: ApiKeys,
  fieldsMap: FieldsMap<FormKeys, ApiKeys>
) => {
  const entry = Object.entries(fieldsMap).find(([, val]) => val === value);
  return entry ? (entry[0] as FormKeys) : undefined;
};

export const translateCollisions = <FormKeys extends ProductKeys, ApiKeys extends ProductKeys>(
  fieldsMap: FieldsMap<FormKeys, ApiKeys>,
  collisions: Partial<Record<keyof ApiKeys, ApiKeys[]>>
) => {
  const translatedCollisions: Partial<Record<FormKeys, FormKeys[]>> = {};

  for (const [field, fieldCollisions] of Object.entries(collisions)) {
    const translatedField = getKeyByValue(field, fieldsMap);

    if (translatedField) {
      translatedCollisions[translatedField] = fieldCollisions?.map((collision) => {
        const translatedCollision = getKeyByValue(collision, fieldsMap);
        return translatedCollision as FormKeys;
      });
    }
  }

  return translatedCollisions;
};

export const getCollisionsWithTranslation = <
  Product extends StandardProduct,
  FormKeys extends ProductKeys,
  ApiKeys extends Extract<keyof Product, string>
>(
  products: Product[],
  pickedValues: FlatPartialObject<FormKeys>,
  fieldsMap: FieldsMap<FormKeys, ApiKeys>
) => {
  const translatedPickedValues = translatePickedValues(fieldsMap, pickedValues);
  const collisions = getCollisions(products, translatedPickedValues as PickedValues<Product>);
  return translateCollisions(fieldsMap, collisions as Partial<Record<keyof ApiKeys, ApiKeys[]>>);
};
