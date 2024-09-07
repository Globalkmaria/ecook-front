import style from './style.module.scss';

import { ListItem } from '@/components/List';
import { RecipeIngredient } from '@/data/ingredients';
import InformationButton from './InformationButton';

interface Props {
  ingredients: readonly RecipeIngredient[];
  onChange: (id: number) => void;
  state: Record<string, boolean>;
}

function Ingredients({ ingredients, onChange, state }: Props) {
  return (
    <ul>
      {ingredients.map((item, i) => (
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
                <InformationButton
                  ingredientProductId={item.ingredientProductId}
                />
              )}
            </label>
          </div>
        </ListItem>
      ))}
    </ul>
  );
}

export default Ingredients;
