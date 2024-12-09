import { useState } from 'react';
import './App.css';
import { GrateSelect } from './GrateSelect';
import { getCollisions } from './collisionFns';
import { exampleGrates } from './exampleGrates';

function App() {
  const [selected, setSelected] = useState<Grate>({});

  const handleSelect = (field: GrateField, value: string) => {
    setSelected((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const collisions = getCollisions(exampleGrates, selected, [
    'type',
    'meshSize',
    'constructionType',
    'lc',
    'surfaces',
    'materialEN',
    'surfaceTreatment',
    'e',
  ]);

  console.log(collisions);

  return (
    <div className="selectContainer">
      <GrateSelect handleSelect={handleSelect} field="type" collidingFields={collisions.type} />
      {selected.type === 'mesh' && (
        <GrateSelect handleSelect={handleSelect} field="meshSize" collidingFields={collisions.meshSize} />
      )}
      {(selected.type === 'mesh' || selected.type === 'ladder') && (
        <GrateSelect
          handleSelect={handleSelect}
          field="constructionType"
          collidingFields={collisions.constructionType}
        />
      )}
      <GrateSelect handleSelect={handleSelect} field="lc" collidingFields={collisions.lc} />
      {(selected.type === 'mesh' || selected.type === 'ladder') && (
        <GrateSelect handleSelect={handleSelect} field="surfaces" collidingFields={collisions.surfaces} />
      )}
      <GrateSelect handleSelect={handleSelect} field="materialEN" collidingFields={collisions.materialEN} />
      <GrateSelect handleSelect={handleSelect} field="surfaceTreatment" collidingFields={collisions.surfaceTreatment} />
      <GrateSelect handleSelect={handleSelect} field="e" collidingFields={collisions.e} />
    </div>
  );
}

export default App;
