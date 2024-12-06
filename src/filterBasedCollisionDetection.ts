export const filterBasedCollisionDetection = (grates: Grate[], pickedValues: Grate, field: GrateField) => {
  const filteredGrates = Object.entries(pickedValues)
    .filter(([, value]) => Boolean(value))
    .reduce((filtered, [currentField, value]) => {
      const wouldFilter = filtered.filter((grate) => grate[currentField as keyof Grate] === value);

      // Skip this filter if it would result in empty array
      return wouldFilter.length > 0 ? wouldFilter : filtered;
    }, grates);

  // console.log(filteredGrates);

  const collisions: GrateField[] = [];

  if (!pickedValues[field]) {
    return collisions;
  }

  // if (!filteredGrates.length) {
  //   return collisions;
  // }

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

// const filteredGrates = grates.filter((grate) =>
//   Object.entries(pickedValues)
//     .filter(([, value]) => Boolean(value))
//     .every(([field, value]) => grate[field as keyof Grate] === value)
// );
