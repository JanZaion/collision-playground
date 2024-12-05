import './App.css';
import { createSelection } from './createSelection';
import { exampleGrates } from './exampleGrates';
import { exampleMeshGrates } from './exampleMeshGrates';
import { filterBasedCollisionDetection, pickedValues } from './filterBasedCollisionDetection';

function App() {
  return (
    <div className="selectContainer">
      <select defaultValue="">
        <option value="" disabled hidden>
          Select type
        </option>
        {createSelection(exampleMeshGrates, 'type').map((item) => (
          <option key={String(item.value)} value={String(item.value)}>
            {item.label}
          </option>
        ))}
      </select>
      <label>collisions</label>
      <select defaultValue="">
        <option value="" disabled hidden>
          Select mesh size
        </option>
        {createSelection(exampleGrates, 'meshSize').map((item) => (
          <option key={String(item.value)} value={String(item.value)}>
            {item.label}
          </option>
        ))}
      </select>
      <label>collisions</label>
      <select defaultValue="">
        <option value="" disabled hidden>
          Select construction type
        </option>
        {createSelection(exampleGrates, 'constructionType').map((item) => (
          <option key={String(item.value)} value={String(item.value)}>
            {item.label}
          </option>
        ))}
      </select>
      <label>collisions</label>
      <select defaultValue="">
        <option value="" disabled hidden>
          Select lc
        </option>
        {createSelection(exampleGrates, 'lc').map((item) => (
          <option key={String(item.value)} value={String(item.value)}>
            {item.label}
          </option>
        ))}
      </select>
      <label>collisions</label>
      <select defaultValue="">
        <option value="" disabled hidden>
          Select grating surgefaces
        </option>
        {createSelection(exampleGrates, 'surfaces').map((item) => (
          <option key={String(item.value)} value={String(item.value)}>
            {item.label}
          </option>
        ))}
      </select>
      <label>collisions</label>
      <select defaultValue="">
        <option value="" disabled hidden>
          Select surface treatment
        </option>
        {createSelection(exampleGrates, 'surfaceTreatment').map((item) => (
          <option key={String(item.value)} value={String(item.value)}>
            {item.label}
          </option>
        ))}
      </select>
      <label>collisions</label>
      <select defaultValue="">
        <option value="" disabled hidden>
          Select e
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
