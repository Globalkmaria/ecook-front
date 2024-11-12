'use client';

import { ChangeEventHandler, useState } from 'react';

import style from './style.module.scss';

import { ChipListInput, Input } from '@/components/Input';
import ImageUploader from '@/components/imageUploader';
import Button from '@/components/Button';

import { getRandomId } from '@/utils/generateId';

import Ingredients from './components/Ingredients';
import { AddButton } from './components/buttons';
import Steps, { Step } from './components/Steps';
import { onFieldChange } from './helper';
import { NewRecipeData, NewRecipeIngredient } from '@/service/recipes/type';

type TextInputs = Pick<
  NewRecipeData,
  'title' | 'description' | 'simpleDescription' | 'time'
>;

export type NewRecipeIngredientState = NewRecipeIngredient & { id: string };
export type NewRecipeIngredientStates = NewRecipeIngredientState[];

const INGREDIENTS_INITIAL_STATE: NewRecipeIngredientStates = [
  {
    id: getRandomId(),
    name: '',
    quantity: '',
    ingredientId: null,
    productId: null,
    newProduct: null,
  },
];

const STEPS_INITIAL_STATE: Step[] = [{ id: getRandomId(), value: '' }];

function NewRecipe() {
  const [textInputs, setTextInputs] = useState<TextInputs>({
    title: '',
    simpleDescription: '',
    description: '',
    time: '',
  });
  const tagsState = useState<string[]>([]);
  const [img, setImg] = useState<File | null>(null);
  const [ingredients, setIngredients] = useState<NewRecipeIngredientStates>(
    INGREDIENTS_INITIAL_STATE,
  );
  const [steps, setSteps] = useState<Step[]>(STEPS_INITIAL_STATE);

  const handleTextInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const fieldName = e.target.name;
    const value = e.target.value;

    setTextInputs((prev) => ({ ...prev, [fieldName]: value }));
  };

  const addIngredient = () =>
    setIngredients([
      ...ingredients,
      {
        id: getRandomId(),
        name: '',
        quantity: '',
        ingredientId: null,
        productId: null,
        newProduct: null,
      },
    ]);

  const onRemoveIngredient = (id: string) =>
    setIngredients(ingredients.filter((item) => item.id !== id));

  const onAddStep = () =>
    setSteps([...steps, { id: getRandomId(), value: '' }]);

  const onRemoveStep = (id: string) =>
    setSteps(steps.filter((item) => item.id !== id));

  const onStepChange = (id: string, fieldName: string, value: string) =>
    onFieldChange(setSteps, id, fieldName, value);

  const handleSubmit = async () => {
    // TODO validation

    const newProducts = ingredients
      .map((item) => item.newProduct)
      .filter((item) => !!item);

    const formData = new FormData();

    newProducts.forEach(
      (product) =>
        product.img && formData.append(`img_${product.id}`, product.img),
    );

    img && formData.append('img', img);
    // TODO remove user id
    const data: Omit<NewRecipeData, 'img'> = {
      // TODO add user id
      ...textInputs,
      steps: steps.map((item) => item.value),
      ingredients: ingredients.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        ingredientId: item.productId,
        newProduct: item.newProduct,
        productId: item.productId,
      })),
      tags: tagsState[0],
      user: { id: '1' },
    };

    formData.append('info', JSON.stringify(data));

    const response = await fetch('http://localhost:8080/api/v1/recipes', {
      method: 'POST',
      body: formData,
    });
  };

  return (
    <div className={style.container}>
      <h2 className={style.title}>Submit new recipe</h2>

      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.box}>
          <label htmlFor='title'>
            <h3>Title*</h3>
          </label>
          <Input
            id='title'
            name='title'
            onChange={handleTextInputChange}
            value={textInputs.title}
          />
        </div>

        <div className={style.box}>
          <label htmlFor='simpleDescription'>
            <h3>Summary</h3>
          </label>
          <Input
            id='simpleDescription'
            name='simpleDescription'
            onChange={handleTextInputChange}
            value={textInputs.simpleDescription}
          />
        </div>

        <div className={style.box}>
          <label htmlFor='description'>
            <h3>Description</h3>
          </label>
          <Input
            id='description'
            name='description'
            onChange={handleTextInputChange}
            value={textInputs.description}
          />
        </div>

        <div className={style.box}>
          <label htmlFor='time'>
            <h3>Time</h3>
          </label>

          <Input
            id='time'
            name='time'
            onChange={handleTextInputChange}
            value={textInputs.time}
          />
        </div>

        <div className={style.box}>
          <h3>Tags</h3>
          <ChipListInput state={tagsState} />
        </div>

        <div className={style.box}>
          <h3>Image</h3>
          <div className={style['img-uploader']}>
            <ImageUploader onChange={setImg} imgValue={img} />
          </div>
        </div>

        <div className={style.box}>
          <h3>Ingredients*</h3>
          <div className={style.box__content}>
            <Ingredients
              setIngredients={setIngredients}
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
            <AddButton onClick={onAddStep}>Add a step</AddButton>
          </div>
        </div>

        <Button className={style['submit-button']} onClick={handleSubmit}>
          Submit
        </Button>
      </form>
    </div>
  );
}

export default NewRecipe;
