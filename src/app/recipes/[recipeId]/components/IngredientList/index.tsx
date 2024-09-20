import style from './style.module.scss';

import { ListItem } from '@/components/List';
import InformationButton from './InformationButton';
import { RecipeDetail } from '@/service/recipes/type';

interface Props {
  ingredients: RecipeDetail['ingredients'];
  onChange: (id: number) => void;
  state: Record<string, boolean>;
}

function Ingredients({ ingredients, onChange, state }: Props) {
  return (
    <ul>
      {ingredients.map((ingredient, i) => (
        <ListItem className={style.item} key={i}>
          <input
            onChange={() => onChange(i)}
            checked={state[i]}
            type='checkbox'
            id={i.toString()}
          />
          <div className={style.content}>
            <label htmlFor={i.toString()}>
              <span className={style.name}>{ingredient.name}</span>
              <span>{ingredient.quantity}</span>
              {ingredient.userProduct && (
                <InformationButton ingredient={ingredient} />
              )}
            </label>
          </div>
        </ListItem>
      ))}
    </ul>
  );
}

export default Ingredients;
