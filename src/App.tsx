import { useState } from 'react';
import './App.css';
import { createSelection } from './createSelection';
import { exampleGrates } from './exampleGrates';
import { exampleMeshGrates } from './exampleMeshGrates';
import { filterBasedCollisionDetection } from './filterBasedCollisionDetection';
import { Label } from './Label';

function App() {
  const [selected, setSelected] = useState<Partial<Record<GrateField, string | number | null | undefined>>>({
    type: null,
    meshSize: null,
    constructionType: null,
    lc: null,
    surfaces: null,
    surfaceTreatment: null,
    e: null,
  });

  const handleSelect = (field: GrateField, value: string) => {
    setSelected((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="selectContainer">
      <select defaultValue="" onChange={(e) => handleSelect('type', e.target.value)}>
        <option value="" disabled hidden>
          SELECT type
        </option>
        {createSelection(exampleMeshGrates, 'type').map((item) => (
          <option key={String(item.value)} value={String(item.value)}>
            {item.label}
          </option>
        ))}
      </select>
      <Label fields={filterBasedCollisionDetection(exampleGrates, selected, 'type')} />
      <select defaultValue="" onChange={(e) => handleSelect('meshSize', e.target.value)}>
        <option value="" disabled hidden>
          SELECT mesh size
        </option>
        {createSelection(exampleGrates, 'meshSize').map((item) => (
          <option key={String(item.value)} value={String(item.value)}>
            {item.label}
          </option>
        ))}
      </select>
      <label>collisions</label>
      <select defaultValue="" onChange={(e) => handleSelect('constructionType', e.target.value)}>
        <option value="" disabled hidden>
          SELECT construction type
        </option>
        {createSelection(exampleGrates, 'constructionType').map((item) => (
          <option key={String(item.value)} value={String(item.value)}>
            {item.label}
          </option>
        ))}
      </select>
      <label>collisions</label>
      <select defaultValue="" onChange={(e) => handleSelect('lc', e.target.value)}>
        <option value="" disabled hidden>
          SELECT lc
        </option>
        {createSelection(exampleGrates, 'lc').map((item) => (
          <option key={String(item.value)} value={String(item.value)}>
            {item.label}
          </option>
        ))}
      </select>
      <label>collisions</label>
      <select defaultValue="" onChange={(e) => handleSelect('surfaces', e.target.value)}>
        <option value="" disabled hidden>
          SELECT grating surgefaces
        </option>
        {createSelection(exampleGrates, 'surfaces').map((item) => (
          <option key={String(item.value)} value={String(item.value)}>
            {item.label}
          </option>
        ))}
      </select>
      <label>collisions</label>
      <select defaultValue="" onChange={(e) => handleSelect('surfaceTreatment', e.target.value)}>
        <option value="" disabled hidden>
          SELECT surface treatment
        </option>
        {createSelection(exampleGrates, 'surfaceTreatment').map((item) => (
          <option key={String(item.value)} value={String(item.value)}>
            {item.label}
          </option>
        ))}
      </select>
      <label>collisions</label>
      <select defaultValue="" onChange={(e) => handleSelect('e', e.target.value)}>
        <option value="" disabled hidden>
          SELECT e
        </option>
        {createSelection(exampleGrates, 'e').map((item) => (
          <option key={String(item.value)} value={String(item.value)}>
            {item.label}
          </option>
        ))}
      </select>
      <label>collisions</label>
    </div>
  );
}

export default App;
