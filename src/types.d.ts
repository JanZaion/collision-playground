import { fieldsMap } from './fields';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const exampleGrate = {
  wo: 155,
  wi: 125,
  type: 'ladder',
  lc: 'C250',
  materialAISI: 'AISI 304',
  materialEN: '1.4301',
  length: 499.5,
  width: 123,
  height: 20,
  surfaces: 'antislip',
  e: '20.5',
  fillingBar: '20x5',
  frameBar: '20x5',
  loadBar: '20x5',
  meshSize: '20x5',
  surfaceTreatment: 'Blasted',
  clearance: 20,
  barSpacing: 50,
  constructionType: 'old',
  locking: false,
  lockingType: '20x5',
  productNumber: '21740',
};

declare global {
  type NullablePartial<T> = {
    [P in keyof T]?: T[P] | null;
  };

  type Grate = NullablePartial<typeof exampleGrate>;

  type GrateField = keyof Grate;

  type AcceptedPrimitives = number | string | boolean | null | undefined;

  type ProductKeys = string;

  type FlatPartialObject<Keys extends ProductKeys> = Partial<Record<Keys, AcceptedPrimitives>>;

  type StandardProduct = FlatPartialObject<ProductKeys>;

  type ItemsSelection<Product extends StandardProduct> = {
    value: NonNullable<Product[keyof Product]>;
    label: string;
    isInCollision: boolean;
  }[];

  type FieldsMap<FormKeys extends ProductKeys, ApiKeys extends ProductKeys> = Partial<Record<FormKeys, ApiKeys>>;

  type ValueOf<T> = T[keyof T];

  type FormFields = keyof typeof fieldsMap;

  type PickedValues<Product extends StandardProduct> = FlatPartialObject<Extract<keyof Product, string>>;
}

export {};
