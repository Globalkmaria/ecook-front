'use client';

import { Dispatch, SetStateAction, useState } from 'react';

import style from './style.module.scss';

import { ChipListInput, Input } from '@/components/Input';
import ImageUploader from '@/components/imageUploader';

import Ingredients, { Ingredient } from './components/Ingredients';
import { AddButton } from './components/buttons';
import Button from '@/components/Button';
import Steps, { Step } from './components/Steps';
import { getRandomId } from '@/utils/generateId';
import { onFieldChange } from './helper';

const INGREDIENTS_INITIAL_STATE: Ingredient[] = [
  {
    id: getRandomId(),
    name: '',
    productId: null,
    quantity: '',
  },
];

const STEPS_INITIAL_STATE: Step[] = [{ id: getRandomId(), value: '' }];

function NewRecipe() {
  const [ingredients, setIngredients] = useState<Ingredient[]>(
    INGREDIENTS_INITIAL_STATE,
  );
  const [steps, setSteps] = useState<Step[]>(STEPS_INITIAL_STATE);
  const tagsState = useState<string[]>([]);
  const imgState = useState<string | null>(null);

  const addIngredient = () =>
    setIngredients([
      ...ingredients,
      { id: getRandomId(), name: '', productId: null, quantity: '' },
    ]);

  const onRemoveIngredient = (id: string) =>
    setIngredients(ingredients.filter((item) => item.id !== id));

  const addStep = () => setSteps([...steps, { id: getRandomId(), value: '' }]);

  const onRemoveStep = (id: string) =>
    setSteps(steps.filter((item) => item.id !== id));

  const onIngredientChange = (id: string, fieldName: string, value: string) =>
    onFieldChange(setIngredients, id, fieldName, value);

  const onStepChange = (id: string, fieldName: string, value: string) =>
    onFieldChange(setSteps, id, fieldName, value);

  return (
    <div className={style.container}>
      <h2 className={style.title}>Submit new recipe</h2>

      <form className={style.form}>
        <div className={style.box}>
          <label htmlFor='title'>
            <h3>Title*</h3>
          </label>
          <Input id='title' name='title' />
        </div>

        <div className={style.box}>
          <label htmlFor='summary'>
            <h3>Summary</h3>
          </label>
          <Input id='summary' name='summary' />
        </div>

        <div className={style.box}>
          <label htmlFor='description'>
            <h3>Description</h3>
          </label>
          <Input id='description' name='description' />
        </div>

        <div className={style.box}>
          <label htmlFor='time'>
            <h3>Time</h3>
          </label>
          <Input id='time' name='time' />
        </div>

        <div className={style.box}>
          <h3>Tags</h3>
          <ChipListInput state={tagsState} />
        </div>

        <div className={style.box}>
          <h3>Image</h3>
          <ImageUploader state={imgState} />
        </div>

        <div className={style.box}>
          <h3>Ingredients*</h3>
          <div className={style.box__content}>
            <Ingredients
              onChange={onIngredientChange}
              onRemove={onRemoveIngredient}
              ingredients={ingredients}
            />
            <AddButton onClick={addIngredient}>Add a ingredient</AddButton>
          </div>
        </div>

        <div className={style.box}>
          <h3>Steps*</h3>
          <div className={style.box__content}>
            <Steps
              steps={steps}
              onRemove={onRemoveStep}
              onChange={onStepChange}
            />
            <AddButton onClick={addStep}>Add a step</AddButton>
          </div>
        </div>

        <Button className={style['submit-button']}>Submit</Button>
      </form>
    </div>
  );
}

export default NewRecipe;
