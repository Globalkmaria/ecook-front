import { memo, useState } from 'react';

import style from './style.module.scss';

import { ListItem } from '@/components/List';

import { getListCheckboxInitialState } from './helper';

interface CheckboxListProps {
  items: readonly string[];
  state?: Record<string, boolean>;
  onChange?: (index: number) => void;
}

function CheckboxList({
  items,
  state: outerState,
  onChange,
}: CheckboxListProps) {
  const [innerState, setInnerState] = useState(
    getListCheckboxInitialState(items),
  );

  const handleOnChange = (index: number) => {
    if (outerState === undefined) {
      setInnerState((prev) => ({
        ...prev,
        [index]: !prev[index],
      }));
    }

    if (onChange) {
      onChange(index);
    }
  };

  const state = outerState ?? innerState;

  return (
    <ul>
      {items.map((item, index) => (
        <Item
          key={index}
          item={item}
          checked={state[index]}
          index={index}
          onChange={handleOnChange}
        />
      ))}
    </ul>
  );
}

export default CheckboxList;

interface ItemProps {
  item: string;
  onChange?: (id: number) => void;
  checked: boolean;
  index: number;
}

const Item = memo(function Item({ item, onChange, checked, index }: ItemProps) {
  return (
    <ListItem className={style.item}>
      <input
        onChange={() => onChange && onChange(index)}
        checked={checked}
        type='checkbox'
        id={index.toString()}
      />
      <label htmlFor={index.toString()}>{item}</label>
    </ListItem>
  );
});
