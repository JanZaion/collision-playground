import { useState } from 'react';
import './App.css';
import { GrateSelect } from './GrateSelect';
import { getCollisionsWithTranslation } from './collisionFns';
import { exampleGrates } from './exampleGrates';
import { fieldsMap } from './fields';

function App() {
  const [selected, setSelected] = useState<Record<FormFields, AcceptedPrimitives>>({
    typanuel: null,
    meshSize: null,
    constructionType: null,
    lc: null,
    surfaces: null,
    materialEN: null,
    surfaceTreatment: null,
    emanuel: null,
  });

  const handleSelect = (field: FormFields, value: string) => {
    setSelected((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const collisions = getCollisionsWithTranslation(exampleGrates, selected, fieldsMap);

  return (
    <div className="selectContainer">
      <GrateSelect
        handleSelect={handleSelect}
        field="typanuel"
        collidingFields={collisions.typanuel}
        selected={selected}
      />
      {selected.typanuel === 'mesh' && (
        <GrateSelect
          handleSelect={handleSelect}
          field="meshSize"
          collidingFields={collisions.meshSize}
          selected={selected}
        />
      )}
      {(selected.typanuel === 'mesh' || selected.typanuel === 'ladder') && (
        <GrateSelect
          handleSelect={handleSelect}
          field="constructionType"
          collidingFields={collisions.constructionType}
          selected={selected}
        />
      )}
      <GrateSelect handleSelect={handleSelect} field="lc" collidingFields={collisions.lc} selected={selected} />
      {(selected.typanuel === 'mesh' || selected.typanuel === 'ladder') && (
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
      <GrateSelect
        handleSelect={handleSelect}
        field="emanuel"
        collidingFields={collisions.emanuel}
        selected={selected}
      />
    </div>
  );
}

export default App;
