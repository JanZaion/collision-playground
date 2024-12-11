import { FC } from 'react';
import { exampleGrates } from './exampleGrates';
import { Label } from './Label';
import { createSelection, translateFormField } from './collisionFns';
import { fieldsMap } from './fields';

interface GrateSelectProps {
  handleSelect: (field: FormFields, value: string) => void;
  field: FormFields;
  collidingFields?: FormFields[];
  selected: Record<FormFields, AcceptedPrimitives>;
}

export const GrateSelect: FC<GrateSelectProps> = ({ handleSelect, field, collidingFields, selected }) => {
  return (
    <>
      <select defaultValue="" onChange={(e) => handleSelect(field, e.target.value)}>
        <option value="" disabled hidden>
          {`SELECT ${field}`}
        </option>
        {createSelection(exampleGrates, selected, translateFormField(fieldsMap, field)).map((item) => (
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
