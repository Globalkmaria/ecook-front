import style from './style.module.scss';

import { ListItem } from '@/components/List';

interface CheckboxListProps {
  items: readonly string[];
  state: Record<string, boolean>;
  onChange?: (id: number) => void;
}

function CheckboxList({ items, state, onChange }: CheckboxListProps) {
  return (
    <ul>
      {items.map((item, i) => (
        <ListItem className={style.item} key={i}>
          <input
            onChange={() => onChange && onChange(i)}
            checked={state[i]}
            type='checkbox'
            id={i.toString()}
          />
          <label htmlFor={i.toString()}>{item}</label>
        </ListItem>
      ))}
    </ul>
  );
}

export default CheckboxList;
