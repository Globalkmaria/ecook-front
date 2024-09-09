import { Dispatch, SetStateAction } from 'react';

export const onFieldChange = <T extends { id: string }>(
  setState: Dispatch<SetStateAction<T[]>>,
  id: string,
  fieldName: string,
  value: string,
) => {
  setState((prev) =>
    prev.map((item) =>
      item.id === id ? { ...item, [fieldName]: value } : item,
    ),
  );
};
