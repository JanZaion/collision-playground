export const createSelection = (grates: Grate[], type: GrateField) => {
  const selection = new Set(grates.map((grate) => grate[type]).filter(Boolean));

  return Array.from(selection)
    .sort()
    .map((value) => ({
      value,
      label: value,
    }));
};
