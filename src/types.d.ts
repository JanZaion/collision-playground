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
  e: 20.5,
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
}

export {};
