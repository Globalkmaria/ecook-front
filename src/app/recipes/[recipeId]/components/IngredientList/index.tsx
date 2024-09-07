import style from './style.module.scss';

import { ListItem } from '@/components/List';
import { RecipeIngredient } from '@/data/ingredients';

interface Props {
  items: readonly RecipeIngredient[];
  onChange: (id: number) => void;
  state: Record<string, boolean>;
}

function Ingredients({ items, onChange, state }: Props) {
  return (
    <ul>
      {items.map((item, i) => (
        <ListItem className={style.item} key={i}>
          <input
            onChange={() => onChange(i)}
            checked={state[i]}
            type='checkbox'
            id={i.toString()}
          />
          <div className={style.content}>
            <label htmlFor={i.toString()}>
              <span className={style.name}>{item.name}</span>
              <span>{item.quantity}</span>
              {item.ingredientProductId && (
                <button className={style.icon}>i</button>
              )}
            </label>
          </div>
        </ListItem>
      ))}
    </ul>
  );
}

export default Ingredients;
