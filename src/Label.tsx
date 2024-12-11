import { FC } from 'react';

interface LabelProps {
  fields: FormFields[];
}

export const Label: FC<LabelProps> = ({ fields }) => {
  return (
    <label>
      {fields.map((field, index) => (
        <span key={`${index}_${field}`}>
          {field}
          {index < fields.length - 1 ? ', ' : ''}
        </span>
      ))}
    </label>
  );
};
