'use client';

import { ChangeEventHandler, useCallback, useState } from 'react';

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

  const isSubmittable = img && ingredients[0].name && steps[0].value.length;

  const onTextInputChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const fieldName = e.target.name;
      const value = e.target.value;

      setTextInputs((prev) => ({ ...prev, [fieldName]: value }));
    },
    [],
  );

  const onAddIngredient = useCallback(
    () =>
      setIngredients((preIngredients) => [
        ...preIngredients,
        {
          id: getRandomId(),
          name: '',
          quantity: '',
          ingredientId: null,
          productId: null,
          newProduct: null,
        },
      ]),
    [],
  );

  const onRemoveIngredient = useCallback(
    (id: string) =>
      setIngredients(ingredients.filter((item) => item.id !== id)),
    [ingredients],
  );

  const onAddStep = useCallback(
    () =>
      setSteps((preSteps) => [...preSteps, { id: getRandomId(), value: '' }]),
    [],
  );

  const onRemoveStep = useCallback(
    (id: string) =>
      setSteps((preSteps) => preSteps.filter((item) => item.id !== id)),
    [],
  );

  const onStepChange = useCallback(
    (id: string, fieldName: string, value: string) =>
      onFieldChange(setSteps, id, fieldName, value),
    [],
  );

  const onSubmit = async () => {
    // TODO validation
    if (!img || !ingredients.length || !steps.length) {
      alert('Please fill in all required fields');
      return;
    }

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

      <div className={style.form}>
        <div className={style.box}>
          <label htmlFor='title'>
            <h3>Title*</h3>
          </label>
          <Input
            id='title'
            name='title'
            onChange={onTextInputChange}
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
            onChange={onTextInputChange}
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
            onChange={onTextInputChange}
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
            onChange={onTextInputChange}
            value={textInputs.time}
          />
        </div>

        <div className={style.box}>
          <h3>Tags</h3>
          <ChipListInput
            state={tagsState}
            limit={5}
            limitReachedMessage={TAG_LIMIT_REACHED_MESSAGE}
          />
        </div>

        <div className={style.box}>
          <h3>Image*</h3>
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
            <AddButton onClick={onAddIngredient}>Add a ingredient</AddButton>
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

        <Button
          disabled={!isSubmittable}
          className={style['submit-button']}
          onClick={onSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default NewRecipe;

const TAG_LIMIT = 5;
const TAG_LIMIT_REACHED_MESSAGE = `You can only add up to ${TAG_LIMIT} tags.`;
