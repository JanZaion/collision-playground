import { useState } from 'react';
import './App.css';
import { GrateSelect } from './GrateSelect';

function App() {
  const [selected, setSelected] = useState<Grate>({});

  const handleSelect = (field: GrateField, value: string) => {
    setSelected((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="selectContainer">
      <GrateSelect handleSelect={handleSelect} selected={selected} field="type" />
      {selected.type === 'mesh' && <GrateSelect handleSelect={handleSelect} selected={selected} field="meshSize" />}
      {selected.type === 'mesh' ||
        (selected.type === 'ladder' && (
          <GrateSelect handleSelect={handleSelect} selected={selected} field="constructionType" />
        ))}
      <GrateSelect handleSelect={handleSelect} selected={selected} field="lc" />
      {selected.type === 'mesh' ||
        (selected.type === 'ladder' && (
          <GrateSelect handleSelect={handleSelect} selected={selected} field="surfaces" />
        ))}
      <GrateSelect handleSelect={handleSelect} selected={selected} field="materialEN" />
      <GrateSelect handleSelect={handleSelect} selected={selected} field="surfaceTreatment" />
      <GrateSelect handleSelect={handleSelect} selected={selected} field="e" />
    </div>
  );
}

export default App;
