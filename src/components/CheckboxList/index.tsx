import { memo, useState } from 'react';

import style from './style.module.scss';

import { ListItem } from '@/components/List';

import { getListCheckboxInitialState } from './helper';

interface CheckboxListProps {
  items: readonly string[];
  checkedItems?: Record<string, boolean>;
  onChange?: (index: number) => void;
}

function CheckboxList({
  items,
  checkedItems: outerCheckedItems,
  onChange,
}: CheckboxListProps) {
  const [innerCheckedItems, setInnerCheckedItems] = useState(
    getListCheckboxInitialState(items),
  );

  const handleOnChange = (index: number) => {
    if (outerCheckedItems === undefined) {
      setInnerCheckedItems((prev) => ({
        ...prev,
        [index]: !prev[index],
      }));
    }

    onChange && onChange(index);
  };

  const finalCheckedItems = outerCheckedItems ?? innerCheckedItems;

  return (
    <ul>
      {items.map((item, index) => (
        <Item
          key={index}
          item={item}
          checked={finalCheckedItems[index]}
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
