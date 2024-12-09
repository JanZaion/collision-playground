import { FC } from 'react';
import { createSelection } from './createSelection';
import { exampleGrates } from './exampleGrates';
import { Label } from './Label';

interface GrateSelectProps {
  handleSelect: (field: GrateField, value: string) => void;
  field: GrateField;
  collidingFields?: GrateField[];
}

export const GrateSelect: FC<GrateSelectProps> = ({ handleSelect, field, collidingFields }) => {
  return (
    <>
      <select defaultValue="" onChange={(e) => handleSelect(field, e.target.value)}>
        <option value="" disabled hidden>
          {`SELECT ${field}`}
        </option>
        {createSelection(exampleGrates, field).map((item) => (
          <option key={String(item.value)} value={String(item.value)}>
            {item.label}
          </option>
        ))}
      </select>
      {collidingFields && <Label fields={collidingFields} />}
    </>
  );
};
