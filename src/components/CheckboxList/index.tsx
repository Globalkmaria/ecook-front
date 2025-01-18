import { memo } from 'react';

import style from './style.module.scss';

import { ListItem } from '@/components/List';

interface CheckboxListProps {
  items: readonly string[];
  state: Record<string, boolean>;
  onChange?: (index: number) => void;
}

function CheckboxList({ items, state, onChange }: CheckboxListProps) {
  return (
    <ul>
      {items.map((item, i) => (
        <Item
          key={i}
          item={item}
          checked={state[i]}
          index={i}
          onChange={onChange}
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
