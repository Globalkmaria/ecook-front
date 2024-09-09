'use client';

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import style from './style.module.scss';

import { ChipListInput, Input } from '@/components/Input';
import ImageUploader from '@/components/imageUploader';

import Ingredients, { Ingredient } from './components/Ingredients';
import { AddButton, RemoveButton } from './components/buttons';
import Button from '@/components/Button';

interface Step {
  id: string;
  value: string;
}

function NewRecipe() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    {
      id: uuidv4(),
      name: '',
      productId: null,
      quantity: '',
    },
  ]);
  const [steps, setSteps] = useState<Step[]>([]);
  const tagsState = useState<string[]>([]);
  const imgState = useState<string | null>(null);

  const addIngredient = () => {
    const id = uuidv4();
    setIngredients([
      ...ingredients,
      { id, name: '', productId: null, quantity: '' },
    ]);
  };

  const removeIngredient = (id: string) => {
    setIngredients(ingredients.filter((item) => item.id !== id));
  };

  const addStep = () => {
    const id = uuidv4();
    setSteps([...steps, { id, value: '' }]);
  };

  const removeStep = (id: string) => {
    setSteps(steps.filter((item) => item.id !== id));
  };

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
          <div className={style.ingredients}>
            <Ingredients
              onRemove={removeIngredient}
              ingredients={ingredients}
            />
            <AddButton onClick={addIngredient}>Add a ingredient</AddButton>
          </div>
        </div>

        {/* steps */}
        <div className={style.box}>
          <h3>Steps*</h3>
          <ol>
            {steps.map((item) => (
              <Step key={item.id} item={item} onRemove={removeStep} />
            ))}
          </ol>

          <AddButton onClick={addStep}>Add a step</AddButton>
        </div>

        <Button>Submit</Button>
      </form>
    </div>
  );
}

export default NewRecipe;

interface StepProps {
  item: Step;
  onRemove: (id: string) => void;
}

function Step({ item, onRemove }: StepProps) {
  return (
    <li>
      <input type='text' value={item.value} />
      <RemoveButton onClick={() => onRemove(item.id)} />
    </li>
  );
}
