'use client';

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import style from './style.module.scss';
import { ChipListInput } from '@/components/Input';
import ImageUploader from '@/components/imageUploader';

interface Ingredient {
  id: string;
  name: string;
  productId: string | null;
}

interface Step {
  id: string;
  value: string;
}

function NewRecipe() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [steps, setSteps] = useState<Step[]>([]);
  const tagsState = useState<string[]>([]);
  const imgState = useState<string | null>(null);

  const addIngredient = () => {
    const id = uuidv4();
    setIngredients([...ingredients, { id, name: '', productId: null }]);
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
          <input className={style.input} type='text' id='title' name='title' />
        </div>

        <div className={style.box}>
          <label htmlFor='summary'>
            <h3>Summary</h3>
          </label>
          <input
            className={style.input}
            type='text'
            id='summary'
            name='summary'
          />
        </div>

        <div className={style.box}>
          <label htmlFor='description'>
            <h3>Description</h3>
          </label>
          <input
            className={style.input}
            type='text'
            id='description'
            name='description'
          />
        </div>

        <div className={style.box}>
          <label htmlFor='time'>
            <h3>Time</h3>
          </label>
          <input className={style.input} type='text' id='time' name='time' />
        </div>

        <div className={style.box}>
          <h3>Tags</h3>
          <ChipListInput state={tagsState} />
        </div>

        {/* img */}
        <div className={style.box}>
          <h3>Image</h3>
          <ImageUploader state={imgState} />
        </div>

        <div className={style.box}>
          <h3>Ingredients*</h3>
          <ul>
            {ingredients.map((item) => (
              <Ingredient
                onRemove={removeIngredient}
                key={item.id}
                item={item}
              />
            ))}
          </ul>
          <AddButton onClick={addIngredient}>Add a ingredient</AddButton>
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

        <button type='button'>Submit</button>
      </form>
    </div>
  );
}

export default NewRecipe;

function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <button type='button' onClick={onClick}>
      -
    </button>
  );
}

function AddButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button type='button' onClick={onClick}>
      {children}
    </button>
  );
}

interface IngredientProps {
  item: Ingredient;
  onRemove: (id: string) => void;
}

function Ingredient({ item, onRemove }: IngredientProps) {
  return (
    <li>
      <input type='text' value={item.name} />
      {/* selected product */}
      <RemoveButton onClick={() => onRemove(item.id)} />
    </li>
  );
}

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
