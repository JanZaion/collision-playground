import { FC } from 'react';
import { exampleGrates } from './exampleGrates';
import { Label } from './Label';
import { createSelection } from './collisionFns';
import { fields } from './fields';

interface GrateSelectProps {
  handleSelect: (field: GrateField, value: string) => void;
  field: GrateField;
  collidingFields?: GrateField[];
  selected: Grate;
}

export const GrateSelect: FC<GrateSelectProps> = ({ handleSelect, field, collidingFields, selected }) => {
  return (
    <>
      <select defaultValue="" onChange={(e) => handleSelect(field, e.target.value)}>
        <option value="" disabled hidden>
          {`SELECT ${field}`}
        </option>
        {createSelection(exampleGrates, selected, field, fields).map((item) => (
          <option
            key={String(item.value)}
            value={String(item.value)}
            className={item.isInCollision ? 'collision-item' : ''}
          >
            {item.label}
          </option>
        ))}
      </select>
      {collidingFields && <Label fields={collidingFields} />}
    </>
  );
};
