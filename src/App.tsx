import { useState } from 'react';
import './App.css';
import { GrateSelect } from './GrateSelect';
import { getCollisions, translateCollisions, translatePickedValues } from './collisionFns';
import { exampleGrates } from './exampleGrates';
import { fieldsMap } from './fields';

function App() {
  const [selected, setSelected] = useState<Grate>({
    type: null,
    meshSize: null,
    constructionType: null,
    lc: null,
    surfaces: null,
    materialEN: null,
    surfaceTreatment: null,
    e: null,
  });

  const handleSelect = (field: GrateField, value: string) => {
    setSelected((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const collisions = getCollisions(exampleGrates, selected);

  // console.log(translatePickedValues(fieldsMap, selected));
  const translatedCollisions = translatePickedValues(fieldsMap, selected);
  const translatedBack = translateCollisions(fieldsMap, translatedCollisions);

  // console.log(translatedCollisions);

  return (
    <div className="selectContainer">
      <GrateSelect handleSelect={handleSelect} field="type" collidingFields={collisions.type} selected={selected} />
      {selected.type === 'mesh' && (
        <GrateSelect
          handleSelect={handleSelect}
          field="meshSize"
          collidingFields={collisions.meshSize}
          selected={selected}
        />
      )}
      {(selected.type === 'mesh' || selected.type === 'ladder') && (
        <GrateSelect
          handleSelect={handleSelect}
          field="constructionType"
          collidingFields={collisions.constructionType}
          selected={selected}
        />
      )}
      <GrateSelect handleSelect={handleSelect} field="lc" collidingFields={collisions.lc} selected={selected} />
      {(selected.type === 'mesh' || selected.type === 'ladder') && (
        <GrateSelect
          handleSelect={handleSelect}
          field="surfaces"
          collidingFields={collisions.surfaces}
          selected={selected}
        />
      )}
      <GrateSelect
        handleSelect={handleSelect}
        field="materialEN"
        collidingFields={collisions.materialEN}
        selected={selected}
      />
      <GrateSelect
        handleSelect={handleSelect}
        field="surfaceTreatment"
        collidingFields={collisions.surfaceTreatment}
        selected={selected}
      />
      <GrateSelect handleSelect={handleSelect} field="e" collidingFields={collisions.e} selected={selected} />
    </div>
  );
}

export default App;
