import { LabelHTMLAttributes, memo, useState } from 'react';

import { joinClassNames } from '@/utils/style';

import { getListCheckboxInitialState } from './helper';
import style from './style.module.scss';

const Container = memo(function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <ul className={className}>{children}</ul>;
});

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  selected?: boolean;
}

const Label = memo(function Label({
  children,
  className,
  selected,
  ...restProps
}: LabelProps) {
  const joinedClassName = joinClassNames(
    style.label,
    selected ? style['label--selected'] : '',
    className,
  );

  return (
    <label className={joinedClassName} {...restProps}>
      {children}
    </label>
  );
});

interface ItemProps {
  onChange?: (id: number) => void;
  checked: boolean;
  index: number;
  children?: React.ReactNode;
  className?: string;
}

const Item = memo(function Item({
  onChange,
  checked,
  index,
  children,
  className,
}: ItemProps) {
  const joinedClassName = joinClassNames(style.item, className);
  return (
    <li className={joinedClassName}>
      <input
        onChange={() => onChange && onChange(index)}
        checked={checked}
        type='checkbox'
        id={index.toString()}
      />
      {children}
    </li>
  );
});

// Full implementation of CheckboxList component

interface ListProps {
  items: readonly string[];
  checkedItems?: Record<string, boolean>;
  onChange?: (index: number) => void;
}

const List = memo(function List({
  items,
  checkedItems: outerCheckedItems,
  onChange,
}: ListProps) {
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
    <Container>
      {items.map((item, index) => (
        <Item
          key={index}
          checked={finalCheckedItems[index]}
          index={index}
          onChange={handleOnChange}
        >
          <Label selected={finalCheckedItems[index]} htmlFor={index.toString()}>
            {item}
          </Label>
        </Item>
      ))}
    </Container>
  );
});

const Checkbox = {
  List,
  Container,
  Item,
  Label,
};

export default Checkbox;
