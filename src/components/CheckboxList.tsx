import { ListContainer, ListItem } from '@/components/List';

interface CheckboxListProps {
  items: readonly string[];
  state: Record<string, boolean>;
  onChange?: (id: string) => void;
}

function CheckboxList({ items, state, onChange }: CheckboxListProps) {
  return (
    <ListContainer>
      {items.map((item, i) => (
        <ListItem key={i}>
          <input
            onChange={() => onChange && onChange(item)}
            checked={state[item]}
            type='checkbox'
            id={i.toString()}
          />
          <label htmlFor={i.toString()}>{item}</label>
        </ListItem>
      ))}
    </ListContainer>
  );
}

export default CheckboxList;
